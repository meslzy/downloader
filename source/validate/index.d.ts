import * as types from "types";
declare class Validate {
    static downloadUrl: (downloadUrl: string) => string;
    static downloadLocation: (downloadLocation: string) => string;
    static downloadOptions: (initDownloadOptions: types.downloadOptions, downloadOptions?: types.downloadOptions | undefined) => types.downloadOptions;
}
export default Validate;
