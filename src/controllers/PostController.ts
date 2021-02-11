import express from "express";
import { DaoPost } from "../persistence/dao/Dao";
import Controller from "../webserver/Controller";

export default class PostController extends Controller {

    private static path : string = "/post";

    private dapPost : DaoPost;

    constructor(daoPost : DaoPost ){
        super(PostController.path);
        this.dapPost = daoPost;
    }

    protected buildAllRequests() {
        this.router.get('/', this.getAllPost);
        this.router.get('/wea', this.getWea);
    }

    getAllPost = (_request: express.Request, response: express.Response) => {
        this.dapPost.findAll();
        response.send("hola poto");
    }

    getWea = (_request: express.Request, response: express.Response) => {
        response.send("hola caca");
    }



}