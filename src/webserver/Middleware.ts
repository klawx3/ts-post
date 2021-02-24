import {RequestHandler} from "express";

export default interface Middleware {
    getMiddleware(): RequestHandler;
}
