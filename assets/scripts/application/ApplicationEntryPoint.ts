import { _decorator, Component, Node } from 'cc';
import { IDataService } from './IDataService';
import { PlayerStateModel } from '../State/PlayerStateModel';
import { DummyJsonDataService } from './DataService';
import { PlayerState } from '../State/PlayerState';
const { ccclass, property } = _decorator;

@ccclass('ApplicationEntryPoint')
export class ApplicationEntryPoint extends Component {

    @property(PlayerStateModel) private playerStateModel : PlayerStateModel;

    private dataService : IDataService<PlayerState> = new DummyJsonDataService();

    async start() {
        var load = await this.dataService.Load();
        console.log(this.playerStateModel);
        console.log(load);
        this.playerStateModel.Initialize(load);
       console.log(this.playerStateModel.PlayerState().SessionState.EnvironmentVisualId);
    }


}


