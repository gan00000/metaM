
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, loader, SpriteFrame, assetManager, Asset, ImageAsset, Texture2D } from 'cc';
import { UIController } from '../UIController';
const { ccclass, property } = _decorator;

@ccclass('NtfsController')
export class NtfsController {

    public titleLabe: Label = null;

    public proScrollView_contentNode: Node = null;
    public proScrollView: Node = null;

    private ntfsNode: Node = null
    private imgSprite: Sprite = null

    private closeNode: Node = null
    private bgNode: Node = null

    public getNftsNode(): Node {

        return this.ntfsNode
    }

    public init(calllback:Function) {
        // [3]

        // UIController.create("nfts_bg", false, (node) => {

        //     this.ntfsNode = node;
            // })
        resources.load("Prefab/nfts_bg",Prefab,(err,data)=>{
            if (err) {
                console.log(err);
            }
            this.ntfsNode = instantiate(data);
            //this.mapInput.addChild(ntfs_prefab);

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

                //UIController.recycle(this.ntfsNode);
                this.ntfsNode.removeFromParent()
                this.ntfsNode.destroy()

            }, this)

            calllback(this.ntfsNode)
        })

    }


    /**
     * addToParent
     */
    public addToParent(parent: Node) {

    }


    /**
     * updateDatastokenId:S
     */
    public updateDatas(tokenId: string, imageUrl: string, landDatas: Map<string, string>) {

        this.titleLabe.string = tokenId
        let comtroller = this;
        assetManager.loadRemote<ImageAsset>(imageUrl, function (err, imageAsset) {
            if (err) {
                console.log(err)
                return
            }

            const spriteFrame = new SpriteFrame();
            const texture = new Texture2D();
            texture.image = imageAsset;
            spriteFrame.texture = texture;
            comtroller.imgSprite.spriteFrame = spriteFrame

        });

        // 使用对象解析
        for (let [key, value] of landDatas) {
            console.log(key, value);

            resources.load("Prefab/proItemNodePrefab", Prefab, (err, data) => {
                if (err) {
                    console.log(err);
                }
                let itemInfoNode: Node = instantiate(data);
                let xTitleLabel = find("itemNameLabel", itemInfoNode).getComponent(Label)
                let xValueLabel = find("itemValueLabel", itemInfoNode).getComponent(Label)
                xTitleLabel.string = key
                xValueLabel.string = value
                this.proScrollView_contentNode.addChild(itemInfoNode);

            })
        }

    }

}