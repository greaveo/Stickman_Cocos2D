import { GameState } from "./GameState";


export class State {

    public get Get(): GameState {
        return this.get;
    }

    private get: GameState;

    private readonly transitions: Map<GameState, GameState[]> = new Map([
        [GameState.GameInitializing, [GameState.PlayerTurn]],
        [GameState.PlayerTurn, [GameState.GameInitializing, GameState.Lose, GameState.Win]],
        [GameState.Win, [GameState.PlayerTurn]],
        [GameState.Lose, [GameState.GameInitializing, GameState.PlayerTurn]],
    ]);

    public constructor(params) {
        this.get = params.get;
    }

    public SetState(newState: GameState): boolean {
        if (this.get === newState) {
            console.log(`Already in state: ${GameState[this.get]}`);
            return false;
        }

        const allowedTransitions = this.transitions.get(this.get!);

        if (!allowedTransitions || allowedTransitions.includes(newState)) {
           
            this.get = newState;

            return true;
        } else {
            console.error(
                `Transition from ${GameState[this.get]} to ${GameState[newState]} is not allowed`
            );
            return false;
        }
    }


}
