import { _decorator, Component } from 'cc';

import { SceneStateManager } from '../states/SceneStateManager';
import { SceneState } from '../states/GameState';
import { CameraView } from '../gameplay/views/CameraView';
import { CharacterView } from '../gameplay/views/CharacterView';
import { StageView } from '../gameplay/views/StageView';
import { BridgeView } from '../gameplay/views/BridgeView';
const { ccclass, property } = _decorator;

@ccclass('MenuEntryPoint')
export class MenuEntryPoint extends Component {

    @property(StageView)  private stageView : StageView;
    @property(CameraView) private camera :CameraView;
    @property(CharacterView) private characterView : CharacterView;
    @property(BridgeView) private bridge : BridgeView;
    
    public Entry(){
        this.bridge.Clear();
        this.stageView.CreateFirstPlatform();
        this.characterView.PlaceToStart();
        this.camera.FocusToCharacter().start();

        SceneStateManager.Instance.SetState(SceneState.Menu);
   }
   
}


