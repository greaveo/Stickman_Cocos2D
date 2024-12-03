import { _decorator, Button, Component, Node } from 'cc';
import { BaseUI } from './BaseUI';
import { SessionEntryPoint } from '../entryPoints/SessionEntryPoint';
import { SceneStateManager } from '../states/SceneStateManager';
import { SceneState } from '../states/GameState';
import { MenuEntryPoint } from '../entryPoints/MenuEntryPoint';
import { SessionModelEventKeys } from '../data/EventKeys';
import { SessionStageModel } from '../data/Models/SessionStageModel';
const { ccclass, property } = _decorator;

@ccclass('EndUI')
export class EndUI extends BaseUI {
    
    @property(SessionEntryPoint) sessionEP : SessionEntryPoint;
    @property(MenuEntryPoint) menuEP : MenuEntryPoint;
    
    @property(Button) menu : Button;
    @property(Button) restart : Button;
    

    protected Subscribe(): void { 
        this.menu.node.on('click', this.Menu, this);
        this.restart.node.on('click', this.Restart, this);

    }
    protected Unsubscribe(): void {
        this.menu.node.off('click', this.Menu, this);
        this.restart.node.off('click', this.Restart, this)
    }

    private Restart(){
        SceneStateManager.Instance.SetState(SceneState.Loading);
        SessionStageModel.Instance.EndSession();
        this.sessionEP.Entry();
    }

    private Menu(){
        SceneStateManager.Instance.SetState(SceneState.Loading);
        SessionStageModel.Instance.EndSession();
        this.menuEP.Entry();
    }
}


