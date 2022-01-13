/// <reference types="node" />
import * as types from "types";
import http from "http";
declare class Downloader {
    event: types.eventEmitter;
    downloadUrl: string;
    downloadLocation: string;
    downloadOptions: types.downloadOptions;
    clientRequest: http.ClientRequest;
    clientResponse: http.IncomingMessage;
    redirectCount: number;
    stats: {
        started: boolean;
    };
    constructor(downloadUrl: string, downloadLocation: string, downloadOptions?: types.downloadOptions);
    start: () => Promise<any>;
    stop: () => void;
    pause: () => void;
    is: {
        paused: () => void;
    };
}
export default Downloader;
