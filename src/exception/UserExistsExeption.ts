import HttpException from "./HttpException";

export default class UserExistsException extends HttpException {
    constructor(){
        super(400,"User exists");
    }
}
