import { _decorator, Component } from 'cc';
import { SceneState } from '../states/GameState';
import { UIController } from '../UI/UIController';
import { InputController } from '../gameplay/controllers/InputController';
import { BridgeController } from '../gameplay/controllers/BridgeController';
import { SceneStateManager } from '../states/SceneStateManager';
import { GameController } from '../gameplay/controllers/GameController';
import { MenuEntryPoint } from './MenuEntryPoint';
import { SessionStageModel } from '../data/Models/SessionStageModel';
 

const { ccclass, property } = _decorator;

@ccclass('GameplayEntryPoint')
export class GameplayEntryPoint extends Component {
    
    @property(UIController) uiController : UIController;
    @property(InputController) inputController : InputController;
    @property(BridgeController) bridgeController : BridgeController;
    @property(GameController) gameController : GameController;

    @property(MenuEntryPoint) menuEntryPoint : MenuEntryPoint;
   
    protected start(): void {
        this.Entry();
    }

    public Entry(){
        SceneStateManager.Instance.SetState(SceneState.Loading);
        SessionStageModel.Instance.HandleSavedSession();
        
        this.uiController.Initialize();
        this.inputController.Initialize();
        this.bridgeController.Initialize();
        this.gameController.Initialize();
        
        
        this.menuEntryPoint.Entry();
    }

}


