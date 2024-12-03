import { EventTarget } from "cc";
import { SessionModelEventKeys } from "../EventKeys";
 

export class SessionMetaModel {
    public get Score() { return this.score; };
    public get Attempts() { return this.attempts; };
    public get PlatformPassed() { return this.platformPassed; };
    public get EnvironmentVisualId() { return this.environmentVisualId; };
    public get Coins() { return this.coins; }
    public get EventTarget(){return this.eventTarget};
    private score: number;
    private attempts: number;
    private coins: number;
    private platformPassed: number;
    private environmentVisualId: string;
    private static instance: SessionMetaModel;

    private readonly eventTarget = new EventTarget();

    public Initialize(params) {
       
        if (SessionMetaModel.instance) {
            throw new Error("Model is already initialized.");
        }

        this.coins = params.coins;
        this.score = params.score;
        this.attempts = params.attempts;
        this.platformPassed = params.platformPassed;
        this.environmentVisualId = params.environmentVisualId;

        SessionMetaModel.instance = this;
        
    }

    public static get Instance(): SessionMetaModel {
        if (!this.instance) {
            throw new Error("Model is not initialized. Call Initialize first.");
        }
        return this.instance;
    }

    
    public SetAttempts(attempt: number) {
        this.attempts = attempt;
        this.eventTarget.emit(SessionModelEventKeys.onAttemptsChanged);
    }
    
    public PassPlatform() {
        this.platformPassed++;
        this.AddScore();
    }

    public Reset(){
        this.coins =0;
        this.score = 0;
        this.attempts = 3;
        this.platformPassed = 0;
        this.environmentVisualId = "summer";

    }

    public AddBonus(){
        this.AddScore();
    }
    
    public AddCoin() {
        this.coins++;
    }   
    private AddScore(amount: number = 1) {
        this.score += amount;
        this.eventTarget.emit(SessionModelEventKeys.onScoreChanged);
    }



}



