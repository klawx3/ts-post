
import GenericCrud from "../GenericCrud";
import Post from "../../models/Post";
import User from "../../models/User";

export interface DaoContainer {
    daoPost: DaoPost;
    daoUser: DaoUser;
}
export interface DaoPost extends GenericCrud<Post, number> {}

export interface DaoUser extends GenericCrud<User, number> {
    isValid(user: User): Promise<User>
    userExistsById(id : number): Promise<boolean>
    userExistsByUsername(username : string): Promise<boolean>
}


