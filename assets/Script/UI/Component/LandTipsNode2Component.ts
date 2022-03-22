
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, sys, System, UITransform, RichText, SpriteFrame, Texture2D } from 'cc';
import { MainGame } from '../../MainGame';
import { MapController } from '../../Map/MapController';
import { CUtil } from '../../Utils/CUtil';
import { UIController } from '../UIController';
import { NtfsController } from './NtfsController';
const { ccclass, property } = _decorator;

@ccclass('LandTipsNode2Component')
export class LandTipsNode2Component extends Component{

    private previous:Node = null
    private next:Node = null
    private closeBtn:Node = null

    private lightTokenIds:number[] = null
    private landShowInfoNode:Node = null

    private index = 0

    start () {
        
        this.previous = find("previous",this.node) 
        this.next = find("next",this.node) 
        this.closeBtn = find("btn_close",this.node)
        find("nfts_bg/closeButton",this.node).active = false
        this.landShowInfoNode = find("nfts_bg",this.node)
        
        this.closeBtn.on(Button.EventType.CLICK, () => {

            MapController.mapCanMove = true
            MapController.mapCanScale = true

            this.node.removeFromParent()
            this.node.destroy()
        }) 
        
        this.previous.on(Button.EventType.CLICK, () => {
            
            if (this.index < 0) {
                return
            }
            this.index = this.index-1
            this.showData(this.lightTokenIds[this.index])
        })

        this.next.on(Button.EventType.CLICK, () => {

            if (this.index > this.lightTokenIds.length-1) {
                return
            }
            this.index = this.index+1
            this.showData(this.lightTokenIds[this.index])
           
        })

        MapController.mapCanMove = false
        MapController.mapCanScale = false
        if (this.lightTokenIds.length>0) {
            
            let tokenId = this.lightTokenIds[0] //首个显示0
            MapController.getDataAndShowLandTips(tokenId,false, (tokenId,landUrl, cityInfoMap)=>{
    
                // this.tokenIdMapLandUrl[tokenId] = landUrl
                // this.tokenIdMapCityInfo[tokenId] = cityInfoMap
                this.showData(tokenId)
    
            })
        }
    }

    /**
     * name
     */
    public setData(tokenIds:number[]) {
        this.lightTokenIds = tokenIds                        
    }

    showData(tokenId:number)
    {
        MapController.getDataAndShowLandTips(tokenId,false, (tokenId,landUrl, cityInfoMap)=>{

            this.landShowInfoNode.getComponent(NtfsController).updateDatas(tokenId+"", landUrl,cityInfoMap)
        })
    }

}