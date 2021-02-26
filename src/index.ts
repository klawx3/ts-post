//import express from "express";
import {databaseConfig, PORT} from "./config/config";

// import {databaseConfig, PORT} from "./config/config";

import mysql from 'mysql';

import App from './webserver/App';
import PostController from './controllers/PostController';
import DaoPostImpl from "./persistence/dao/impl/DaoPostImpl";
import {DaoContainer, DaoPost, DaoUser} from "./persistence/dao/Dao";
import DaoUserImpl from "./persistence/dao/impl/DaoUserImpl";
import UserController from "./controllers/UserController";
import LoggingMiddleware from "./middleware/LoggingMiddleware";
import AuthenticationController from "./controllers/AuthenticationController";

const con = mysql.createConnection({
    host: databaseConfig.host,
   user: databaseConfig.user,
    password: databaseConfig.pass,
    database: databaseConfig.db
});

let daoPost: DaoPost = new DaoPostImpl(con);
let daoUser: DaoUser = new DaoUserImpl(con);

let daoContainer: DaoContainer = {
    daoPost: daoPost,
    daoUser: daoUser,
}

const app: App = new App({
    controllers: [
        new PostController(daoContainer),
        new UserController(daoContainer),
        new AuthenticationController(daoContainer),
    ],
    middleware: [
        new LoggingMiddleware(),
    ],
    port: PORT
});

app.listen();
