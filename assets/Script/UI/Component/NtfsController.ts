
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, loader, SpriteFrame, assetManager, Asset, ImageAsset, Texture2D, UITransform } from 'cc';
import { MapController } from '../../Map/MapController';
import { CUtil } from '../../Utils/CUtil';
import { UIController } from '../UIController';
const { ccclass, property } = _decorator;

@ccclass('NtfsController')
export class NtfsController extends Component {

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

    start () {

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
                this.node.removeFromParent()
                this.node.destroy()
                MapController.mNtfsControllerNode = null
            }
            
        }, this)

        this.updateDatas(this.tokenId, this.imageUrl, this.landDatas)
    }

    // public init(calllback:Function) {
    //     // [3]

    //     // UIController.create("nfts_bg", false, (node) => {

    //     //     this.ntfsNode = node;
    //         // })
    //     resources.load("Prefab/nfts_bg",Prefab,(err,data)=>{
    //         if (err) {
    //             console.log(err);
    //         }
    //         this.ntfsNode = instantiate(data);
    //         //this.mapInput.addChild(ntfs_prefab);

            

    //         calllback(this.ntfsNode)
    //     })

    // }

    /**
     * updateDatastokenId:S
     */
    public updateDatas(tokenId: string, imageUrl: string, landDatas: Map<string, string>) {

        // if (imageUrl.startsWith("https://")) {
        //     imageUrl = imageUrl.replace("https://","http://")
        // }

        // if (imageUrl.endsWith(".jpg")) {
        //     imageUrl = imageUrl.replace(".jpg",".png")
        // }
        // imageUrl = imageUrl.replace("https://static-download2.metacitym.com/","https://static-src.metacitym.com/")
        // imageUrl = imageUrl + "?" + Date.parse(new Date().toString()) 
        // console.log("imageUrl=",imageUrl)
        this.tokenId = tokenId
        this.imageUrl = imageUrl
        this.landDatas = landDatas

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
        for (let [key, value] of landDatas) {
            // console.log(key, value);

            resources.load("Prefab/proItemNodePrefab", Prefab, (err, data) => {
                if (err) {
                    console.log(err);
                    return
                }
                let itemInfoNode: Node = instantiate(data);
                // if (itemH == 0) {
                //     itemH = itemInfoNode.getComponent(UITransform).height
                //     this.proScrollView_contentNode.getComponent(UITransform).height = itemH * (landDatas.size / 3 + 1) + landDatas.size / 3 * 10
                // }
                let xTitleLabel = find("itemNameLabel", itemInfoNode).getComponent(Label)
                let xValueLabel = find("itemValueLabel", itemInfoNode).getComponent(Label)
                xTitleLabel.string = key
                xValueLabel.string = value
                this.proScrollView_contentNode.addChild(itemInfoNode);

            })
        }

    }

}