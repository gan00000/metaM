import { Input, Node, Tween, EventTouch } from 'cc';
import { MainGame } from './../MainGame';

export class MapController {
    private static input: Node = null

    public static init() {
        MapController.input = MainGame.find("MapInput")

        var input = MapController.input

        input.on(Input.EventType.TOUCH_MOVE, (event: EventTouch) => {
            console.log(event.getDelta())
        })
    }
}
