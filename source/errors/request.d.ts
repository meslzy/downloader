interface IError {
    message: string;
}
interface IRequestError {
    message: string;
}
declare class RequestError implements IRequestError {
    message: string;
    constructor(error: IError);
}
export default RequestError;
