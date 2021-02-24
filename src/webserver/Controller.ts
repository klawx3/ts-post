import express, { Router } from "express";
import {DaoContainer} from "../persistence/dao/Dao";

export default abstract class Controller {
    
    private basePath : string ;
    protected router = express.Router();
    protected daoContainer : DaoContainer

    constructor(basePath: string, daoContainer :DaoContainer ){
        this.basePath = basePath; 
        this.daoContainer = daoContainer;
    }

    public abstract buildAllRequests() : void; 

    public getPath(): string {
        return this.basePath;
    }

    public getBuildedRouter(): Router {
        return this.router;
    }
}
