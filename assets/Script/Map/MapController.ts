import { Input, Node, Tween, EventTouch, EventMouse, Vec2, Vec3, UITransform } from 'cc';
import { MainGame } from './../MainGame';

export class MapController {
    private static input: Node = null

    private static world: Node = null;

    // 是否正在拖动地图
    private static isMoving: boolean = false;

    public static minScale: number = 0.02;
    public static maxScale: number = 2.0;

    public static increaseRate: number = 10000;

    public static init() {
        MapController.input = MainGame.find("MapInput")
        MapController.world = MainGame.find("world")
        console.log("MapController.world = ", MapController.world)
        console.log("MapController.input = ", MapController.input)

        var input = MapController.input

        input.on(Input.EventType.TOUCH_MOVE, (event: EventTouch) => {
            // console.log(event.getDelta())
            let touches: any[] = event.getTouches(); // 获取所有触摸点
            console.log("touches =", touches)
            if (touches.length === 1) {
                // cc.log('single touch');
                // single touch
                if (!MapController.isMoving) {
                    // MapController.isMoving = true;
                    let dir: Vec2 = touches[0].getDelta();
                    MapController.dealMove(dir, MapController.world, MainGame.mainCanvas);
                }
            }
        });

        input.on(Input.EventType.MOUSE_WHEEL, function (event: EventMouse) {
            
            let worldPos: Vec2 = event.getLocation();
            let scrollDelta: number = event.getScrollY();
            let scale: number = (MapController.world.scale.y + (scrollDelta / MapController.increaseRate));

            let target: Node = MapController.world;
            let mapTF = <UITransform>target?.getComponent(UITransform);

            let wPos = new Vec3(worldPos.x, worldPos.y, 0);
            let pos: Vec3 = mapTF.convertToNodeSpaceAR(wPos);
            MapController.smoothOperate(target, pos, scale);
        });
    }

    private static dealMove(dir: Vec2, map: Node, container: Node): void {
        //获取Canvas节点的UITransform组件
        let mapTF = <UITransform>map?.getComponent(UITransform);
        let containerTF = <UITransform>container?.getComponent(UITransform);

        let worldPos: Vec3 = mapTF.convertToWorldSpaceAR(Vec3.ZERO);
        let nodePos: Vec3 = containerTF.convertToNodeSpaceAR(worldPos);
        nodePos.x += dir.x;
        nodePos.y += dir.y;
        let edge: any = MapController.calculateEdge(map, container, nodePos);
        let pos: Vec3 = map.getPosition();
        // if (edge.left <= 0 && edge.right <= 0) {
        //     map.setPosition(pos.x+dir.x, pos.y, pos.z);
        // }
        // if (edge.top <= 0 && edge.bottom <= 0) {
        //     map.setPosition(pos.x, pos.y+dir.y, pos.z);
        // }
        map.setPosition(pos.x+dir.x, pos.y+dir.y, pos.z);
    }

    // 计算map的四条边距离容器的距离，为负代表超出去
    public static calculateEdge(target: Node, container: Node, nodePos: Vec3): any {
        // distance to the edge when anchor is (0.5, 0.5)
        let targetTF = <UITransform>target?.getComponent(UITransform);
        let containerTF = <UITransform>container?.getComponent(UITransform);

        let horizontalDistance: number = (containerTF.width - targetTF.width * target.scale.x) / 2;
        let verticalDistance: number = (containerTF.height - targetTF.height * target.scale.y) / 2;

        let left: number = horizontalDistance + nodePos.x;
        let right: number = horizontalDistance - nodePos.x;
        let top: number = verticalDistance - nodePos.y;
        let bottom: number = verticalDistance + nodePos.y;

        return { left, right, top, bottom };
    }

    // 平滑缩放
    private static smoothOperate(target: Node, pos: Vec3, scale: number): void {
        // 放大缩小
        if (MapController.minScale <= scale && scale <= MapController.maxScale) {
            target.setScale(scale, scale, 1);
            // // 当前缩放值与原来缩放值之差
            // let deltaScale: number = scale - target.scale.x;
            // // 当前点击的坐标与缩放值差像乘
            // let t :Vec2 = new Vec2();
            // t.sc
            // let gapPos: Vec3 = pos.scale(cc.v2(deltaScale, deltaScale));
            // // 当前node坐标位置减去点击 点击坐标和缩放值的值
            // let mapPos: cc.Vec2 = target.position.sub(gapPos);
            // // 获取速率的小数后几位，防止速率过小时取整直接舍弃掉了变化
            // const rateStr: string = this.fingerIncreaseRate.toString();
            // const digit: number = rateStr.split('.')[1] ? rateStr.split('.')[1].length : 0;
            // const rate: number = Math.pow(10, 2 + digit);
            // scale = Math.floor(scale * rate) / rate;
            // target.scale = scale;
            // this.dealScalePos(mapPos, target);
        }
    }

}
