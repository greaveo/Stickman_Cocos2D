import { _decorator, Component, Node } from 'cc';
import { EventTarget } from 'cc';
import { StateEventKeys } from './StateEventKeys';
import { PlayerState } from './PlayerState';
import { SessionState } from './SessionState';

const { ccclass, property } = _decorator;
@ccclass('PlayerStateModel')
export class PlayerStateModel extends Component {
    
    public static Instance : PlayerStateModel;
    public PlayerState() : PlayerState {return this.playerState};
    
    private playerState : PlayerState;
    private sessionState() : SessionState { return this.playerState.SessionState};
    private readonly eventTarget = new EventTarget();

    protected onLoad(): void {
        if(PlayerStateModel.Instance != null) this.destroy;
        PlayerStateModel.Instance = this;
    }

    public Initialize(playerState : PlayerState){
        console.log("Initialized model")
        this.playerState = playerState;
        this.eventTarget.emit(StateEventKeys.playerInitialized);
    }

    public AddScore(amount : number){
       this.sessionState().Score += amount;
        this.eventTarget.emit(StateEventKeys.scoreChanged);
    }

    public SetAttempts(attempt: number){
        this.sessionState().Attempts = attempt;
        this.eventTarget.emit(StateEventKeys.attemptsChanged);
    }
    
    public PassPlatform(){
        this.sessionState().PlatformPassed++;
        this.eventTarget.emit(StateEventKeys.platformPassed);
    }

    public ChangeEnvironment(newEnv : string){
        this.sessionState().EnvironmentVisualId = newEnv;
        this.eventTarget.emit(StateEventKeys.environmentChagned);
    }

    public TryUpdateRecord(record: number){
        if(record <= this.playerState.Record) return;
       
        this.playerState.Record = record;
        this.eventTarget.emit(StateEventKeys.recordChanged);
    }

    public SwitchSoundToggle(on : boolean){
        this.playerState.SoundToggle = on;
        this.eventTarget.emit(StateEventKeys.settingsChanged);
    }

    public AddSoft(amount : number){
        var assetsEnough = (amount > 0 || this.playerState.SoftAssets >= amount);
        
        if(!assetsEnough){
            console.log("Soft isn't enough!")
            return;
        }

        this.playerState.SoftAssets += amount;
        this.eventTarget.emit(StateEventKeys.walletChanged);
    }
}



