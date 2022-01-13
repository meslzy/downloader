/// <reference path="../../types/index.d.ts"/>
import * as types from "types";

interface IError {
	message: string;
}

export class RequestError implements types.requestError {
	message = "";
	
	constructor(error: IError) {
		this.message = error.message;
	}
}

export default RequestError;
