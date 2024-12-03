import { StorageKey } from "./StorageKey";

export interface IDataService<T> {
    Load(key : StorageKey): Promise<T | null>;
    Save(data: T, key : StorageKey): Promise<void>;
}
