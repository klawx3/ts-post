import express from "express";
import HttpException from "../exception/HttpException";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import Post from "../models/Post";
import {DaoContainer} from "../persistence/dao/Dao";

import Controller from "../webserver/Controller";

export default class PostController extends Controller {

    private static path: string = "/post";

    private auth: AuthenticationMiddleware;

    constructor(daoContainer: DaoContainer) {
        super(PostController.path, daoContainer);
        this.auth = new AuthenticationMiddleware(this.daoContainer.daoUser);
    }

    public buildAllRequests() {
        this.router.get('/',this.auth.getMiddleware(), this.getAllPost);
        this.router.get('/:postId', this.getOnePost);
    }

    private getAllPost = (_request: express.Request, response: express.Response) => {
        this.daoContainer.daoPost.findAll().then((posts: Array<Post>) => {
            let jsonPosts = JSON.stringify(posts);
            response.send(jsonPosts);
        });
    }

    private getOnePost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const postId: number = Number(request.params.postId);
        if (isNaN(postId)) {
            response.status(404).send("mal");
        } else {
            this.daoContainer.daoPost.findOne(postId).then((post: Post) => {
                console.log(post);
                if (post) {
                    response.send(JSON.stringify(post));
                } else {
                    console.log("en error");
                    next(new HttpException(404, 'Post not found xddd'));
                }
            });
        }
    }

    isObjectEmpty(obj: any) {
        return Object.keys(obj).length === 0;
    }

}
