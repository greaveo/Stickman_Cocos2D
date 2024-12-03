import { director } from 'cc';
import { _decorator, Component } from 'cc';

import { SceneState } from '../states/GameState';
import { LoadingScreen } from '../UI/LoadingScreen';
import { SceneStateManager } from '../states/SceneStateManager';
import { DataManager } from '../gameplay/controllers/DataManager';

 

const { ccclass, property} = _decorator;

@ccclass('ApplicationEntryPoint')
export class ApplicationEntryPoint extends Component {

    @property(LoadingScreen) private loadScreen : LoadingScreen;

    async start() {
        SceneStateManager.Instance.Initialize(SceneState.Entry);
        await new DataManager().Initialize();
        this.loadScreen.Initialize();
        director.loadScene("game");  
    }

}

