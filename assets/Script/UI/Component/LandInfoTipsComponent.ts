
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, loader, SpriteFrame, assetManager, Asset, ImageAsset, Texture2D, UITransform, RichText } from 'cc';
import { MapController } from '../../Map/MapController';
import { CUtil } from '../../Utils/CUtil';
import { UIController } from '../UIController';
import { BaseComponent } from './BaseComponent';
const { ccclass, property } = _decorator;

@ccclass('LandInfoTipsComponent')
export class LandInfoTipsComponent extends BaseComponent {

    public titleLabe: Label = null;

    public proScrollView_contentNode: Node = null;
    public proScrollView: Node = null;

    private ntfsNode: Node = null
    private imgSprite: Sprite = null

    private closeNode: Node = null
    private bgNode: Node = null

    private tokenId: string = null
    private imageUrl: string = null
    private landDatas: Map<string, string>  = null

    private land_name:string = null

    private LAND_NAME_LABEL:RichText = null

    public reset()
    {
        
    }

    start () {
        if (!(this.node.getParent().name == "LandTipsNode2")) {
            
            super.start()
        }
        this.ntfsNode = this.node
        let testBtn = find("TestButton", this.ntfsNode);
        this.bgNode = find("bgNode", this.ntfsNode);
        this.bgNode.on(Node.EventType.TOUCH_MOVE, () => {
        })

        let titleLabelNode = find("titleLabel", this.ntfsNode);
        this.titleLabe = titleLabelNode.getComponent(Label);
        this.closeNode = find("closeButton", this.ntfsNode);
        this.imgSprite = find("nfts_img_Sprite", this.ntfsNode).getComponent(Sprite);

        this.proScrollView = find("proScrollView", this.ntfsNode);
        this.proScrollView_contentNode = find("view/content", this.proScrollView);

        //测试用
        testBtn.on(Button.EventType.CLICK, () => {

            resources.load("Prefab/proItemNodePrefab", Prefab, (err, data) => {
                if (err) {
                    console.log(err);
                }
                let prefab: Node = instantiate(data);
                this.proScrollView_contentNode.addChild(prefab);
            })

        }, this);
        //=====

        this.closeNode.on(Button.EventType.CLICK, () => {

            if (this.node) {
                MapController.resetCityInfoState()
            }
            
        }, this)

        if (!this.land_name && this.landDatas) {
           
            // https://metacitym.gamamobi.com/mcm/api/land?token=3
            CUtil.httpPequest("https://metacitym.gamamobi.com/mcm/api/land?token=" + this.tokenId,(result)=>{
    
                if (result) {
                    let resultJson = JSON.parse(result)
                    if (resultJson) {
                       
                        let attributes =  resultJson.attributes
                        if (attributes) {
                            
                            for (let index = 0; index < attributes.length; index++) {
                                const element = attributes[index];
                                if (element.trait_type=="land_name") {
                                    this.land_name = element.value
                                    break
                                }
                                
                            }
                        }
                    }
                }
                this.updateDatas(this.tokenId, this.imageUrl, this.landDatas)
            })
        }else{

            this.updateDatas(this.tokenId, this.imageUrl, this.landDatas)
        }
 
    }


    /**
     * updateDatastokenId:S
     */
    public updateDatas(tokenId: string, imageUrl: string, landDatas: Map<string, string>) {

        this.tokenId = tokenId
        this.imageUrl = imageUrl
        this.landDatas = landDatas

        if (this.land_name) {
            
            this.landDatas.set("LAND NAME", this.land_name)
        }

        if (!this.ntfsNode) {
            return
        }

        this.titleLabe.string = "TokenID:"+tokenId
        let comtroller = this;
        console.log("loadRemote imageUrl=",imageUrl)
        assetManager.loadRemote<ImageAsset>(imageUrl, {xhrWithCredentials:true}, function (err, imageAsset) {
            if (err) {
                console.log(err)
                return
            }
            if (imageAsset) {
                
                const spriteFrame = new SpriteFrame();
                const texture = new Texture2D();
                texture.image = imageAsset;
                spriteFrame.texture = texture;
                if (spriteFrame && comtroller && comtroller.imgSprite && comtroller.imgSprite.spriteFrame) {
                    comtroller.imgSprite.spriteFrame = spriteFrame
                }
                
            }

        });

        // let itemH = 0
        // 使用对象解析
        this.proScrollView_contentNode.removeAllChildren()//删除原来的
        resources.load("Prefab/proItemNodePrefab", Prefab, (err, data) => {
            if (err) {
                console.log(err);
                return
            }
            this.proScrollView_contentNode.removeAllChildren()//删除原来的

            for (let [key, value] of landDatas) {
                // console.log(key, value);
    
                let itemInfoNode: Node = instantiate(data);
                // if (itemH == 0) {
                //     itemH = itemInfoNode.getComponent(UITransform).height
                //     this.proScrollView_contentNode.getComponent(UITransform).height = itemH * (landDatas.size / 3 + 1) + landDatas.size / 3 * 10
                // }
                let xTitleLabel = find("itemNameLabel", itemInfoNode).getComponent(RichText)
                let xValueLabel = find("itemValueLabel", itemInfoNode).getComponent(RichText)
                
                xTitleLabel.string = this.setTitleText(key)
                xValueLabel.string = this.setValueText(value)
                this.proScrollView_contentNode.addChild(itemInfoNode);

                if (key=="LAND NAME") {
                    this.LAND_NAME_LABEL = xValueLabel
                }
    
            }

        })

    }

    setTitleText(mstr:string)
    {
        return "<color=#00FFDE>" + mstr +  "</color>"
    }

    setValueText(mstr:string)
    {
        return "<color=#ffffff>" + mstr +  "</color>"
    }
}