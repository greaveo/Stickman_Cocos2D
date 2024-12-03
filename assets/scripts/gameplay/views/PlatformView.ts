import { _decorator, Component, Node } from 'cc';
import { BridgeView } from './BridgeView';
import { Platform } from '../../data/Models/Platform';
const { ccclass, property } = _decorator;

@ccclass('PlatformView')
export class PlatformView extends Component {
   @property BridgeView : BridgeView;

   public Draw(platform : Platform, ){

   }
}


