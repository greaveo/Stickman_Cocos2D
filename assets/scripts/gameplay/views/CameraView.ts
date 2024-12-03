import { _decorator, Camera, Component, Node, tween, Vec2, sys, Tween, Vec3} from 'cc';
import { SessionStageModel } from '../../data/Models/SessionStageModel';
import { Platform } from '../../data/Models/Platform';
const { ccclass, property } = _decorator;

@ccclass('CameraView')
export class CameraView extends Component {
    @property(Camera) private camera : Camera;
    
   public FocusToTarget() : Tween {
       var platform = SessionStageModel.Instance.CurrentPlatform;
       var pos = new Vec2(platform.Center.x + this.xOffset, 0);
       
       return this.MoveTo( pos);
    }

    public FocusToCharacter() : Tween{
        var platform = SessionStageModel.Instance.CurrentPlatform;
        var pos = new Vec2(platform.Center.x, 0);
        return this.MoveTo(pos);
     }
    
    public Reset(){
        var platform = SessionStageModel.Instance.CurrentPlatform;
        var pos = new Vec3(platform.Center.x, 0);
        this.camera.node.position = pos;
    }
    
    private MoveTo(pos : Vec2){
        return tween(this.camera.node).
        to(0.4, { position:  pos.toVec3()});
    }
    
    private get xOffset() : number{
        var screenSize = sys.getSafeAreaRect().size.x;
        return screenSize / 2 - this.platform.Width /2; 
    }

    private get platform() : Platform {return SessionStageModel.Instance.CurrentPlatform};
    
}


