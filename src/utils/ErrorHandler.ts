export class ErrorHandler extends Error {
    statusCode
    constructor(message: string, statusCode: number) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor)
    }
}