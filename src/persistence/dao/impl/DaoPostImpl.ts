import Post from "../../../models/Post";
import { DaoPost } from "../Dao";
import { Connection} from "mysql";
import QueryFactory from "../query/QueryFactory";
import ForumQuery from "../query/ForumQuery";

export default class DaoPostImpl implements DaoPost {

    private con : Connection;

    public constructor(con : Connection){
        this.con = con;
    }

    findAll(): Promise<Array<Post>> {
        const getAllPostQuery : ForumQuery<Post> = {
            sql: "SELECT * FROM post",
            column : (data)  =>{
                return new Post(data["id"],data["text"],data["user_id_fk"],data["date"]);
            }
        }
        return new QueryFactory<Post>(getAllPostQuery,this.con).getArrayPromise();
    }
  
    findOne(id: number): Promise<Post> {
        const getAllPostQuery : ForumQuery<Post> = {
            sql: `SELECT * FROM post WHERE id = ${id}`,
            column : (data)  =>{
                return new Post(data["id"],data["text"],data["user_id_fk"],data["date"]);
            }
        }
        return new QueryFactory<Post>(getAllPostQuery,this.con).getSinglePromise();
    }

    create(post: Post): void {
        const getAllPostQuery : ForumQuery<Post> = {
            sql: `INSERT INTO post VALUES (NULL,${post.user_id_fk}, "${post.text}",now());`
        }
        new QueryFactory<Post>(getAllPostQuery,this.con).getNoPromise();
    }

    delete(_object: Post): void {
        throw new Error("Method not implemented.");
    }

    modify(_object: Post, _id: number): void {
        throw new Error("Method not implemented.");
    }

    
}