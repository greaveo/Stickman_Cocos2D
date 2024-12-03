import { _decorator, Component, Node, UITransform, Vec3 } from 'cc';
import { GlobalGameSettings } from '../../data/GlobalGameSettings';
const { ccclass, property } = _decorator;

@ccclass('TargetView')
export class TargetView extends Component {
   
    start() {
        var size = this.getComponent(UITransform);
        size.width = GlobalGameSettings.BonusAreaWidth;    
        this.node.position = new Vec3(0, GlobalGameSettings.PlatformHeight/2 - size.height/2);
    }
}


