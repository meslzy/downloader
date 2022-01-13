"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const valid_url_1 = __importDefault(require("valid-url"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const validate_1 = __importDefault(require("./validate"));
const request_1 = __importDefault(require("./request"));
const request_2 = __importDefault(require("./errors/request"));
class Downloader {
    constructor(downloadUrl, downloadLocation, downloadOptions) {
        this.event = new events_1.default();
        this.downloadUrl = "";
        this.downloadLocation = "";
        this.downloadOptions = {
            method: "GET",
            redirectLimit: 5,
            followRedirect: true,
        };
        this.redirectCount = 0;
        this.stats = {
            started: false,
        };
        this.start = () => new Promise((resolve, reject) => {
            if (this.clientRequest && this.stats.started)
                return resolve("downloader already started");
            if (valid_url_1.default.isHttpUri(this.downloadUrl))
                this.clientRequest = http_1.default.request(this.downloadUrl);
            else
                this.clientRequest = https_1.default.request(this.downloadUrl);
            this.clientRequest.on("response", (response) => {
                const isRedirect = request_1.default.isRedirect(response);
                if (isRedirect) {
                    this.downloadUrl = response.headers["location"];
                    if (this.downloadOptions.redirectLimit) {
                        if (this.redirectCount > this.downloadOptions.redirectLimit) {
                            const error = new request_2.default({
                                message: "too many redirect",
                            });
                            return reject(error);
                        }
                    }
                    this.redirectCount += 1;
                    return resolve(this.start());
                }
                return resolve(this.downloadUrl);
            });
            this.clientRequest.on("error", reject);
            this.clientRequest.end();
        });
        this.stop = () => {
        };
        this.pause = () => {
        };
        this.is = {
            paused: () => {
                console.log("is paused");
            },
        };
        this.downloadUrl = validate_1.default.downloadUrl(downloadUrl);
        this.downloadLocation = validate_1.default.downloadLocation(downloadLocation);
        this.downloadOptions = validate_1.default.downloadOptions(this.downloadOptions, downloadOptions);
    }
}
exports.default = Downloader;
module.exports = Downloader;
module.exports.default = Downloader;
module.exports.assert = Downloader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLG9EQUFrQztBQUVsQywwREFBNEI7QUFFNUIsZ0RBQXdCO0FBQ3hCLGtEQUEwQjtBQUUxQiwwREFBa0M7QUFFbEMsd0RBQWdDO0FBQ2hDLCtEQUE0QztBQUU1QyxNQUFNLFVBQVU7SUFxQmQsWUFBWSxXQUFtQixFQUFFLGdCQUF3QixFQUFFLGVBQXVDO1FBcEJsRyxVQUFLLEdBQUcsSUFBSSxnQkFBWSxFQUF3QixDQUFDO1FBRWpELGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLHFCQUFnQixHQUFXLEVBQUUsQ0FBQztRQUU5QixvQkFBZSxHQUEwQjtZQUN2QyxNQUFNLEVBQUUsS0FBSztZQUNiLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUM7UUFLRixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUUxQixVQUFLLEdBQUc7WUFDTixPQUFPLEVBQUUsS0FBSztTQUNmLENBQUM7UUFRRixVQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxPQUFPLENBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDakQsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztnQkFBRSxPQUFPLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBRTNGLElBQUksbUJBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Z0JBRXBELElBQUksQ0FBQyxhQUFhLEdBQUcsZUFBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFdkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQzdDLE1BQU0sVUFBVSxHQUFHLGlCQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVoRCxJQUFJLFVBQVUsRUFBRTtvQkFDZCxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFXLENBQUM7b0JBRTFELElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUU7d0JBQ3RDLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRTs0QkFDM0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBWSxDQUFDO2dDQUM3QixPQUFPLEVBQUUsbUJBQW1COzZCQUM3QixDQUFDLENBQUM7NEJBRUgsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ3RCO3FCQUNGO29CQUVELElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDO29CQUV4QixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztpQkFDOUI7Z0JBRUQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxTQUFJLEdBQUcsR0FBRyxFQUFFO1FBQ1osQ0FBQyxDQUFDO1FBQ0YsVUFBSyxHQUFHLEdBQUcsRUFBRTtRQUNiLENBQUMsQ0FBQztRQUVGLE9BQUUsR0FBRztZQUNILE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzQixDQUFDO1NBQ0YsQ0FBQztRQW5EQSxJQUFJLENBQUMsV0FBVyxHQUFHLGtCQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxrQkFBUSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLGVBQWUsR0FBRyxrQkFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7Q0FpREY7QUFFRCxrQkFBZSxVQUFVLENBQUM7QUFDMUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7QUFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyJ9