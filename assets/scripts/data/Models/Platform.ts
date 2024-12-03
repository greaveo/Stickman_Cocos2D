import { Vec2, Vec3 } from "cc";
import { GlobalGameSettings } from "../GlobalGameSettings";

export class Platform {
    public readonly Center: Vec2;
    public readonly Height: number;
    public readonly Width: number;

    constructor(params) {
        this.Center = new Vec2(params.Center.x, params.Center.y);
        this.Width = params.Width;
        this.Height = GlobalGameSettings.PlatformHeight;
    }


    public GetLeftCorn(): Vec3 {
        var x = this.Center.x - this.Width / 2;
        var y = this.GetTopPositionY();
        return new Vec3(x, y);
    }

    public GetRightCorn(): Vec3 {
        var x = this.Center.x + this.Width / 2;
        var y = this.GetTopPositionY();
        return new Vec3(x, y);
    }

    public GetTopPositionY(): number {
        return GlobalGameSettings.PlatformY + this.Height / 2;
    }

    public GetRangeX(): Vec2 {
        return new Vec2(this.GetLeftCorn().x, this.GetRightCorn().x);
    }

    public GetBonusRangeX(): Vec2 {
        var centerCornLeft = this.Center.x - GlobalGameSettings.BonusAreaWidth / 2;
        var centerCornRight = this.Center.x + GlobalGameSettings.BonusAreaWidth / 2;
        return new Vec2(centerCornLeft, centerCornRight);
    }
}
