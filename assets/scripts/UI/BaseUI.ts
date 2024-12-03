import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('BaseUI')
export abstract class BaseUI extends Component {
    
    public Initialize() : void{};

    protected abstract Subscribe() : void;
    protected abstract Unsubscribe() : void;

    public Show() : void{
        this.Subscribe();
        this.OnShowed();
    }

    public Hide() : void {
        this.Unsubscribe();
        this.OnHided();
    }
    
    protected OnShowed() : void{}
    protected OnHided() : void{}

}


