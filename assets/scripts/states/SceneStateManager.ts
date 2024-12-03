import { SceneEventKeys } from "../data/EventKeys";
import { SceneState } from "../states/GameState";
import { EventTarget } from "cc";

export class SceneStateManager {
    public get EventTarget(): EventTarget {
        return this.eventTarget;
    }
    public get CurrentSceneState(): SceneState {
        return this.currentState;
    }

    private static instance: SceneStateManager;
    private currentState: SceneState;
    private eventTarget: EventTarget = new EventTarget();

    private transitions: Map<SceneState, SceneState[]> = new Map([
        [SceneState.Entry, [SceneState.Loading]],
        [SceneState.Menu, [SceneState.Session]],
        [SceneState.Session, [SceneState.EndGame, SceneState.Menu, SceneState.Loading]],
        [SceneState.EndGame, [SceneState.Loading]],
        [SceneState.Loading, [SceneState.Session, SceneState.Menu]],
    ]);

    public Initialize(initialState: SceneState) {
        console.log(`Initializing to state: ${SceneState[initialState]}`);
        this.currentState = initialState;
        SceneStateManager.instance = this;
    }

    public static get Instance(): SceneStateManager {
        if (!SceneStateManager.instance) {
            SceneStateManager.instance = new SceneStateManager();
        }
        return SceneStateManager.instance;
    }


    public SetState(newState: SceneState): boolean {
        if (this.currentState === newState) {
            console.log(`Already in game state: ${SceneState[this.currentState]}`);
            return false;
        }

        const allowedTransitions = this.transitions.get(this.currentState!);

        if (!allowedTransitions || allowedTransitions.includes(newState)) {
            console.log(
                `Transitioning from ${SceneState[this.currentState]} to ${SceneState[newState]}`
            );
            this.currentState = newState;

            this.eventTarget.emit(SceneEventKeys.onSceneStateChanged);

            return true;
        } else {
            console.error(
                `Transition from ${SceneState[this.currentState]} to ${SceneState[newState]} is not allowed`
            );
            return false;
        }
    }
}


