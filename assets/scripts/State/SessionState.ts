 export class SessionState  {
    public Score: number = 0;
    public Attempts: number = 3;
    public PlatformPassed: number = 0;
    public EnvironmentVisualId: string = "Summer";
   
    constructor(params) {
        this.Score = params.score;
        this.Attempts = params.attempts;
        this.PlatformPassed = params.platformPassed;
        this.EnvironmentVisualId = params.environmentVisualId;
    }  
}


