import * as types from "types";

import {isHttpsUri, isHttpUri, isUri} from "valid-url";

import * as fs from "fs";

class Validate {
	static downloadUrl = (downloadUrl: string): string => {
		if (downloadUrl === undefined) {
			throw new Error("download url is required");
		}
		
		if (typeof downloadUrl as unknown !== "string") {
			throw new Error("download url should be string");
		}
		
		if (isUri(downloadUrl) && (isHttpUri(downloadUrl) || isHttpsUri(downloadUrl))) return downloadUrl;
		
		throw new Error("download url is not type of url");
	};
	static downloadLocation = (downloadLocation: string): string => {
		if (downloadLocation === undefined) {
			throw new Error("download location is required");
		}
		
		if (typeof downloadLocation as unknown !== "string") {
			throw new Error("download location should be string");
		}
		
		if (fs.existsSync(downloadLocation)) {
			const stats = fs.statSync(downloadLocation);
			
			if (stats.isFile()) {
				throw new Error("download location should be folder, not file");
			}
			
			try {
				fs.accessSync(downloadLocation, fs.constants.R_OK | fs.constants.W_OK);
			} catch {
				throw new Error("download location is not writable");
			}
			
			return downloadLocation;
		}
		
		throw new Error("download location folder doesn't exist");
	};
	static downloadOptions = (initDownloadOptions: types.downloadOptions, downloadOptions?: types.downloadOptions): types.downloadOptions => {
		return Object.assign({}, initDownloadOptions, downloadOptions);
	};
}

export default Validate;
