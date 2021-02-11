//import express from "express";
import { databaseConfig, PORT } from "./config/config";

// import {databaseConfig, PORT} from "./config/config";

import mysql from 'mysql';

import App from './webserver/App';
import PostController from './controllers/PostController';
import DaoPostImpl from "./persistence/dao/impl/DaoPostImpl";
import { DaoPost } from "./persistence/dao/Dao";
import Controller from "./webserver/Controller";

const con = mysql.createConnection({
  host: databaseConfig.host,
  user: databaseConfig.user,
  password: databaseConfig.pass,
  database: databaseConfig.db
});

const daoPost : DaoPost = new DaoPostImpl(con);

const controllersArray : Array<Controller> = [new PostController(daoPost)];

const app: App = new App({
  controllers: controllersArray ,
  port: PORT
});

app.listen();

// async function testo() : Promise<void>{
//   const daoPost: DaoPost = new DaoPostImpl(con);
//   const allWeas: Post[] = await daoPost.findAll();
//   allWeas.forEach( (post:Post) => {
//     console.log(JSON.stringify(post));
//   });
//   con.destroy();
// }