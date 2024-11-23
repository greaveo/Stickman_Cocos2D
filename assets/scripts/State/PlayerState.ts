import { SessionState } from "./SessionState";

 export class PlayerState {
    public SoftAssets: number;
    public Record: number;
    public SoundToggle: boolean;
    public SessionState: SessionState;

    constructor(params){
        this.SoftAssets = params.softAssets;
        this.Record = params.record;
        this.SoundToggle = params.soundToggle;
        this.SessionState = new SessionState(params.sessionState);
    }
}
