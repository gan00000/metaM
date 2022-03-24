
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, sys, System, UITransform, RichText, SpriteFrame, Texture2D, Color } from 'cc';
import { MainGame } from '../../MainGame';
import { MapController } from '../../Map/MapController';
import { LandInfoTipsComponent } from './LandInfoTipsComponent';
const { ccclass, property } = _decorator;

@ccclass('LandTipsNode2Component')
export class LandTipsNode2Component extends Component{

    private previous:Node = null
    private next:Node = null
    private closeBtn:Node = null

    private lightTokenIds:number[] = null
    private landShowInfoNode:Node = null

    private index = 0
    public callback:Function = null

    start () {
        
        this.previous = find("previous",this.node) 
        this.next = find("next",this.node) 
        this.closeBtn = find("btn_close",this.node)
        find("nfts_bg/closeButton",this.node).active = false
        this.landShowInfoNode = find("nfts_bg",this.node)
        
        this.closeBtn.on(Button.EventType.CLICK, () => {

            MapController.mapCanMove = true
            MapController.mapCanScale = true
            if (this.callback) {
                this.callback(1)
            }
            this.node.removeFromParent()
            this.node.destroy()
            
        }) 
        
        this.previous.on(Button.EventType.CLICK, () => {
            
            if (this.index < 0) {
                return
            }
            this.index = this.index-1
            this.showData(this.lightTokenIds[this.index])
            this.checkBtnStatue()
        })

        this.next.on(Button.EventType.CLICK, () => {

            if (this.index > this.lightTokenIds.length-1) {
                return
            }
            this.index = this.index+1
            this.showData(this.lightTokenIds[this.index])
            this.checkBtnStatue()
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

        this.checkBtnStatue()
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

            this.landShowInfoNode.getComponent(LandInfoTipsComponent).updateDatas(tokenId+"", landUrl,cityInfoMap)
        })
    }
    

    checkBtnStatue()
    {
        if (this.index==0) {
            this.previous.getComponent(Sprite).color = Color.GRAY
            this.previous.getComponent(Button).interactable = false
        }else{
            this.previous.getComponent(Sprite).color = Color.WHITE
            this.previous.getComponent(Button).interactable = true
        }

        if (this.index>=this.lightTokenIds.length-1) {
            this.next.getComponent(Sprite).color = Color.GRAY
            this.next.getComponent(Button).interactable = false
        }else{
            this.next.getComponent(Sprite).color = Color.WHITE
            this.next.getComponent(Button).interactable = true
        }
    }
}