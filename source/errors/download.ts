/// <reference path="../../types/index.d.ts"/>
import * as types from "types";

interface IError {
	message: string;
}

export class DownloadError implements types.downloadError {
	message = "";
	
	constructor(error: IError) {
		this.message = error.message;
	}
}

export default DownloadError;
