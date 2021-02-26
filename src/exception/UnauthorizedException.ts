import HttpException from "./HttpException";

export default class UnauthorizedException extends HttpException {
    constructor(){
        super(401,'Unauthorized xd');
    }
}
