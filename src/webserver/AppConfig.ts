import Controller from "./Controller";
import Middleware from "./Middleware";

export default interface AppConfig {
    controllers : Array<Controller>;
    middleware : Array<Middleware>;
    port: number
}
