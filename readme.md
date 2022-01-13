# Downloader (✨)

> file downloader for nodejs

---

<div align="center">

![stars](https://badgen.net/github/stars/meslzy/downloader/)
![forks](https://badgen.net/github/forks/meslzy/downloader)
![issues](https://badgen.net/github/issues/meslzy/downloader)

</div>

---

## Getting Started (✅)

- ### Installation (⏬)
	- `npm i @meslzy/downloader --save`

---

### Usage  (📙)

```ts
import Downloader, {DownloadError, RequestError} from "@meslzy/downloader";

const downloadUrl = "";
const downloadLocation = "";

const downloader = new Downloader(downloadUrl, downloadLocation);

downloader.event.on("start", (download) => {
	console.log(download.location); // download location + file name
	console.log(download.filename); // file name
	console.log(download.filesize); // file size
});

downloader.event.on("progress", (download) => {
	console.log(download.percentage); // 0 -> 100
	console.log(download.filesize);	// file size
	console.log(download.chunks);	// downloaded chunks
	console.log(download.estimate);	// estimate time to finish
	console.log(download.speed); // internet speed based on chunks
});

downloader.event.on("pause", () => {
	console.log(downloader.is.paused); // true
});

downloader.event.on("resume", () => {
	console.log(downloader.is.paused); // false
});

downloader.event.on("end", () => {
	console.log("end");
});

downloader.start().then((download) => {
	// same as event.on("start");
	
	console.log(download.location); // download location + file name
	console.log(download.filename); // file name
	console.log(download.filesize); // file size
}).catch((error) => {
	if (error instanceof DownloadError) {
		return console.log(error.message); // downloader already started
	}
	
	if (error instanceof RequestError) {
		return console.log(error.message); // to many redirect
	}
	
	return error; // unknown error
});
```

---

## The End (💘)
