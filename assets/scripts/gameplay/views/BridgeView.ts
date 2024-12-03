import { _decorator, Component, EventTarget, Node, Prefab, sys, tween, Tween, UITransform, Vec3 } from 'cc';
import { IObjectPool } from '../../tools/objectPool/IObjectPool';
import { ObjectPool } from '../../tools/objectPool/ObjectPool';
import { SessionStageModel } from '../../data/Models/SessionStageModel';

import { GameState } from '../../states/GameState';
import { SoundManager } from '../controllers/SoundManager';
const { ccclass, property } = _decorator;


//TODO: To IComplexView interface
@ccclass('BridgeView')
export class BridgeView extends Component {
    @property(Prefab) private bridgePrefab : Node;
    @property private fallDuration: number = 1;

    private pool : IObjectPool<Node>;
    private activeBridge : UITransform;

    private views : Node[] = [];

    protected start(): void {
        this.pool = new ObjectPool(this.bridgePrefab, this.node, 3);
    }

    protected update(dt: number):  void {
        if(this.activeBridge == null) return;
        if(SessionStageModel.Instance.GameState != GameState.PlayerTurn) return;
        if(this.activeBridge.height == SessionStageModel.Instance.BridgeLength) return;

        this.activeBridge.height = SessionStageModel.Instance.BridgeLength;
    }

    public BridgeFalling() : Tween{
        const endRotation = 90; 
         return tween(this.activeBridge.node)
          .to(this.fallDuration, {
              eulerAngles: new Vec3(0, 0, -endRotation) 
          }).call(() => {
            SoundManager.Instance.Collision();
          });
      }

    public AddBridge(){        
        this.Actualize();
        var newBridge = this.pool.Get();
        var currentPlatform = SessionStageModel.Instance.CurrentPlatform;
        var pos = new Vec3(currentPlatform.GetRightCorn());
        newBridge.position = pos;
        this.activeBridge = newBridge.getComponent(UITransform);
        this.activeBridge.height = 0;
        this.activeBridge.width = 10;
        this.activeBridge.node.setRotationFromEuler(Vec3.ZERO);

        this.views.push(newBridge);
        newBridge.active = true;
    }
    
    public Clear(){
        this.views.forEach(platform => {
            platform.destroy();
        });
        this.views = [];
        this.pool.Clear();
       
    }

    private Actualize() {
        var currentPlatform = SessionStageModel.Instance.CurrentPlatform;
        this.views = this.views.filter(view => {
            if (view.position.x < currentPlatform.GetLeftCorn().x - sys.getSafeAreaRect().width) {
                this.pool.Put(view);
                return false;
            }
            return true; 
        });
    }

}


