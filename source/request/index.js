"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const mime_types_1 = __importDefault(require("mime-types"));
class Request {
    static getTotalSize(response) {
        return response.headers["content-length"];
    }
    static getFilename(response, downloadUrl) {
        const contentDisposition = response.headers["content-disposition"];
        if (contentDisposition) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(contentDisposition);
            if (matches != null && matches[1]) {
                return matches[1].replace(/['"]/g, "");
            }
        }
        const url = new URL(downloadUrl);
        if (path_1.default.extname(downloadUrl)) {
            return path_1.default.basename(url.pathname);
        }
        const contentType = response.headers["content-type"];
        if (contentType) {
            const extension = mime_types_1.default.extension(contentType);
            return `${path_1.default.basename(url.pathname)}.${extension}`;
        }
        return "i dont know";
    }
}
Request.isRedirect = (response) => {
    if (response.statusCode === undefined)
        return false;
    if ((response.statusCode >= 300) && (response.statusCode <= 401)) {
        return response.headers["location"] !== undefined;
    }
    return false;
};
exports.default = Request;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGdEQUF3QjtBQUN4Qiw0REFBOEI7QUFFOUIsTUFBTSxPQUFPO0lBV1osTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUE4QjtRQUNqRCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUE4QixFQUFFLFdBQW1CO1FBQ3JFLE1BQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRW5FLElBQUksa0JBQWtCLEVBQUU7WUFDdkIsTUFBTSxhQUFhLEdBQUcsd0NBQXdDLENBQUM7WUFDL0QsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3ZELElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDdkM7U0FDRDtRQUVELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRWpDLElBQUksY0FBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM5QixPQUFPLGNBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ25DO1FBRUQsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQVcsQ0FBQztRQUUvRCxJQUFJLFdBQVcsRUFBRTtZQUNoQixNQUFNLFNBQVMsR0FBRyxvQkFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM5QyxPQUFPLEdBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxFQUFFLENBQUM7U0FDckQ7UUFFRCxPQUFPLGFBQWEsQ0FBQztJQUN0QixDQUFDOztBQXZDTSxrQkFBVSxHQUFHLENBQUMsUUFBOEIsRUFBRSxFQUFFO0lBQ3RELElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxTQUFTO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxFQUFFO1FBQ2pFLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxTQUFTLENBQUM7S0FDbEQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNkLENBQUMsQ0FBQztBQWtDSCxrQkFBZSxPQUFPLENBQUMifQ==