
import { _decorator, Component, Node, find, director, view, sys } from 'cc';
import { MapController } from './Map/MapController';
import { UIController } from './UI/UIController';
import { CUtil } from './Utils/CUtil';
const { ccclass } = _decorator;

@ccclass('MainGame')
export class MainGame extends Component {
    public static mainCamera: Node = null
    public static mainCanvas: Node = null

    public static deltaTime: number = 0

    // address=0xd31Fd81F500e2e8F5588A91568B4bfbd2c96C508
    public static address: string = null
    public static language: string = null

    public static find(name: string) {
        return find(name, MainGame.mainCanvas)
    }

    /**
     * name
     */
    public static isLogin() {
        if (MainGame.address && MainGame.address != "" && MainGame.address != "null") {
            return true
        } else {
            return false
        }
    }

    public start() {
        MainGame.mainCanvas = find("Canvas")
        MainGame.mainCamera = find("Camera", MainGame.mainCanvas)
        
        MainGame.address = CUtil.getQueryVariable("address")
        MainGame.language = CUtil.getQueryVariable("language")
        if (!MainGame.language) {
            MainGame.language = "en"
        }

        // LoginTokenController.init()
        MapController.init()
        UIController.init()
        
        sys.BrowserType
    }

    public update(deltaTime: number) {
        MainGame.deltaTime = deltaTime
    }

}
