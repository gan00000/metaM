
import { _decorator, Component, Node, find } from 'cc';
import { MapController } from './Map/MapController';
import { LoginTokenController } from './UI/Component/LoginTokenController';
import { NtfsController } from './UI/Component/NtfsController';
import { UIController } from './UI/UIController';
const { ccclass } = _decorator;

@ccclass('MainGame')
export class MainGame extends Component {
    public static mainCamera: Node = null
    public static mainCanvas: Node = null

    public static deltaTime: number = 0

    public static find(name: string) {
        return find(name, MainGame.mainCanvas)
    }

    public start() {
        MainGame.mainCanvas = find("Canvas")
        MainGame.mainCamera = find("Camera", MainGame.mainCanvas)

        MapController.init()
        UIController.init()
        LoginTokenController.init()
        NtfsController.init()
    }

    public update(deltaTime: number) {
        MainGame.deltaTime = deltaTime
    }
}
