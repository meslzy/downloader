/// <reference types="node" />
import http from "http";
declare class Request {
    static isRedirect: (response: http.IncomingMessage) => boolean;
    static getTotalSize(response: http.IncomingMessage): string | undefined;
    static getFilename(response: http.IncomingMessage, downloadUrl: string): string;
}
export default Request;
