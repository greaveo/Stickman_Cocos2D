import { _decorator, Button, EventTarget, Label } from 'cc';
import { BaseUI } from './BaseUI';
 
import { PlayerModel } from '../data/Models/PlayerModel';
import { SessionEntryPoint } from '../entryPoints/SessionEntryPoint';
import { PlayerModelEventKeys } from '../data/EventKeys';
import { SessionMetaModel } from '../data/Models/SessionMetaModel';
import { SoundManager } from '../gameplay/controllers/SoundManager';

const { ccclass, property } = _decorator;

@ccclass('MenuUI')
export class MenuUI extends BaseUI  {
    
    @property(Label) private balanceLabel : Label;
    @property(Label) private scoreLabel : Label;
    @property(Label) private recordLabel : Label;
    @property(Label) private buttonLabel : Label;
    @property(Button) private playButton : Button;
    @property(Button) private soundToggleButton : Button;
    @property(Label) private soundToggleLabel : Label;
    @property(SessionEntryPoint) private sessionEntryPoint : SessionEntryPoint;
    
    private eventTarget : EventTarget;
    
    public Initialize(): void {
        this.eventTarget = PlayerModel.Instance.EventTarget;
    }
        
    protected Subscribe(){
        this.eventTarget.on(PlayerModelEventKeys.onBalanceChanged, this.SyncBalance, this);
        this.eventTarget.on(PlayerModelEventKeys.onRecordChanged, this.SyncRecord, this);
        
        this.playButton.node.on('click', this.PlayGame, this);
        this.soundToggleButton.node.on('click', this.SoundToggle, this);
    }

    protected Unsubscribe(){
        this.eventTarget.off(PlayerModelEventKeys.onBalanceChanged, this.SyncBalance, this)
        this.eventTarget.off(PlayerModelEventKeys.onRecordChanged, this.SyncRecord, this);
        this.playButton.node.off('click', this.PlayGame, this)
        this.soundToggleButton.node.off('click', this.SoundToggle, this)
    }

    protected OnShowed(): void {
        this.SyncBalance();
        this.SyncRecord();
        this.SyncScore();
        this.ChangeButtonLabel();
        this.SyncSound();
    }
    
    private SyncBalance(){
        this.balanceLabel.string = PlayerModel.Instance.Balance.toString();
    }
    private SyncRecord(){
        var score = PlayerModel.Instance.Record;
        this.recordLabel.string = score.toString();
    }

    private SyncScore(){
        var score = SessionMetaModel.Instance.Score;
        this.scoreLabel.string = score.toString();
        
        this.scoreLabel.node.parent.active = score != 0;
    }

    private ChangeButtonLabel(){
        var score = SessionMetaModel.Instance.Score;
        var inProgress = (score != 0);
        var text = "PLAY";
        if(inProgress) text = "CONTINUE";

        this.buttonLabel.string = text;
    }

    private PlayGame(){
        SoundManager.Instance.Starting();
        this.sessionEntryPoint.Entry();
    }

    private SoundToggle(){
        var status = !PlayerModel.Instance.SoundToggle;
        PlayerModel.Instance.SwitchSoundToggle(status);
        this.SyncSound();
    }

    private SyncSound(){
        var status = !PlayerModel.Instance.SoundToggle;
        if(!status) this.soundToggleLabel.string = "SOUND ON";
        else this.soundToggleLabel.string = "SOUND OFF";
    }
}


