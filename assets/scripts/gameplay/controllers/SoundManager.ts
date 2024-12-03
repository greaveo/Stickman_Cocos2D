import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
import { PlayerModel } from '../../data/Models/PlayerModel';
import { PlayerModelEventKeys } from '../../data/EventKeys';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    @property(AudioClip) private growing : AudioClip;
    @property(AudioClip) private starting : AudioClip;
    @property(AudioClip) private collision1 : AudioClip;
    @property(AudioClip) private collision2 : AudioClip;

    @property(AudioSource) private source : AudioSource;
    @property(AudioSource) private music : AudioSource;

    private isGrowing : boolean;
    private collision : AudioClip;

    public static Instance : SoundManager;


    protected start(): void {
        if(SoundManager.Instance != null) return;
        SoundManager.Instance = this;

        var playerEvents = PlayerModel.Instance.EventTarget;
        playerEvents.on(PlayerModelEventKeys.onSettingsChanged, this.SetSoundToggle, this);
        this.collision = this.collision1;
        this.SetSoundToggle();
    }

    public SetSoundToggle(){
        var toggle = PlayerModel.Instance.SoundToggle;
        var volume = 0;
         toggle? volume = .5 : volume = 0;
         this.music.volume = volume;
         this.source.volume = volume - 0.3;
        
    }

    public Growing(){
        if(this.isGrowing) return;
        this.source.loop = true;
        this.source.clip = this.growing;
        this.source.play();
        this.isGrowing = true;
    }

    public StopGrowing(){
        this.source.loop = false;
        this.isGrowing = false;
        this.source.stop();
    }

    public Starting(){
        this.source.clip = this.growing;
        this.source.playOneShot(this.starting);
    }

    public Collision(){
        this.source.clip = this.growing;
        this.source.playOneShot(this.collision);
        this.collision == this.collision1 ? this.collision = this.collision2 : this.collision=this.collision1 
    }





    
}


