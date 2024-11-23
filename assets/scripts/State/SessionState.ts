import { EventTarget } from 'cc';
import { StateEventKeys } from './StateEventKeys';

export class SessionState  {
    private score: number = 0;
    private attempts: number = 3;
    private platformPassed: number = 0;
    private environmentVisualId: string = "Summer";
    
    public AttemptsLeft(){return this.attempts}
    public Score(){return this.score}
    public PlatformPassed(){return this.platformPassed}
    public EnvironmentVisualId(){return this.environmentVisualId}

    private readonly eventTarget = new EventTarget();

    constructor(params) {
        this.score = params.score;
        this.attempts = params.attempts;
        this.platformPassed = params.platformPassed;
        this.environmentVisualId = params.environmentVisualId;

        console.log(params);
    }
  

    public AddScore(amount : number){
        this.score += amount;
        this.eventTarget.emit(StateEventKeys.scoreChanged);
    }

    public SetAttempts(attempt: number){
        this.attempts = attempt;
        this.eventTarget.emit(StateEventKeys.attemptsChanged);
    }
    
    public PassPlatform(){
        this.platformPassed++;
        this.eventTarget.emit(StateEventKeys.platformPassed);
    }

    public ChangeEnvironment(newEnv : string){
        this.environmentVisualId = newEnv;
        this.eventTarget.emit(StateEventKeys.environmentChagned);
    }
}


