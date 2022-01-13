/// <reference path="../types/index.d.ts"/>
import * as types from "types";

import * as url from "valid-url";
import {TypedEmitter} from "tiny-typed-emitter";

import validate from "./validate";

import Request from "./request";

import RequestError from "./errors/request";
import DownloadError from "./errors/download";

import * as https from "https";
import * as http from "http";
import * as path from "path";
import * as fs from "fs";

class Downloader {
  public event = new TypedEmitter<types.eventEmitter>();
  
  private downloadUrl: string;
  private readonly downloadLocation: string;
  
  private readonly downloadOptions: types.downloadOptions = {
    method: "GET",
    redirectLimit: 5,
    followRedirect: true,
  };
  
  private clientRequest: http.ClientRequest;
  private clientResponse: http.IncomingMessage;
  
  private redirectCount: number = 0;
  
  private state = {
    started: false,
    paused: false,
    
    location: "",
    filename: "",
    filesize: 0,
    chunks: 0,
    speed: 0,
    estimate: 0,
    percentage: 0,
  };
  
  private fileStream: fs.WriteStream;
  
  constructor(downloadUrl: string, downloadLocation: string, downloadOptions?: types.downloadOptions) {
    this.downloadUrl = validate.downloadUrl(downloadUrl);
    this.downloadLocation = validate.downloadLocation(downloadLocation);
    this.downloadOptions = validate.downloadOptions(this.downloadOptions, downloadOptions);
    
    const is: any = {
      paused: (): boolean => this.state.paused,
      started: (): boolean => this.state.started,
    };
    
    this.is = new Proxy<types.is>(is, {
      get(target: any, prop: string): any {
        return target[prop]();
      }
    });
  }
  
  public start = () => new Promise<types.downloadStart>((resolve, reject) => {
    if (this.clientRequest && this.state.started) {
      const error = new DownloadError({
        message: "downloader already started",
      });
      
      return reject(error);
    }
    
    if (url.isHttpUri(this.downloadUrl))
      this.clientRequest = http.request(this.downloadUrl, {
        method: this.downloadOptions.method,
      });
    else
      this.clientRequest = https.request(this.downloadUrl, {
        method: this.downloadOptions.method,
      });
    
    this.clientRequest.on("response", (response) => {
      const isRedirect = Request.isRedirect(response);
      
      if (isRedirect && this.downloadOptions.followRedirect) {
        this.downloadUrl = response.headers["location"] as string;
        
        if (this.downloadOptions.redirectLimit) {
          if (this.redirectCount > this.downloadOptions.redirectLimit) {
            const error = new RequestError({
              message: "too many redirect",
            });
            
            return reject(error);
          }
        }
        
        this.redirectCount += 1;
        
        return resolve(this.start());
      }
      
      this.state.started = true;
      this.clientResponse = response;
      
      this.state.filename = Request.getFilename(response, this.downloadUrl);
      this.state.filesize = Request.getTotalSize(response);
      this.state.location = path.join(this.downloadLocation, this.state.filename);
      
      this.fileStream = fs.createWriteStream(this.state.location, {"flags": "a"});
      
      const speedEstimate = {
        time: 0,
        bytes: 0,
        prevBytes: 0
      };
      
      this.clientResponse.on("data", (chunk) => {
        this.state.chunks += chunk.length;
        this.state.percentage = Math.round((this.state.chunks * 100) / this.state.filesize);
        
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - speedEstimate.time;
        
        if (this.state.chunks === this.state.filesize || elapsedTime > 1000) {
          speedEstimate.time = currentTime;
          speedEstimate.bytes = this.state.chunks - speedEstimate.prevBytes;
          speedEstimate.prevBytes = this.state.chunks;
        }
        
        this.state.speed = speedEstimate.bytes;
        
        const speedAsMb = parseFloat((this.state.speed / Math.pow(1024, 2)).toFixed(2));
        const chunkLeft = parseFloat(((this.state.filesize - this.state.chunks) / Math.pow(1024, 2)).toFixed(2));
        
        if (speedAsMb !== 0 && chunkLeft !== 0)
          this.state.estimate = Math.round((chunkLeft / speedAsMb) * 1000);
        else
          this.state.estimate = 0;
        
        this.event.emit("progress", {
          filesize: this.state.filesize,
          speed: this.state.speed,
          chunks: this.state.chunks,
          estimate: this.state.estimate,
          percentage: this.state.percentage,
        });
      });
      
      this.clientResponse.on("error", (error) => {
        console.log(error.message);
      });
      
      this.clientResponse.on("end", () => {
        this.clientResponse.unpipe(this.fileStream);
        
        this.fileStream.close(() => {
          this.clientResponse.destroy();
          this.clientRequest.destroy();
          
          this.state = {
            started: false,
            paused: false,
            
            location: "",
            filename: "",
            filesize: 0,
            chunks: 0,
            speed: 0,
            estimate: 0,
            percentage: 0,
          };
          
          this.redirectCount = 0;
          
          this.event.emit("end");
        });
      });
      
      this.clientResponse.pipe(this.fileStream);
      
      this.event.emit("start", {
        filename: this.state.filename,
        location: this.state.location,
        filesize: this.state.filesize,
      });
      
      return resolve({
        filename: this.state.filename,
        location: this.state.location,
        filesize: this.state.filesize,
      });
    });
    
    this.clientRequest.on("error", reject);
    
    this.clientRequest.end();
  });
  
  public pause = () => {
    if (this.state.paused) return;
    
    this.state.paused = true;
    
    this.clientResponse.pause();
    this.clientResponse.unpipe(this.fileStream);
    
    this.event.emit("pause");
  };
  
  public resume = () => {
    if (this.state.paused) {
      this.state.paused = false;
      
      this.clientResponse.pipe(this.fileStream);
      this.clientResponse.resume();
      
      this.event.emit("resume");
    }
  };
  
  public stop = () => {
    this.clientResponse.pause();
    this.clientResponse.unpipe(this.fileStream);
    
    this.fileStream.close(() => {
      this.clientResponse.destroy();
      this.clientRequest.destroy();
      
      this.state = {
        started: false,
        paused: false,
        
        location: "",
        filename: "",
        filesize: 0,
        chunks: 0,
        speed: 0,
        estimate: 0,
        percentage: 0,
      };
      
      this.redirectCount = 0;
      
      this.event.emit("stop");
    });
  };
  
  public is: types.is;
}

export {
  RequestError, DownloadError
};

export default Downloader;
