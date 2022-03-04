
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button } from 'cc';
import { MainGame } from '../../MainGame';
import { UIController } from '../UIController';
const { ccclass, property } = _decorator;

@ccclass('LoginTokenController')
export class LoginTokenController{

    public static tokenIdScrollView:Node = null;
    public static tokenIdScrollViewContentNode:Node = null;
    private static loginTokenInfoNode: Node = null

    private static mParent:Node = null
    private static buylandBtn:Node = null 
    private static ntfStartBtn:Node = null
    private static pursrBtn:Node = null
    p

    public static getNftsNode():Node {

        return this.loginTokenInfoNode
    }

    public static init () {
    
        this.mParent = MainGame.find("UIParent")
        this.loginTokenInfoNode = find("loginTokenInfo", this.mParent)

        this.buylandBtn = find("buyland", this.loginTokenInfoNode); 
        this.ntfStartBtn = find("nft_start", this.loginTokenInfoNode);
        this.pursrBtn = find("btn_purse_h", this.loginTokenInfoNode);
        this.tokenIdScrollView = find("tokenScrollView",this.loginTokenInfoNode);
        //this.titleLabe = titleLabelNode.getComponent(Label);

        this.tokenIdScrollViewContentNode = find("view/content", this.tokenIdScrollView);
     
       var aaa = 0;
       this.buylandBtn.on(Button.EventType.CLICK, ()=>{

        aaa = aaa+1;
      
        resources.load("Prefab/TokenIdLabel",Prefab,(err,data)=>{
            if (err) {
                console.log(err);
            }
            let prefab:Node = instantiate(data);
            this.tokenIdScrollViewContentNode.addChild(prefab);
        })

       },this);
       
        
       this.ntfStartBtn.on(Button.EventType.CLICK, ()=>{
            
    
       },this)

       this.pursrBtn.on(Button.EventType.CLICK, ()=>{

    
    },this)

    }


    /**
     * addToParent
     */
    public addToParent(parent:Node) {
        
    }

}