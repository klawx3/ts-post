import express, { Router } from "express";

export default abstract class Controller {
    
    private basePath : string ;
    protected router = express.Router();

    constructor(basePath: string){
        this.basePath = basePath;
        this.buildAllRequests();
    }

    protected abstract buildAllRequests() : void; // factory method

    public getPath(): string {
        return this.basePath;
    }

    public getBuildedRouter(): Router {
        return this.router;
    }
}