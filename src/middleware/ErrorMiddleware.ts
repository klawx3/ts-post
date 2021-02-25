import express, {RequestHandler} from "express";
import HttpException from "../exception/HttpException";
import Middleware from "../webserver/Middleware";


class ErrorMiddleware implements Middleware {

    getMiddleware(): RequestHandler {
        return this.errorMiddleware;
    }

    private errorMiddleware = (error: HttpException, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        const status: number = error.status || 500;
        const message: string = error.message || 'Something went wrong';

        res.status(status).send({
            status,
            message
        });
    }
}

export default ErrorMiddleware;
