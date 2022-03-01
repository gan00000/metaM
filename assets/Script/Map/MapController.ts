import { Input, Node, Tween, EventTouch, EventMouse, Vec2, Vec3, UITransform, find, clamp } from 'cc';
import { MainGame } from './../MainGame';

export class MapController {
    private static mapInput: Node = null
    private static mapGroup: Node = null

    private static oneMapWidth: number = 6498
    private static oneMapHeight: number = 3724

    //地图组成个数
    private static mapCount = 3

    private static minScale: number = 0.2
    private static maxScale: number = 1.8

    private static basePosYRange: number = 0

    private static mouseWheelRate: number = 0.0001

    public static init() {
        this.mapInput = MainGame.find("MapInput")
        this.mapGroup = find("MapGroup", this.mapInput)

        this.basePosYRange = this.oneMapHeight * this.minScale

        var input = this.mapInput

        input.on(Input.EventType.TOUCH_MOVE, (event: EventTouch) => {
            this.move(event.getDeltaX(), event.getDeltaY())
        })

        input.on(Input.EventType.MOUSE_WHEEL, (event: EventMouse) => {
            this.scale(this.mouseWheelRate * event.getScrollY())
        })
    }

    private static getPosYRangeV2: Vec2 = null
    private static getPosYRange(): Vec2 {
        if (!this.getPosYRangeV2) {
            this.getPosYRangeV2 = new Vec2(0, 0)
        }

        // 计算出最大最小Pos Y
        let range = (this.mapGroup.scale.x * this.oneMapHeight - this.basePosYRange) / 2

        if (range <= 0) {
            this.getPosYRangeV2.x = 0
            this.getPosYRangeV2.y = 0
        } else {
            this.getPosYRangeV2.x = range
            this.getPosYRangeV2.y = -range
        }

        return this.getPosYRangeV2
    }


    private static getPosXRangeV2: Vec2 = null
    private static getPosXRange(): Vec2 {
        if (!this.getPosXRangeV2) {
            this.getPosXRangeV2 = new Vec2(0, 0)
        }

        // 计算出最大最小Pos X
        let border = 50
        let range = (this.mapGroup.scale.x * this.oneMapWidth) - border

        this.getPosXRangeV2.x = range
        this.getPosXRangeV2.y = -range

        return this.getPosXRangeV2
    }

    private static move(deltaX: number, deltaY: number) {
        let x = this.mapGroup.position.x + deltaX
        let y = this.mapGroup.position.y + deltaY

        let posYRange = this.getPosYRange()
        y = clamp(y, posYRange.y, posYRange.x)

        let posXRange = this.getPosXRange()
        if (x > posXRange.x) {
            x -= posXRange.x
        } else if (x < posXRange.y) {
            x -= posXRange.y
        }

        this.mapGroup.setPosition(x, y, 0)
    }

    private static scale(scale: number, deltaX?: number, deltaY?: number) {
        if (!deltaX) deltaX = 0
        if (!deltaY) deltaY = 0

        scale += this.mapGroup.scale.x

        scale = clamp(scale, this.minScale, this.maxScale)

        this.mapGroup.setScale(scale, scale, scale)
        this.move(deltaX, deltaY)
    }
}
