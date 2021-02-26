import {NextFunction, RequestHandler} from "express";
import DataStoredInToken from "../authentication/DataStoresInToken";
import HttpException from "../exception/HttpException";
import UnauthorizedException from "../exception/UnauthorizedException";
import RequestWithUser from "../models/RequestWithUser";
import User from "../models/User";
import {DaoUser} from "../persistence/dao/Dao";
import {getDataStoredInToken, verifyToken} from "../util/JWTUtil";
import Middleware from "../webserver/Middleware";

export default class AuthenticationMiddleware implements Middleware {

    private daoUser: DaoUser;
    private static JWT_POSITION: number = 1;
    private static EXPECTED_BEARER_LENGTH: number = 2;

    constructor(daoUser: DaoUser) {
        this.daoUser = daoUser;
        this.daoUser.findAll();
    }

    getMiddleware(): RequestHandler | any {
        return this.authMiddleware;
    }

    private authMiddleware = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
        const token = this.findJwtToken(req);
        if (token) {
            try {
                await this.verifyUser(token, req, next); //FIXME: refactor this
            } catch (r) {
                next(new UnauthorizedException());
            }
        } else {
            next(new UnauthorizedException());
        }
        next();
    }

    private async verifyUser(token: string, req: RequestWithUser, next: NextFunction) {
        const verifiedToken = verifyToken(token);
        const tokenData: DataStoredInToken = getDataStoredInToken(verifiedToken);
        if (tokenData) {
            const user: User = await this.daoUser.findOne(Number(tokenData.id));
            if (user) {
                req.user = user;
            } else {
                next(new HttpException(500, 'User not found on DB'));
            }
        } else {
            next(new UnauthorizedException());
        }
    }

    private findJwtToken(req: RequestWithUser): string | null {
        const fullAuth: string = (req.headers as any)['authorization'];
        if (fullAuth && fullAuth.length !== 0) {
            const authSplited: string[] = fullAuth.split(' ');
            if (authSplited.length === AuthenticationMiddleware.EXPECTED_BEARER_LENGTH) {
                const jwtAuth = authSplited[AuthenticationMiddleware.JWT_POSITION];
                return jwtAuth;
            }
        }
        return null;
    }

}
