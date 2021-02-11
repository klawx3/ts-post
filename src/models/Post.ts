export default class Post {
    id : number
    text : string
    user_id_fk : number
    date : Date

    constructor (id: number, text : string, user_id_fk : number, date : Date){
        this.id = id;
        this.text = text;
        this.user_id_fk = user_id_fk;
        this.date = date;
    }
}