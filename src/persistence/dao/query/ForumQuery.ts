export default interface ForumQuery<T> {
    sql : string;
    column(data : any) : T;
}
