export interface IDataService<T> {
    Load(): Promise<T | null>;
    Save(data: T): Promise<void>;
}
