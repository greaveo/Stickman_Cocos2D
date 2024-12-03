import { _decorator, Component, Label, EventTarget, tween, Vec3, Button } from 'cc';
import { BaseUI } from './BaseUI';
import { SessionMetaModel } from '../data/Models/SessionMetaModel';
import { SessionModelEventKeys } from '../data/EventKeys';
import { PlayerModel } from '../data/Models/PlayerModel';
import { MenuEntryPoint } from '../entryPoints/MenuEntryPoint';
import { SceneStateManager } from '../states/SceneStateManager';
import { SessionStageModel } from '../data/Models/SessionStageModel';
import { SceneState } from '../states/GameState';
const { ccclass, property } = _decorator;

@ccclass('SessionUI')
export class SessionUI extends BaseUI {
    
    @property(Label) private coinsLable : Label;
    @property(Label) private scoreLabel : Label;
    @property(Label) private recordLabel : Label;
    @property(Button) private menuButton : Button;
    @property(MenuEntryPoint) private menuEP : MenuEntryPoint;
    private eventTarget : EventTarget;
   
    public Initialize(): void {
       this.eventTarget = SessionMetaModel.Instance.EventTarget;
    }
    protected Subscribe(): void {
        this.eventTarget.on(SessionModelEventKeys.onScoreChanged, this.SyncScore, this);
        this.eventTarget.on(SessionModelEventKeys.onBalanceChanged, this.SyncCoins, this);
        this.menuButton.node.on("click", this.BackToMenu, this);
    }
    protected Unsubscribe(): void {
        this.eventTarget.off(SessionModelEventKeys.onScoreChanged, this.SyncScore, this);
        this.eventTarget.off(SessionModelEventKeys.onBalanceChanged, this.SyncCoins, this);
        this.menuButton.node.off("click", this.BackToMenu, this);
    }

    protected OnShowed(): void {
        this.SyncCoins();
        this.SyncScore();
    }

    private SyncRecord(){
        var record = PlayerModel.Instance.Record;
        var score = SessionMetaModel.Instance.Score;
       
        var actual = score < record;
        
        this.recordLabel.node.parent.active = actual;
        if(!actual) return;

        this.ChangeText(record.toString(), this.recordLabel);
    }

    private SyncScore(){
        var score = SessionMetaModel.Instance.Score;
        
        this.ChangeText(score.toString(), this.scoreLabel);
        this.SyncRecord();
    }

    private SyncCoins(){
        var coins = SessionMetaModel.Instance.Coins;
        this.ChangeText(coins.toString(), this.coinsLable);
    }

    private ChangeText(text: string, label: Label) {
        if (text == label.string) return;
        label.string = text;
        tween(label.node)
            .to(0.2, { scale: new Vec3(1.2, 1.2, 1) }) 
            .to(0.2, { scale: new Vec3(1.0, 1.0,1) })
            .start();
    }

    private BackToMenu(){
        SceneStateManager.Instance.SetState(SceneState.Loading);
        SessionStageModel.Instance.PauseSession();
        this.menuEP.Entry();
    }
    
  
}


