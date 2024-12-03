import { _decorator, Component, Input, input, EventMouse, EventTouch, EventTarget } from 'cc';
import { InputEventKeys } from '../data/EventKeys';
 
const { ccclass } = _decorator;

@ccclass('SessionInputHandler')
export class SessionInputHandler extends Component {

    public get EventTarget(): EventTarget {return this.eventTarget};
    public get IsHolding() : boolean {return this.isHolding};  
    private isHolding: boolean = false;  

    private eventTarget : EventTarget = new EventTarget();

    onEnable() {
        input.on(Input.EventType.TOUCH_START, this.onPointerDown, this);
        input.on(Input.EventType.MOUSE_DOWN, this.onPointerDown, this);
        input.on(Input.EventType.TOUCH_END, this.onPointerUp, this);
        input.on(Input.EventType.MOUSE_UP, this.onPointerUp, this);
    }

    onDisable() {
        input.off(Input.EventType.TOUCH_START, this.onPointerDown, this);
        input.off(Input.EventType.MOUSE_DOWN, this.onPointerDown, this);
        input.off(Input.EventType.TOUCH_END, this.onPointerUp, this);
        input.off(Input.EventType.MOUSE_UP, this.onPointerUp, this);
        this.isHolding = false;
    }

    private onPointerDown(event: EventMouse | EventTouch) {
        if (!this.isHolding) {
            this.isHolding = true;
            this.eventTarget.emit(InputEventKeys.onMouseDown)
        }
    }

    private onPointerUp(event: EventMouse | EventTouch) {
        if (this.isHolding) {
            this.isHolding = false;
            this.eventTarget.emit(InputEventKeys.onMouseUp)
        }
    }
}
