declare module "types" {
	export interface requestError {
		message: string;
	}
	
	export interface downloadError {
		message: string;
	}
	
	export interface downloadOptions {
		method?: "GET" | "POST";
		followRedirect?: boolean;
		redirectLimit?: number;
	}
	
	export interface downloadStart {
		location: string;
		filename: string;
		filesize: number;
	}
	
	export interface downloadProgress {
		filesize: number;
		chunks: number;
		speed: number;
		estimate: number;
		percentage: number;
	}
	
	export interface eventEmitter {
		start: (download: downloadStart) => void;
		
		progress: (download: downloadProgress) => void;
		
		pause: () => void;
		resume: () => void;
		
		end: () => void;
		
		stop: () => void;
		
		error: (error: requestError) => void;
	}
	
	export interface is {
		paused: boolean;
		started: boolean;
	}
}
