import { EventTarget, Vec2, Vec3 } from "cc";
import { GlobalGameSettings } from "../../data/GlobalGameSettings";
import { JsonDataService } from "../../data/Loader/DataService";
import { IDataService } from "../../data/Loader/IDataService";
import { StorageKey } from "../../data/Loader/StorageKey";
import { PlayerModel } from "../../data/Models/PlayerModel";
import { SessionMetaModel } from "../../data/Models/SessionMetaModel";
import { PlatformHelper, SessionStageModel } from "../../data/Models/SessionStageModel";
import { PlayerModelEventKeys, SessionModelEventKeys } from "../../data/EventKeys";
import { Platform } from "../../data/Models/Platform";
import { State } from "../../states/SessionStateManager";

export class DataManager {
    private static instance : DataManager;
    
    private dataService : IDataService<any> = new JsonDataService();
    private playerEvents : EventTarget;
    private stageEvents : EventTarget;

    public async Initialize(){
        
        if (DataManager.instance) {
            console.warn("DataManager has been initialized before.");
            return;
        }

        DataManager.instance = this;

        await this.InitializeModels();

        this.playerEvents = PlayerModel.Instance.EventTarget;
        this.stageEvents = SessionStageModel.Instance.EventTarget;

        this.playerEvents.on(PlayerModelEventKeys.onBalanceChanged, this.SavePlayerState, this);
        this.playerEvents.on(PlayerModelEventKeys.onRecordChanged, this.SavePlayerState, this);
        this.playerEvents.on(PlayerModelEventKeys.onSettingsChanged, this.SavePlayerState, this);
        
        this.stageEvents.on(SessionModelEventKeys.onStageStateChanged, this.SaveSessionState, this);
    }

    
    
    private async InitializeModels(){

        var playerData = await this.dataService.Load(StorageKey.playerData);
        var metaData = await this.dataService.Load(StorageKey.metaData);
        var stageData = await this.dataService.Load(StorageKey.stageData);
        if(playerData == null) playerData = {balance : 0, record: 0, soundToggle : true};
        if(metaData == null) metaData = GlobalGameSettings.DefaultMetaState;
        
        if(stageData == null) {
            var platformHelper : PlatformHelper = new PlatformHelper()
            var currentPlatform = platformHelper.FirstPlatform();
            var targetPlatform = platformHelper.CreateNewPlatform(currentPlatform);
            
            stageData = { 
                currentPlatform,
                targetPlatform,
                bridgeLength : 0,
                coinPosition : Vec3.ZERO,
                state :  { get: 0, transitions: {} }
            }};


        var stage = new SessionStageModel();
        var meta = new SessionMetaModel();
        var player = new PlayerModel();

        var Center : Vec2 = stageData.currentPlatform.Center;
        var Width : number = stageData.currentPlatform.Width;
        
        var currentPlatform = new Platform({Center, Width});

        var Center : Vec2 = stageData.targetPlatform.Center;
        var Width : number = stageData.targetPlatform.Width;
        var targetPlatform = new Platform({Center, Width});
        var state = new State(stageData.state);
      
        stageData.currentPlatform = currentPlatform;
        stageData.targetPlatform = targetPlatform;
        stageData.state = state;

        meta.Initialize(metaData);
        player.Initialize(playerData);
        stage.Initialize(stageData);
    }


    private async SaveSessionState(){
        await this.dataService.Save(SessionMetaModel.Instance, StorageKey.metaData); 
        await this.dataService.Save(SessionStageModel.Instance, StorageKey.stageData); 
    }

    private async SavePlayerState(){
        await this.dataService.Save(PlayerModel.Instance, StorageKey.playerData); 
    }
}


