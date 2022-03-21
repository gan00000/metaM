
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, sys, System, UITransform, RichText, SpriteFrame, Texture2D } from 'cc';
import { MainGame } from '../../MainGame';
import { MapController } from '../../Map/MapController';
import { CUtil } from '../../Utils/CUtil';
import { UIController } from '../UIController';
const { ccclass, property } = _decorator;

@ccclass('LandTipsPageViewComponent')
export class LandTipsPageViewComponent extends Component{

    private pageViewContent:Node = null
    private closeBtn:Node = null
    start () {
        
        this.pageViewContent = find("LandPageView/view/content",this.node)
        this.closeBtn = find("btn_close",this.node)
        
        this.closeBtn.on(Button.EventType.CLICK, () => {
            this.node.removeFromParent()
            this.node.destroy()
        })
    }

}