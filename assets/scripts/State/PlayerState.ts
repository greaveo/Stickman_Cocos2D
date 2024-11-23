import { _decorator, Component, Node } from 'cc';
import { EventTarget } from 'cc';
import { StateEventKeys } from './StateEventKeys';
import { SessionState } from './SessionState';

const { ccclass, property } = _decorator;
@ccclass('PlayerState')
export class PlayerState extends Component {
    
    public SoftAssets() {return this.softAssets};
    public Record() {return this.record};
    public SoundToggle() : boolean {return this.soundToggle};
    public SetssionState() : SessionState {return this.sessionState};
    
    private softAssets : number;
    private record : number;
    private soundToggle : boolean;
    private sessionState : SessionState;

    private readonly eventTarget = new EventTarget();

    public Initialize(params){
        this.softAssets = params.softAssets;
        this.record = params.record;
        this.SoundToggle = params.soundToggle;
        this.sessionState = params.lastSessionState;
        console.log(params);

        this.eventTarget.emit(StateEventKeys.playerInitialized);
    }

    public TryUpdateRecord(record: number){
        if(record <= this.record) return;
       
        this.record = record;
        this.eventTarget.emit(StateEventKeys.recordChanged);
    }

    public SwitchSoundToggle(on : boolean){
        this.soundToggle = on;
        this.eventTarget.emit(StateEventKeys.settingsChanged);
    }

    public AddSoft(amount : number){
        var assetsEnough = (amount > 0 || this.softAssets >= amount);
        
        if(!assetsEnough){
            console.log("Soft isn't enough!")
            return;
        }

        this.softAssets += amount;
        this.eventTarget.emit(StateEventKeys.walletChanged);
    }


}


