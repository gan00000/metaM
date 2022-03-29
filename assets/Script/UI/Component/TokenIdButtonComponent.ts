
import { _decorator, Component, Node, find, Sprite, Button, resources, Prefab, instantiate } from 'cc';
import { MainGame } from '../../MainGame';
import { MapController } from '../../Map/MapController';
import { LandTipsNode2Component } from './LandTipsNode2Component';
import { SLightComponent } from './SLightComponent';
const { ccclass, property } = _decorator;

@ccclass('TokenIdButtonComponent')
export class TokenIdButtonComponent extends Component {

    private bgNode = null
    private parent:Node = null

    public reset(){
        this.bgNode.active = false
    }
    
    start () {

        this.parent = MainGame.find("UIParent")
        this.bgNode = find("white_bg",this.node)
        this.bgNode.active = false
    }

    btnClickCallback (event: Event, customEventData: string) {
        // 这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        const node = event.target as unknown as Node;
        const button = node.getComponent(Button);
        console.log(customEventData); // foobar
        let tokenId = parseInt(customEventData)
        // MapController.resetCityInfoState()
        // MapController.getDataAndShowLandTips(tokenId,false,null)
        // MapController.mTokenIdButtonComponent = this
        // this.bgNode.active = true

        MapController.resetCityInfoState()
        let tokenIds = [tokenId]
        let lightUIPos = MapController.lightPosWithTokenId[tokenId] //点击左边tokenId
        if (!lightUIPos) {
            return
        }
        resources.load("Prefab/LandTipsNode2", Prefab, (err, data) => {
            if (err) {
                console.log(err);
            }
            let mLandTipsNode2: Node = instantiate(data);
            let mLandTipsNode2Component = mLandTipsNode2.getComponent(LandTipsNode2Component)
            mLandTipsNode2Component.setData(tokenIds)
            mLandTipsNode2Component.callback = (m) => {
                MapController.resetCityInfoState()
            }
            
            this.parent.addChild(mLandTipsNode2)
            MapController.mCityInfo = mLandTipsNode2
            //设置弹框能够移动
            MapController.setTouchMove(mLandTipsNode2)

            let key = lightUIPos.x + "_" + lightUIPos.y
            let lightNode:Node = MapController.lightPosWithLightNode[key]
            if (lightNode) {
                lightNode.getComponent(SLightComponent).doClick()
            }

                
        })

    }
    
}