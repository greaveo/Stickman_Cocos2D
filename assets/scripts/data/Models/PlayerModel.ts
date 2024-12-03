import { _decorator } from 'cc';
import { EventTarget } from 'cc';
import { SessionMetaModel } from './SessionMetaModel';
import { PlayerModelEventKeys } from '../EventKeys';
 

export class PlayerModel {
    
    public get EventTarget() : EventTarget{return this.eventTarget;}
    public get Balance(): number {return this.balance;}
    public get Record(): number {return this.record;}
    public get SoundToggle(): boolean {return this.soundToggle;}

    private balance: number;
    private record: number;
    private soundToggle: boolean;

    private readonly eventTarget = new EventTarget();
    private static instance: PlayerModel;
    
    public Initialize(params){     

        if (PlayerModel.instance) {
            throw new Error("PlayerModel is already initialized.");
        }
        this.balance = params.balance;
        this.record = params.record;
        this.soundToggle = params.soundToggle;
        
        PlayerModel.instance = this;
    }

    public static get Instance(): PlayerModel {
        if (!this.instance) {
            throw new Error("Model is not initialized. Call Initialize first.");
        }
        return this.instance;
    }


    public ApplySessionResult(){
        var result = SessionMetaModel.Instance;
        this.TryUpdateRecord(result.Score);
        this.balance += result.Coins;
        SessionMetaModel.Instance.Reset();
        
        this.eventTarget.emit(PlayerModelEventKeys.onSessionEnded)
    }

    public SwitchSoundToggle(on : boolean){
        this.soundToggle = on;
        this.eventTarget.emit(PlayerModelEventKeys.onSettingsChanged);
    }

    private TryUpdateRecord(record: number){
        if(record <= this.record) return;
       
        this.record = record;
        this.eventTarget.emit(PlayerModelEventKeys.onRecordChanged);
    }
}