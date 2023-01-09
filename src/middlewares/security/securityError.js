export class SecurityError extends Error {
    errorCode;

    constructor(errorCode) {
        super();

        this.errorCode = errorCode;
    }
}