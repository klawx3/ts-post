import express from "express";
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
    }

    private getAllUsers = (_request: express.Request, response: express.Response) => {
        this.daoContainer.daoUser.findAll().then((users: Array<User>) => {
            response.send(JSON.stringify(users));
        });
    }
}
