import { _decorator } from 'cc';
import { IDataService } from './IDataService';
import { StorageKey } from './StorageKey';



export class JsonDataService<T> implements IDataService<T> {

    async Load(storageKey : StorageKey): Promise<T | null> {
        try {
            var key = StorageKey[storageKey.valueOf()];
            const jsonData = window.localStorage.getItem(key);
            if (jsonData) {
                const data: T = JSON.parse(jsonData);
                
                return data;
            } else {
             
                return null;
            }
        } catch (error) {
            console.error("Error while loading json:", error);
            return null;
        }
    }

    async Save(data: T, storageKey : StorageKey): Promise<void> {
        try {
            var key = StorageKey[storageKey.valueOf()];
            
            const replacer = (key, value) => {
                if (key === 'eventTarget') return undefined;
                return value;
            };

            const jsonString = JSON.stringify(data, replacer);
      
            window.localStorage.setItem(key, jsonString);
           
        } catch (error) {
            console.error("Error while saving object:", error);
        }
    }
}


