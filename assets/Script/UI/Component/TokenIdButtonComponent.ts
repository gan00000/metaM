
import { _decorator, Component, Node, find, Sprite, Button } from 'cc';
import { MapController } from '../../Map/MapController';
const { ccclass, property } = _decorator;

@ccclass('TokenIdButtonComponent')
export class TokenIdButtonComponent extends Component {

    private bgNode = null

    public reset(){
        this.bgNode.active = false
    }
    
    start () {

        this.bgNode = find("white_bg",this.node)
        this.bgNode.active = false
    }

    btnClickCallback (event: Event, customEventData: string) {
        // 这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        const node = event.target as unknown as Node;
        const button = node.getComponent(Button);
        console.log(customEventData); // foobar
        let tokenId = parseInt(customEventData)
        MapController.resetCityInfoState()
        MapController.getDataAndShowLandTips(tokenId,false,null)
        MapController.mTokenIdButtonComponent = this
        // this.bgNode.active = true
    }
    
}