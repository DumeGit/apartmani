import {APIError} from "./APIError";

export class AppError extends Error {
    errors: APIError[];

    constructor(errors: APIError[]) {
        super();
        this.name = "AppError";
        this.errors = errors;
    }
}

