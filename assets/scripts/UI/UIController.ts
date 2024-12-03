import { _decorator, Component, director, EventTarget } from 'cc';
import { BaseUI } from './BaseUI';
import { SceneState } from '../states/GameState';
import { SceneEventKeys } from '../data/EventKeys';
import { SceneStateManager } from '../states/SceneStateManager';
const { ccclass, property } = _decorator;

@ccclass('UIController')
export class UIController extends Component {

    @property(BaseUI) private menuUI : BaseUI;
    @property(BaseUI) private sessionUI : BaseUI;
    @property(BaseUI) private endUI : BaseUI;
 
    private stateToUIMap: Map<SceneState, BaseUI>;

    private eventTarget : EventTarget;

    public Initialize(){
        this.eventTarget = SceneStateManager.Instance.EventTarget;
        
        this.stateToUIMap = new Map([
            [SceneState.Menu, this.menuUI],
            [SceneState.Session, this.sessionUI],
            [SceneState.EndGame, this.endUI]
        ]);

        this.InitializeBaseUIs();    
        this.eventTarget.on(SceneEventKeys.onSceneStateChanged, this.OnGameStateChanged, this);
    }

    private OnGameStateChanged() : void{
        var state = SceneStateManager.Instance.CurrentSceneState;
        this.DisableAll();
        const activeUI = this.stateToUIMap.get(state);
        if(activeUI) this.Enable(activeUI);
        
    }

    private Enable(ui : BaseUI){
        ui.node.active = true;
        ui.Show();
    }

    private DisableAll(){
        this.stateToUIMap.forEach((ui) => {
            ui.Hide();
            ui.node.active = false; 
        });
    }

    private InitializeBaseUIs(){
        this.stateToUIMap.forEach((ui) => {
            ui.Initialize();
            ui.node.active = false; 
        });
    }
}


