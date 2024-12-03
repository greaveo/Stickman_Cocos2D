import { _decorator, Component, Node, UITransform, Vec3, View, tween, Prefab, Tween, Camera, sys } from 'cc';
import { Platform } from '../../data/Models/Platform';
import { SessionStageModel } from '../../data/Models/SessionStageModel';
import { IObjectPool } from '../../tools/objectPool/IObjectPool';
import { ObjectPool } from '../../tools/objectPool/ObjectPool';

const { ccclass, property } = _decorator;

@ccclass('StageView')
export class StageView extends Component {
  
    @property(Prefab) private platformPrefab: Node;

    private platformsPool : IObjectPool<Node>;
    private targetPlatform : Node;

    private spawned : Node[] = [];
    
    protected start(): void {
        this.platformsPool = new ObjectPool(this.platformPrefab, this.node);
    }
    
    public CreateTargetPlatform(){
        this.ActualizePlatforms();
        this.CreatePlatformOutOfView(SessionStageModel.Instance.TargetPlatform);
    }

    public CreateFirstPlatform(){
        this.Clear();
        var data = SessionStageModel.Instance.CurrentPlatform; 
        this.CreatePlatformOutOfView(SessionStageModel.Instance.CurrentPlatform);
        this.targetPlatform.position = data.Center.toVec3();
    }
    
    public MoveTargetPlatformToOrigin() : Tween {
        var pos = SessionStageModel.Instance.TargetPlatform.Center.toVec3();
        var tween = new Tween(this.targetPlatform).to(.4, { position:  pos});
        return tween;
    }

    
    public Clear(){
        this.spawned.forEach(platform => {
            platform.destroy();
        });
        this.spawned = [];

        this.platformsPool.Clear();
    }

    private ActualizePlatforms() {
        var currentPlatform = SessionStageModel.Instance.CurrentPlatform;
        this.spawned = this.spawned.filter(platform => {
            if (platform.position.x < currentPlatform.GetLeftCorn().x - sys.getSafeAreaRect().width) {
                this.platformsPool.Put(platform); 
                return false;
            }
            return true; 
        });
    }
    
    
    private CreatePlatformOutOfView(platformData : Platform) : Node {
        var platform = this.platformsPool.Get();
        var transform = platform.getComponent(UITransform);
        var x = SessionStageModel.Instance.CurrentPlatform.GetRightCorn().x + View.instance.getVisibleSize().width + platformData.Width * 2;
        transform.width = platformData.Width;
        transform.height = platformData.Height;
        platform.position = new Vec3(x, platformData.Center.y);
        platform.active = true;
        this.targetPlatform = platform;
        this.spawned.push(platform);
        return platform;
    }
    
}

