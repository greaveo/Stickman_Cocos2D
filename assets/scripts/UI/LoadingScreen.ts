import { _decorator, Node, Component, EventTarget, director, tween, Tween, UIOpacity, CCFloat } from 'cc';
import { SceneState } from '../states/GameState';
import { SceneEventKeys } from '../data/EventKeys';
import { SceneStateManager } from '../states/SceneStateManager';

const { ccclass, property } = _decorator;

@ccclass('LoadingScreen')
export class LoadingScreen extends Component {

    @property(Node) private loadingPanel: Node;
    
    private UIOpacity : UIOpacity;
    private eventTarget: EventTarget;

    @property({ type: CCFloat }) private minDisplayTime: number = .5;
    @property({ type: CCFloat }) private fadeDuration: number = 0.25;

    private isLoading: boolean = false;

    public Initialize() {
        this.eventTarget = SceneStateManager.Instance.EventTarget;
        this.eventTarget.on(SceneEventKeys.onSceneStateChanged, this.OnGameStateChanged, this);
        director.addPersistRootNode(this.node);
        this.loadingPanel.active = false;
        this.UIOpacity = this.loadingPanel.getComponent(UIOpacity);
        this.UIOpacity.opacity = 255; 
    }

    private OnGameStateChanged() {
        const state = SceneStateManager.Instance.CurrentSceneState;
        if (state === SceneState.Loading) {
            this.StartLoading();
        } else {
            this.Loaded();
        }
    }

    private StartLoading(): void {
        if (this.isLoading) return;

        this.isLoading = true;
        this.loadingPanel.active = true;
        this.UIOpacity.opacity = 255; 

        tween(this.UIOpacity)
            .to(this.fadeDuration, { opacity: 255 }) 
            .call(() => {
                this.scheduleOnce(() => {
                    this.isLoading = false;
                }, this.minDisplayTime);
            })
            .start();
    }

    private Loaded(): void {
        if (!this.isLoading) {
            this.HideLoading();
        } else {
            this.scheduleOnce(() => {
                this.HideLoading();
            }, this.minDisplayTime);
        }
    }

    private HideLoading(): void {
        tween(this.UIOpacity)
            .to(this.fadeDuration, { opacity: 0 }) 
            .call(() => {
                this.loadingPanel.active = false;
            })
            .start();
    }
}
