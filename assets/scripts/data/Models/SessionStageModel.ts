
import { Vec2, EventTarget } from "cc";
import { GlobalGameSettings } from "../GlobalGameSettings";
 
import { Platform } from "./Platform";
import { SessionModelEventKeys } from "../EventKeys";
import { GameState } from "../../states/GameState";
import { State } from "../../states/SessionStateManager";
import { SessionMetaModel } from "./SessionMetaModel";
import { PlayerModel } from "./PlayerModel";

export class SessionStageModel {
   
    public get EventTarget() : EventTarget{return this.eventTarget;}
    public get TargetPlatform(): Platform { return this.targetPlatform; }
    public get CurrentPlatform(): Platform { return this.currentPlatform;}
    public get CoinPosition(): Vec2 { return this.coinPosition;}
    public get BridgeLength(): number { return this.bridgeLength;}
    public get GameState() : GameState {return this.state.Get};

    private static instance : SessionStageModel;
    private currentPlatform: Platform;
    private targetPlatform: Platform;
    private coinPosition: Vec2;
    private bridgeLength : number;
    
    private eventTarget = new EventTarget();
    private platformHelper : PlatformHelper = new PlatformHelper();
    private state: State;
    

    public Initialize (params) {
        this.currentPlatform = params.currentPlatform;
        this.targetPlatform = params.targetPlatform;
        this.bridgeLength = params.BridgeLength;
        this.coinPosition = params.CoinPosition;
        this.state = params.state;
       
        SessionStageModel.instance = this;
    }

    public static get Instance(): SessionStageModel {
        if (!this.instance) {
            throw new Error("Model is not initialized. Call Initialize first.");
        }
        return this.instance;
    }
    
    public EndSession(){
        this.state.SetState(GameState.GameInitializing);
        this.PrepareNewSession();
        PlayerModel.Instance.ApplySessionResult();
        this.eventTarget.emit(SessionModelEventKeys.onStageStateChanged);
    }
    
    public PauseSession(){
        this.HandleSavedSession();          
    }
    
    public StartTurn(){
        if(this.state.Get == GameState.Lose) console.error(`Tryed to start turn in ${this.state.Get}`);
        
        this.bridgeLength = 0;
        this.state.SetState(GameState.PlayerTurn);
        this.eventTarget.emit(SessionModelEventKeys.onStageStateChanged);
    }
    
    public EndTurn(){
        if(this.state.Get != GameState.PlayerTurn) console.error(`Tryed to end turn in ${this.state.Get}`);
        
        var passed = SessionStageModel.Instance.BridgeInTargetPlatformRange();
        
        if(passed) {
            if(this.BridgeInBonusAreaRange()) {
                SessionMetaModel.Instance.AddBonus();
                this.eventTarget.emit(SessionModelEventKeys.onBonusAreaCollided)
            };
            
            this.state.SetState(GameState.Win);
            SessionMetaModel.Instance.PassPlatform();
        }
        
        else{
            this.state.SetState(GameState.Lose);
        }
        this.eventTarget.emit(SessionModelEventKeys.onStageStateChanged);
    }
    
    public NextPlatform(){
        if(this.state.Get != GameState.Win && this.state.Get != GameState.GameInitializing) console.error(`Tryed to add platform in ${this.state.Get}`);
        
        this.currentPlatform = this.targetPlatform;
        this.targetPlatform = this.platformHelper.CreateNewPlatform(this.currentPlatform);
    }
    
    public IncreaceBrdige(){
        if(this.state.Get != GameState.PlayerTurn) console.error(`Tryed to increase in State: ${this.state.Get}`);
        this.bridgeLength += GlobalGameSettings.BridgeGrowingStep;
    }

    public HandleSavedSession(){
        var state = this.GameState;
        console.log(state);
        switch (state) {
            case GameState.Lose:this.EndSession();break;
            case GameState.Win: this.StartTurn(); break;
            default:
                break;
        }
        this.state.SetState(GameState.GameInitializing);
        this.eventTarget.emit(SessionModelEventKeys.onStageStateChanged);
    }

    private PrepareNewSession(){
        if(this.state == null) this.state = new State({State : GameState.GameInitializing});
        if(this.state.Get != GameState.GameInitializing) console.error(`Tryed to prepare session in ${this.state.Get}`);

        this.currentPlatform = this.platformHelper.FirstPlatform();
        this.targetPlatform = this.platformHelper.CreateNewPlatform(this.currentPlatform);
        this.bridgeLength =  0;
    }
    
    public BridgeRightCornX() : number {
        return this.CurrentPlatform.GetRightCorn().x + this.bridgeLength;
    }
    private BridgeInTargetPlatformRange() : boolean {
        return this.InArea(this.targetPlatform.GetRangeX());
    }
    
    private BridgeInBonusAreaRange() : boolean {
        return this.InArea(this.targetPlatform.GetBonusRangeX());
    }
    
    private InArea(targetXRange : Vec2) : boolean{
        return this.BridgeRightCornX() >= targetXRange.x && this.BridgeRightCornX() <= targetXRange.y;
    }    

}

export class PlatformHelper{

    public CreateNewPlatform(currentPlatform : Platform) : Platform{
        var Width = Math.random() * (GlobalGameSettings.MaxPlatformWidth - GlobalGameSettings.MinPlatformWidth) + GlobalGameSettings.MinPlatformWidth;
        
        var minDistance = GlobalGameSettings.MinDistance + Width/2 + currentPlatform.GetRightCorn().x;
        var maxDistance = GlobalGameSettings.MaxDistance - Width + currentPlatform.GetRightCorn().x;

        var randomX = Math.random() * (maxDistance - minDistance) + minDistance;
        var Center = new Vec2(randomX, GlobalGameSettings.PlatformY);
        var platform : Platform = new Platform({Center, Width});
        return platform;
    }

    public FirstPlatform() : Platform{
        var Width = GlobalGameSettings.DefaultPlatformWidth;
        var x = 0;
        var Center  = new Vec2(x, GlobalGameSettings.PlatformY);
        return new Platform({Width, Center});
    }
}




