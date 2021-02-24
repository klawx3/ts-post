import {Connection} from "mysql";
import User from "../../../models/User";
import {DaoUser} from "../Dao";
import ForumQuery from "../query/ForumQuery";
import QueryFactory from "../query/QueryFactory";

export default class DaoUserImpl implements DaoUser {

    private con: Connection;

    public constructor(con: Connection) {
        this.con = con;
    }

    isValid(user: User): Promise<User> {
        const isValidUser: ForumQuery<User> = {
            sql: `SELECT * FROM user WHERE username = '${user.username}' AND passwd = SHA2('${user.password}',0)`,
            column: this.buildUserColumnData()
        }
        return new QueryFactory<User>(isValidUser, this.con).getSinglePromise();
    }

    findOne(id: number): Promise<User> {
        const findOneUser: ForumQuery<User> = {
            sql: `SELECT * FROM user WHERE id = ${id}`,
            column: this.buildUserColumnData()
        }
        return new QueryFactory<User>(findOneUser, this.con).getSinglePromise();
    }

    findAll(): Promise<User[]> {
        const findAllUsers: ForumQuery<User> = {
            sql: `SELECT * FROM user`,
            column: this.buildUserColumnData()
        }
        return new QueryFactory<User>(findAllUsers, this.con).getArrayPromise();
    }

    create(__object: User): void {
        throw new Error("Method not implemented.");
    }

    delete(_object: User): void {
        throw new Error("Method not implemented.");
    }

    modify(_object: User, _id: number): void {
        throw new Error("Method not implemented.");
    }
    private buildUserColumnData(): any {
        return (data: any) => {
            const user: User = {
                id: data["id"],
                username: data["username"],
                //password: data["password"]
            }
            console.log(JSON.stringify(user));
            return user;
        }
    }

}
