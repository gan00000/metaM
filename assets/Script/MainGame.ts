
import { _decorator, Component, Node, find } from 'cc';
import { MapController } from './Map/MapController';
const { ccclass } = _decorator;

@ccclass('MainGame')
export class MainGame extends Component {
    public static mainCamera: Node = null
    public static mainCanvas: Node = null

    public static find(name: string) {
        return find(name, MainGame.mainCanvas)
    }

    public start() {
        MainGame.mainCanvas = find("Canvas")
        MainGame.mainCamera = find("Camera", MainGame.mainCanvas)

        MapController.init()
    }
}
