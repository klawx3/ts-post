import HttpException from "./HttpException";

export default class WorngCredentialsException extends HttpException {

    constructor(){
        super(404,'Wrong Cretendials');
    }

}
