import { sys } from "cc";

export class GlobalGameSettings {
   

    private static get ScreenWidth(){return sys.getSafeAreaRect().width }
    private static get ScreenHeight(){return sys.getSafeAreaRect().height }
    public static get BridgeWidth(){return 10};

    public static get MaxPlatformWidth(): number{
        return this.ScreenWidth * 0.2;
    }

    public static get MinPlatformWidth(): number{
        return this.ScreenWidth * 0.1;
    }
    
    public static get DefaultPlatformWidth(): number{
        return this.ScreenWidth * 0.15;
    }
    public static get BonusAreaWidth(): number{
        return this.MinPlatformWidth * 0.4;
    }
   
    public static get MinDistance(): number{
        return this.ScreenWidth * 0.05;
    }

    public static get MaxDistance(): number {
        return this.ScreenWidth - this.MaxPlatformWidth;
    }

    public static get ScreenZeroHeight(): number {
        return -(this.ScreenHeight * 0.5);
    }

    public static get PlatformHeight(): number {
        return this.ScreenHeight * 0.33;
    }

    public static get PlatformY(): number {
        return this.ScreenZeroHeight + this.PlatformHeight * 0.5;
    }

    public static get PlatformTopY(): number {
        return this.PlatformY + this.PlatformHeight;
    }

    public static readonly AttemptsCount: number = 3;
    public static readonly BridgeGrowingStep: number = 20;

    public static readonly DefaultMetaState = {
        coins: 0,
        score: 0,
        attempts: GlobalGameSettings.AttemptsCount,
        platformPassed: 0,
        environmentVisualId: "summer"
    };
}
