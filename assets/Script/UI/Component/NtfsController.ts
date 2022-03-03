
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button } from 'cc';
import { UIController } from '../UIController';
const { ccclass, property } = _decorator;

@ccclass('NtfsController')
export class NtfsController{

    public static titleLabe:Label = null;

    public static proScrollView_layout:Layout = null;
    public static proScrollView:Node = null;

    private static ntfsNode: Node = null

    private static closeNode: Node = null

    public static getNftsNode():Node {

        return this.ntfsNode
    }

    public static init () {
        // [3]

        UIController.create("nfts_bg",(node)=>{

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
        //this.titleLabe = titleLabelNode.getComponent(Label);
        
        this.proScrollView_layout = find("proScrollView",this.ntfsNode).getComponent(Layout);
        this.proScrollView = find("proScrollView",this.ntfsNode);
        this.closeNode = find("closeButton",this.ntfsNode); 

        if(!testBtn){

        console.log("testBtn is null");
 
            
       }

       if (!this.proScrollView_layout) {
        console.log("proScrollView_layout is null");
       }
       var aaa = 0;
       testBtn.on(Button.EventType.CLICK, ()=>{

        console.log("xxxxxxaaa");
        aaa = aaa+1;
       // this.titleLabe.string = "xxxxdd => " + aaa; 

        var contentNode = find("proScrollView/view/content", this.ntfsNode);
     
        resources.load("Prefab/proItemNodePrefab",Prefab,(err,data)=>{
            if (err) {
                console.log(err);
            }
            let prefab:Node = instantiate(data);
            contentNode.addChild(prefab);
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

}