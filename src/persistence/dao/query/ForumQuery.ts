export default interface ForumQuery<T> {
    sql : string;
    column?(data : any) : T;
}


// interface Wea {
//     hola : string
//     wea : number
//     func(a: number): string 
// }

// const d : Wea  = {
//     hola: "hola",
//     wea: 4,
//     func: (a) : string => {return "hola" + a}
// }

// const val = d.func(4);