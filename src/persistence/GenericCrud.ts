export default interface GenericCrud<T,U> {
    findOne(id: U) : Promise<T>;
    findAll(): Promise<Array<T>>;
    create(object: T): void;
    delete(object: T): void;
    modify(object : T, id : U): void;
}