import {Connection} from "mysql";
import ForumQuery from "./ForumQuery";

export default class QueryFactory<T> {

    private forumQuery: ForumQuery<T>;
    private con: Connection;

    constructor(forumQuery: ForumQuery<T>, con: Connection) {
        this.forumQuery = forumQuery;
        this.con = con;
    }

    public getArrayPromise(): Promise<Array<T>> {
        return new Promise((resolve: any, reject: any) => {
            this.con.query(this.forumQuery.sql, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const postArray = rows.map((column: any) => (this.forumQuery.column(column)));
                    resolve(postArray);
                }
            });
        });
    }

    public getSinglePromise(): Promise<T> {
        return new Promise((resolve: any, reject: any) => {
            this.con.query(this.forumQuery.sql, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const singleRow = rows.map((column: any) => (this.forumQuery.column(column)))[0];
                    resolve(singleRow);
                }
            });
        });
    }

    public getNoPromise(): void {
        this.con.query(this.forumQuery.sql);
    }

}
