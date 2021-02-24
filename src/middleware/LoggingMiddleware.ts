import express, {RequestHandler} from "express";
import Middleware from "../webserver/Middleware";

export default class LoggingMiddleware implements Middleware{

    getMiddleware(): RequestHandler {
        return this.middleware;
    }

    private middleware = (_request: express.Request, _response: express.Response, next: express.NextFunction) => {
        console.log("Logeando... middleware");
        next();
    }
}
