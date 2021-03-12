import express from "express";
import BodyParamsException from "../exception/BodyParamsException";
import HttpException from "../exception/HttpException";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
import Post from "../models/Post";
import RequestWithUser from "../models/RequestWithUser";
import User from "../models/User";
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
        this.router.get('/', this.getAllPost);
        this.router.get('/:postId', this.getOnePost);

        this.router.all('/*', this.auth.getMiddleware())
            .post('/', this.insertPost)
            .delete('/:postId', this.deletePost)
            .put('/:postId', this.updatePost);
    }

    private getAllPost = (_request: express.Request, response: express.Response) => {
        this.daoContainer.daoPost.findAll().then((posts: Array<Post>) => {
            let jsonPosts = JSON.stringify(posts);
            response.send(jsonPosts);
        });
    }

    private updatePost = async (_request: express.Request, response: express.Response, next: express.NextFunction) => {
        const user: User = (_request as RequestWithUser).user;

        const text = _request.body["text"];
        const post_id = Number(_request.params.postId);
        const user_id = Number(user.id);

        if (text && user_id && post_id) {
            const post: Post = await this.daoContainer.daoPost.findOne(post_id);
            if (post) {
                if (post.user_id_fk == user_id) {
                    post.text = text;
                    this.daoContainer.daoPost.modify(post, post_id);
                    response.send(200);
                } else {
                    next(new HttpException(400, "Post doen't exists"));
                }
            } else {
                next(new HttpException(400, "Post doen't exists"));
            }
        } else {
            next(new HttpException(400, "no text or user id detected"));
        }
    }

    private insertPost = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const user = (req as RequestWithUser).user;
        const text = req.body["text"];
        if (text) {
            const post: Post = new Post(-1, text, Number(user.id ?? "-1"), new Date(Date.now()));
            this.daoContainer.daoPost.create(post);
            res.send(200);
        } else {
            next(new BodyParamsException("text missing"));
        }
    }

    //TODO: Refector this
    private deletePost = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const user = (req as RequestWithUser).user;
        const postId: number = Number(req.params["postId"]);

        if (postId) {
            const post = await this.daoContainer.daoPost.findOne(postId);
            if (post) {
                if (user) {
                    if (Number(user.id) == post.user_id_fk) {
                        this.daoContainer.daoPost.delete(post);
                        res.send(200);
                    } else {
                        next(new HttpException(404, "This post don't belong to you"));
                    }
                }
            } else {
                next(new HttpException(404, "Post not found"));
            }
        } else {
            next(new HttpException(404, "Malformed Query"))
        }
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
