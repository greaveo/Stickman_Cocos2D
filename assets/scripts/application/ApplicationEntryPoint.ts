import { _decorator, Component, Node } from 'cc';
import { IDataService } from './IDataService';
import { PlayerState } from '../State/PlayerState';
import { DummyJsonDataService } from './DataService';
const { ccclass, property } = _decorator;

@ccclass('ApplicationEntryPoint')
export class ApplicationEntryPoint extends Component {

    @property(PlayerState) private playerState : PlayerState;

    private dataService : IDataService<PlayerState> = new DummyJsonDataService();

    async start() {
        console.log('started');
        await this.dataService.Save(this.playerState.ToJson);
       // var data = await this.dataService.Load();
        console.log('saved');
        console.log(this.playerState);
       // this.playerState.Initialize(data);
       // console.log(this.playerState.LastSetssionState().EnvironmentVisualId);
    }


}


