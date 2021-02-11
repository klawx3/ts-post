import express from 'express';
import AppConfig from './AppConfig';
import Controller from './Controller';

export default class App {
    private appConfig : AppConfig;
    private expressApp: express.Application;

    constructor(appConfig : AppConfig) {
        this.appConfig = appConfig;
        this.expressApp = express();
        this.initControllers(appConfig.controllers);
    }

    public listen(): void {
        this.expressApp.listen(this.appConfig.port , () => {
            console.log(`App listering on the port ${this.appConfig.port}`);
        });
    }

    private initControllers(controllers: Array<Controller>) {
        controllers.forEach( (controller : Controller) =>
            this.expressApp.use(controller.getPath(), controller.getBuildedRouter())
        );
    }
}