import { _decorator } from 'cc';
import { PlayerState } from '../State/PlayerState';
import { IDataService } from './IDataService';

export class DummyJsonDataService implements IDataService<PlayerState> {
    private readonly storageKey: string = "playerState"; 

    async Load(): Promise<PlayerState | null> {
        try {
            const jsonData = window.localStorage.getItem(this.storageKey);
            if (jsonData) {
                const playerState: PlayerState = JSON.parse(jsonData);
                console.log("Loaded player state:", playerState);
                return playerState;
            } else {
                console.log("No player state found.");
                return null;
            }
        } catch (error) {
            console.error("Error while loading player state:", error);
            return null;
        }
    }


    async Save(data: PlayerState): Promise<void> {
        try {
            const jsonString = JSON.stringify(data);
            window.localStorage.setItem(this.storageKey, jsonString);
            console.log("Player state saved successfully:", data);
        } catch (error) {
            console.error("Error while saving player state:", error);
        }
    }
}
