import { _decorator, Component, Node } from 'cc';
import { SceneState, GameState } from '../states/GameState';

import { SceneStateManager } from '../states/SceneStateManager';
import { SessionStageModel } from '../data/Models/SessionStageModel';
import { CharacterView } from '../gameplay/views/CharacterView';
import { CameraView } from '../gameplay/views/CameraView';
import { StageView } from '../gameplay/views/StageView';
import { BridgeView } from '../gameplay/views/BridgeView';

 

const { ccclass , property} = _decorator;

@ccclass('SessionEntryPoint')
export class SessionEntryPoint extends Component {
    
    @property(BridgeView) bridge : BridgeView;
    @property(StageView)  private stageView : StageView;
    @property(CameraView) private camera :CameraView;
    @property(CharacterView) private character :CharacterView;

    public Entry(){
        this.bridge.Clear();
        this.stageView.CreateFirstPlatform();
        this.stageView.CreateTargetPlatform();
        this.character.PlaceToStart();
        this.bridge.AddBridge();
        
        
        this.stageView.MoveTargetPlatformToOrigin()
        .parallel( this.camera.FocusToTarget())
        .then(this.character.MoveToCorn()).call(()=> {
            SessionStageModel.Instance.StartTurn();
        }).start();
        
        SceneStateManager.Instance.SetState(SceneState.Session);
       
    }
}


