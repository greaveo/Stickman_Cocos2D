import { _decorator, Component, DebugMode, EventTarget } from 'cc';
import { SessionInputHandler } from '../SessionInputHandler';
import { SessionModelEventKeys, SceneEventKeys } from '../../data/EventKeys';
import { SessionStageModel } from '../../data/Models/SessionStageModel';
import { GameState } from '../../states/GameState';
const { ccclass, property } = _decorator;

@ccclass('InputController')
export class InputController extends Component {

    @property(SessionInputHandler) sessionInput : SessionInputHandler;
    private eventTarget : EventTarget;

    public Initialize(){
        this.eventTarget = SessionStageModel.Instance.EventTarget;
        this.eventTarget.on(SessionModelEventKeys.onStageStateChanged, this.SwitchInputs, this);
        this.SwitchInputs();
    }

    SwitchInputs(){
        if(SessionStageModel.Instance.GameState == GameState.PlayerTurn) this.sessionInput.enabled = true;
        else this.sessionInput.enabled = false;
    }
}


