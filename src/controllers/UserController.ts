import express from "express";
import BodyParamsException from "../exception/BodyParamsException";
import UserExistsException from "../exception/UserExistsExeption";
import User from "../models/User";
import {DaoContainer} from "../persistence/dao/Dao";
import Controller from "../webserver/Controller";

export default class UserController extends Controller {

    private static path = "/user";

    constructor(daoContainer: DaoContainer) {
        super(UserController.path, daoContainer);
    }

    public buildAllRequests(): void {
        this.router.get('/', this.getAllUsers);
        this.router.post('/', this.createUser);
    }

    private getAllUsers = (_request: express.Request, response: express.Response) => {
        this.daoContainer.daoUser.findAll().then((users: Array<User>) => {
            response.send(JSON.stringify(users));
        });
    }

    private createUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const username: string = request.body["username"];
        const password: string = request.body["password"];

        if (username && password) {
            const userExists : boolean = await this.daoContainer.daoUser.userExistsByUsername(username);
            if (!userExists) {
                const user: User = {
                    username: username,
                    password: password
                }
                this.daoContainer.daoUser.create(user);
                response.send(200);
            } else {
                next(new UserExistsException());
            }
        } else {
            next(new BodyParamsException("username or password missing on body"))
        }
    }
}
