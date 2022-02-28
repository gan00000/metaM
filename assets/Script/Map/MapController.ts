import { Input, Node, Tween, EventTouch } from 'cc';
import { MainGame } from './../MainGame';

export class MapController {
    public static input: Node = null;

    public static Init() {
        MapController.input = MainGame.Find("MapInput")

        var input = MapController.input

        input.on(Input.EventType.TOUCH_MOVE, (event: EventTouch) => {
            console.log(event.getDelta())
        })
    }
}
