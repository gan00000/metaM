
import { _decorator, Component, Node, find, Sprite, Button } from 'cc';
import { MapController } from '../../Map/MapController';
const { ccclass, property } = _decorator;

@ccclass('TokenIdButtonComponent')
export class TokenIdButtonComponent extends Component {
    
    start () {

    }

    btnClickCallback (event: Event, customEventData: string) {
        // 这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        const node = event.target as unknown as Node;
        const button = node.getComponent(Button);
        console.log(customEventData); // foobar
        let tokenId = parseInt(customEventData)
        MapController.getDataAndShowLandTips(tokenId,false)
    }
    
}