import mime from "mime-types";

import * as http from "http";
import * as path from "path";

class Request {
	static isRedirect = (response: http.IncomingMessage) => {
		if (response.statusCode === undefined) return false;
		
		if ((response.statusCode >= 300) && (response.statusCode <= 401)) {
			return response.headers["location"] !== undefined;
		}
		
		return false;
	};
	
	static getTotalSize(response: http.IncomingMessage) {
		return Number(response.headers["content-length"]);
	}
	
	static getFilename(response: http.IncomingMessage, downloadUrl: string) {
		const contentDisposition = response.headers["content-disposition"];
		
		if (contentDisposition) {
			const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
			const matches = filenameRegex.exec(contentDisposition);
			if (matches != null && matches[1]) {
				return matches[1].replace(/['"]/g, "");
			}
		}
		
		const url = new URL(downloadUrl);
		
		if (path.extname(downloadUrl)) {
			return path.basename(url.pathname);
		}
		
		const contentType = response.headers["content-type"] as string;
		
		if (contentType) {
			const extension = mime.extension(contentType);
			return `${path.basename(url.pathname)}.${extension}`;
		}
		
		return "i dont know";
	}
}

export default Request;
