import express from "express";
import TokenData from "../authentication/TokenData";
import generateToken from "../authentication/TokenFactory";
import User from "../models/User";
import {DaoContainer} from "../persistence/dao/Dao";
import Controller from "../webserver/Controller";

export default class AuthenticationController extends Controller {

    private static basePath: string = "/auth";

    constructor(daoContainer: DaoContainer) {
        super(AuthenticationController.basePath, daoContainer);
    }

    public buildAllRequests(): void {
        this.router.post('/login', this.login);
    }

    private login = (_request: express.Request, _response: express.Response) => {
        const {username, password} = _request.body;
        const user: User = {
            username: username,
            password: password
        }
        this.daoContainer.daoUser.isValid(user).then((user: User) => {
            if (user) {
                const token : TokenData = generateToken(user);
                _response.send(JSON.stringify(token));
            } else {
                _response.send("mal");
            }
        });
    }

}
