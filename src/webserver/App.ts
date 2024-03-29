import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import ErrorMiddleware from '../middleware/ErrorMiddleware';
import AppConfig from './AppConfig';
import Controller from './Controller';
import Middleware from './Middleware';

export default class App {
    private appConfig: AppConfig;
    private expressApp: express.Application;

    constructor(appConfig: AppConfig) {
        this.appConfig = appConfig;
        this.expressApp = express();
        this.initMiddleware(appConfig.middleware);
        this.initControllers(appConfig.controllers);
        this.initErrorMiddleware();
    }

    private initMiddleware(middleware: Array<Middleware>) {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(cors());
        middleware.forEach(middleware => {
            this.expressApp.use(middleware.getMiddleware());
        });
    }

    public listen(): void {
        this.expressApp.listen(this.appConfig.port, () => {
            console.log(`App listering on the port ${this.appConfig.port}`);
        });
    }

    private initControllers(controllers: Array<Controller>) {
        controllers.forEach((controller: Controller) => {
            controller.buildAllRequests();
            this.expressApp.use(controller.getPath(), controller.getBuildedRouter())
        });
    }

    private initErrorMiddleware() {
        this.expressApp.use(new ErrorMiddleware().getMiddleware());
    }
}
