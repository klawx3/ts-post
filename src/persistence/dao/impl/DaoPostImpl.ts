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
        const getAllPostQuery : ForumQuery<Post | null> = {
            sql: `INSERT INTO post VALUES (NULL,${post.user_id_fk}, "${post.text}",now());`,
            column: () => (null),
        }
        new QueryFactory<Post | null>(getAllPostQuery,this.con).getNoPromise();
    }

    delete(_object: Post): void {
        const deletePost : ForumQuery<null> = {
            sql: `DELETE FROM post WHERE id = '${_object.id}'`,
            column: () => (null),
        }
        new QueryFactory<null>(deletePost,this.con).getNoPromise();
    }

    modify(post: Post, _id: number): void {
        const deletePost : ForumQuery<null> = {
            sql: `UPDATE post SET user_id_fk = ${post.user_id_fk}, text = '${post.text}' WHERE id = ${_id}`,
            column: () => (null),
        }
        new QueryFactory<null>(deletePost,this.con).getNoPromise();
    }

    
}
