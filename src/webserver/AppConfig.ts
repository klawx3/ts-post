import Controller from "./Controller";

export default interface AppConfig {
    controllers : Array<Controller>;
    port: number
}