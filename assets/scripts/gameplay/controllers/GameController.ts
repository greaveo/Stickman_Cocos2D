import { _decorator, Component, Node, EventTarget, Tween, tween } from 'cc';
import { SceneState, GameState } from '../../states/GameState';
import { SessionStageModel } from '../../data/Models/SessionStageModel';
import { SceneStateManager } from '../../states/SceneStateManager';
import { SessionModelEventKeys, SceneEventKeys } from '../../data/EventKeys';
import { BridgeView } from '../views/BridgeView';
import { CameraView } from '../views/CameraView';
import { CharacterView } from '../views/CharacterView';
import { StageView } from '../views/StageView';

const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
   
   @property(CharacterView) private characterView : CharacterView;
   @property(BridgeView) private bridgeView : BridgeView;
   @property(StageView)  private stageView : StageView;
   @property(CameraView) private camera :CameraView;
    
    private eventTarget : EventTarget;
    private tweenSequence : Tween<any>;

    public Initialize(){
        this.eventTarget = SessionStageModel.Instance.EventTarget;
        
        this.eventTarget.on(SessionModelEventKeys.onStageStateChanged, this.OnStateChanged, this);    
        
    }
    
    private OnStateChanged(){
        var state = SessionStageModel.Instance.GameState;
        
        if(state == GameState.Win) {
           this.tweenSequence = this.WinAnimationSequence().start();
        }

        else if(state == GameState.Lose){
          this.tweenSequence = this.LoseAnimationSequence().start();
        }

        else if(state == GameState.GameInitializing){
            this.tweenSequence?.stop();
            this.tweenSequence = null;
        }
    
    }

    private ChangeTargetPlatform(){
        SessionStageModel.Instance.NextPlatform();
        this.stageView.CreateTargetPlatform();
        this.characterView.MoveToCorn().then(this.stageView.MoveTargetPlatformToOrigin()).call(()=> {
            SessionStageModel.Instance.StartTurn();
        }).start();
        this.bridgeView.AddBridge();
        this.camera.FocusToTarget().start();
    }

    private WinAnimationSequence(): Tween<any> {
        return tween(this)
            .then(this.PushAnimation())
            .then(this.characterView.JumpOnBridge())
            .then(this.characterView.MoveToBridgeEnd())
            .then(this.characterView.JumpFromBridge())
            .call(() => this.ChangeTargetPlatform());
    }
    
    private LoseAnimationSequence(): Tween<any> {
        return tween(this)
            .then(this.PushAnimation())
            .then(this.characterView.JumpOnBridge())
            .then(this.characterView.MoveToBridgeEnd())
            .call(() => SceneStateManager.Instance.SetState(SceneState.EndGame));
    }

    private PushAnimation() : Tween {
       return this.characterView.MoveToCorn().then(this.bridgeView.BridgeFalling());            
    }

}






