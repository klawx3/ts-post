import HttpException from "./HttpException";

export default class BodyParamsException extends HttpException{
    constructor(paramsMissing : string){
        super(401,paramsMissing);
    }
}
