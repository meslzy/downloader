"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const valid_url_1 = require("valid-url");
const fs = __importStar(require("fs"));
class Validate {
}
Validate.downloadUrl = (downloadUrl) => {
    if (downloadUrl === undefined) {
        throw new Error("download url is required");
    }
    if (typeof downloadUrl !== "string") {
        throw new Error("download url should be string");
    }
    if ((0, valid_url_1.isUri)(downloadUrl) && ((0, valid_url_1.isHttpUri)(downloadUrl) || (0, valid_url_1.isHttpsUri)(downloadUrl)))
        return downloadUrl;
    throw new Error("download url is not type of url");
};
Validate.downloadLocation = (downloadLocation) => {
    if (downloadLocation === undefined) {
        throw new Error("download location is required");
    }
    if (typeof downloadLocation !== "string") {
        throw new Error("download location should be string");
    }
    if (fs.existsSync(downloadLocation)) {
        const stats = fs.statSync(downloadLocation);
        if (stats.isFile()) {
            throw new Error("download location should be folder, not file");
        }
        try {
            fs.accessSync(downloadLocation, fs.constants.R_OK | fs.constants.W_OK);
        }
        catch (_a) {
            throw new Error("download location is not writable");
        }
        return downloadLocation;
    }
    throw new Error("download location folder doesn't exist");
};
Validate.downloadOptions = (initDownloadOptions, downloadOptions) => {
    return Object.assign({}, initDownloadOptions, downloadOptions);
};
exports.default = Validate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSx5Q0FBdUQ7QUFFdkQsdUNBQXlCO0FBRXpCLE1BQU0sUUFBUTs7QUFDTixvQkFBVyxHQUFHLENBQUMsV0FBbUIsRUFBVSxFQUFFO0lBQ3BELElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtRQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7S0FDNUM7SUFFRCxJQUFJLE9BQU8sV0FBc0IsS0FBSyxRQUFRLEVBQUU7UUFDL0MsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0tBQ2pEO0lBRUQsSUFBSSxJQUFBLGlCQUFLLEVBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFBLHFCQUFTLEVBQUMsV0FBVyxDQUFDLElBQUksSUFBQSxzQkFBVSxFQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQUUsT0FBTyxXQUFXLENBQUM7SUFFbEcsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3BELENBQUMsQ0FBQztBQUNLLHlCQUFnQixHQUFHLENBQUMsZ0JBQXdCLEVBQVUsRUFBRTtJQUM5RCxJQUFJLGdCQUFnQixLQUFLLFNBQVMsRUFBRTtRQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7S0FDakQ7SUFFRCxJQUFJLE9BQU8sZ0JBQTJCLEtBQUssUUFBUSxFQUFFO1FBQ3BELE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztLQUN0RDtJQUVELElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUU1QyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7U0FDaEU7UUFFRCxJQUFJO1lBQ0gsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZFO1FBQUMsV0FBTTtZQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztTQUNyRDtRQUVELE9BQU8sZ0JBQWdCLENBQUM7S0FDeEI7SUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7QUFDM0QsQ0FBQyxDQUFDO0FBQ0ssd0JBQWUsR0FBRyxDQUFDLG1CQUEwQyxFQUFFLGVBQXVDLEVBQXlCLEVBQUU7SUFDdkksT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUNoRSxDQUFDLENBQUM7QUFHSCxrQkFBZSxRQUFRLENBQUMifQ==