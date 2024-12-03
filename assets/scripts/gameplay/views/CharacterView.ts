import { _decorator, Component, Node, Tween, tween, UITransform, Vec3, math } from 'cc';
import { SessionStageModel } from '../../data/Models/SessionStageModel';
import { Platform } from '../../data/Models/Platform';
import { GlobalGameSettings } from '../../data/GlobalGameSettings';
import { BridgeView } from '../views/BridgeView';
const { ccclass, property } = _decorator;

@ccclass('CharacterView')
export class CharacterView extends Component {
    @property(Node) character : Node;
    @property(BridgeView) bridge : BridgeView;
    @property moveSpeed : number = 800;

    private get currentPlatform() : Platform  {return SessionStageModel.Instance.CurrentPlatform}
    private get targetPlatform() : Platform  {return SessionStageModel.Instance.TargetPlatform}

    
    private characterTransform : UITransform;

    protected start(): void {
        this.characterTransform = this.character.getComponent(UITransform);
    }

    public PlaceToStart(){
        this.character.position = new Vec3(this.currentPlatform.Center.x, this.PlatformY);
    }

    private TweenMoveTo(A : Vec3, B: Vec3) : Tween {
        B.x -= this.characterTransform.width / 2;
        var time = Vec3.distance(A, B) / this.moveSpeed;
        return tween(this.character).to(time, { position: B });
    }


    public MoveToCorn() : Tween {
        var start = this.character.position;
        var end = this.currentPlatform.GetRightCorn().x - GlobalGameSettings.BridgeWidth;
        return this.TweenMoveTo(start, new Vec3(end, this.PlatformY));
    }

    public MoveToBridgeEnd() : Tween {
        var start = this.BridgeBegin;
       return this.TweenMoveTo(start, this.BridgeEnd);
    }

    public JumpOnBridge() : Tween{
        return this.TweenMoveTo(this.currentPlatform.GetRightCorn(), this.BridgeBegin);
    }

    public JumpFromBridge() : Tween {
        var startX =  SessionStageModel.Instance.BridgeRightCornX();
        var startY = this.BridgeY;
        var start = new Vec3(startX, startY);
        return this.TweenMoveTo(start, this.BridgeEndOut );
    }

    private get BridgeY() : number{
        return this.PlatformY + GlobalGameSettings.BridgeWidth;
    }

    private get PlatformY() : number{
      
        var y = this.currentPlatform.GetTopPositionY();
        var charSizeOffset = this.characterTransform.contentSize.height / 2
        return y + charSizeOffset;
    }

    private get BridgeBegin() : Vec3{
        var x = this.currentPlatform.GetRightCorn().x + this.characterTransform.width;
        var y = this.BridgeY;
        return new Vec3(x,y);
    }

    private get BridgeEndOut() : Vec3{
        var bridgeCorn = SessionStageModel.Instance.BridgeRightCornX();
        var platformCorn = this.targetPlatform.GetRightCorn();
        var difference = platformCorn.x - bridgeCorn;
        var width = this.characterTransform.width;
        
        var x = math.clamp(difference, 0, width) + bridgeCorn;
        var y = this.PlatformY;
        return new Vec3(x,y);
    }
    private get BridgeEnd() : Vec3{
        var x = SessionStageModel.Instance.BridgeRightCornX();
        var y = this.BridgeY;
        return new Vec3(x,y);
    }

}


