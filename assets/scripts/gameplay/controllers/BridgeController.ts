import { _decorator, Component, Node } from 'cc';
import { SessionInputHandler } from '../SessionInputHandler';
import { SessionStageModel } from '../../data/Models/SessionStageModel';
import { InputEventKeys } from '../../data/EventKeys';
import { SoundManager } from './SoundManager';

 
const { ccclass, property } = _decorator;

@ccclass('BridgeController')
export class BridgeController extends Component {
   @property(SessionInputHandler) inputHandler : SessionInputHandler;

     protected update(dt: number): void {
          if(!this.inputHandler.IsHolding) return;
          this.OnHolding();
     }

   public Initialize(){
        this.inputHandler.EventTarget.on(InputEventKeys.onMouseUp, this.OnStopHolding, this);
   }

   public OnHolding(){
        SessionStageModel.Instance.IncreaceBrdige();
        SoundManager.Instance.Growing();
   }

   public OnStopHolding(){
        SessionStageModel.Instance.EndTurn();
        SoundManager.Instance.StopGrowing();
   }
}


