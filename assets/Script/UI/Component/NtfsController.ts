
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, loader, SpriteFrame, assetManager, Asset, ImageAsset, Texture2D } from 'cc';
import { UIController } from '../UIController';
const { ccclass, property } = _decorator;

@ccclass('NtfsController')
export class NtfsController{

    public static titleLabe:Label = null;

    public static proScrollView_contentNode:Node = null;
    public static proScrollView:Node = null;

    private static ntfsNode: Node = null
    private static imgSprite: Sprite = null

    private static closeNode: Node = null

    public static getNftsNode():Node {

        return this.ntfsNode
    }

    public static init () {
        // [3]

        UIController.create("nfts_bg",false, (node)=>{

            this.ntfsNode = node;
        // })
        // resources.load("Prefab/nfts_bg",Prefab,(err,data)=>{
        //     if (err) {
        //         console.log(err);
        //     }
        //     this.ntfsNode = instantiate(data);
        //     //this.mapInput.addChild(ntfs_prefab);

        let testBtn = find("TestButton", this.ntfsNode);

        let titleLabelNode = find("titleLabel",this.ntfsNode);
        this.titleLabe = titleLabelNode.getComponent(Label);
        this.closeNode = find("closeButton",this.ntfsNode); 
        this.imgSprite = find("nfts_img_Sprite",this.ntfsNode).getComponent(Sprite); 
        
        this.proScrollView = find("proScrollView",this.ntfsNode);
        this.proScrollView_contentNode = find("view/content", this.proScrollView);

       testBtn.on(Button.EventType.CLICK, ()=>{
     
        resources.load("Prefab/proItemNodePrefab",Prefab,(err,data)=>{
            if (err) {
                console.log(err);
            }
            let prefab:Node = instantiate(data);
            this.proScrollView_contentNode.addChild(prefab);
        })

       },this);
       
        
       this.closeNode.on(Button.EventType.CLICK, ()=>{

        //UIController.recycle(this.ntfsNode);
        this.ntfsNode.removeFromParent()

       },this)
        })

    }


    /**
     * addToParent
     */
    public addToParent(parent:Node) {
        
    }


    /**
     * updateDatastokenId:S
     */
    public static updateDatas(tokenId:string, imageUrl:string, landDatas:Map<string,string>) {
        
        this.titleLabe.string = tokenId

         assetManager.loadRemote<ImageAsset>(imageUrl, function (err, imageAsset) 
        {
            if (err) {
                console.log(err)
                return
            }

            const spriteFrame = new SpriteFrame();
            const texture = new Texture2D();
            texture.image = imageAsset;
            spriteFrame.texture = texture;
            NtfsController.imgSprite.spriteFrame = spriteFrame
            
        });

        // 使用对象解析
        for (let [key, value] of landDatas) {
            console.log(key, value);

            resources.load("Prefab/proItemNodePrefab",Prefab,(err,data)=>{
                if (err) {
                    console.log(err);
                }
                let itemInfoNode:Node = instantiate(data);
                let xTitleLabel = find("itemNameLabel",itemInfoNode).getComponent(Label)
                let xValueLabel = find("itemValueLabel",itemInfoNode).getComponent(Label)
                xTitleLabel.string = key
                xValueLabel.string = value
                this.proScrollView_contentNode.addChild(itemInfoNode);
                
            })
        }

    }

}