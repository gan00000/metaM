
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, sys, System, UITransform, RichText, SpriteFrame, Texture2D } from 'cc';
import { MainGame } from '../../MainGame';
import { MapController } from '../../Map/MapController';
import { CUtil } from '../../Utils/CUtil';
import { UIController } from '../UIController';
import { LandTipsNode2Component } from './LandTipsNode2Component';
import { NtfsController } from './NtfsController';
import { SPageViewComponent } from './SPageViewComponent';
const { ccclass, property } = _decorator;

@ccclass('SLightComponent')
export class SLightComponent extends Component{

    private lightTokenIds:number[] = []
    private tokenIdMapLandUrl = {}
    private tokenIdMapCityInfo = {}
    private parent:Node = null

    start () {

        this.parent = MainGame.find("UIParent")
        this.node.on(Button.EventType.CLICK, () => {

            console.log("slight click")
            if (this.lightTokenIds.length>0) {
                console.log("lightTokenIds = ",this.lightTokenIds)
                // for (let index = 0; index < this.lightTokenIds.length; index++) {
                //     const tokenId = this.lightTokenIds[index];
                    
                // }

                resources.load("Prefab/LandTipsNode2", Prefab, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    let mLandTipsNode2: Node = instantiate(data);
                    mLandTipsNode2.getComponent(LandTipsNode2Component).setData(this.lightTokenIds)
                    
                    this.parent.addChild(mLandTipsNode2)
    
                })

                // let tokenId = this.lightTokenIds[0] //首个显示0
                // MapController.getDataAndShowLandTips(tokenId,false, (tokenId,landUrl, cityInfoMap)=>{

                //     this.tokenIdMapLandUrl[tokenId] = landUrl
                //     this.tokenIdMapCityInfo[tokenId] = cityInfoMap
                // })

            }      
        })
       
    }

    /**
     * name
     */
    public addTokenId(tokenId:number) {
        this.lightTokenIds.push(tokenId)
    }

}