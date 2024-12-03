export interface IObjectPool<T> {
    Get(): T;
    Put(obj : T);
    Clear() : void;
}
