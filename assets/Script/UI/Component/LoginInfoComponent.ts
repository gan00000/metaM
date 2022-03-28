import { _decorator, Node, find, Label, resources, Prefab, instantiate, Button, sys, UITransform, Component, Widget } from 'cc';
import { MainGame } from '../../MainGame';
import { MapController } from '../../Map/MapController';
import { CUtil } from '../../Utils/CUtil';
import { BaseComponent } from './BaseComponent';
const { ccclass, property } = _decorator;

@ccclass('LoginInfoComponent')
export class LoginInfoComponent extends BaseComponent {
    

    private  tokenIdScrollView: Node = null;
    private  tokenIdScrollViewContentNode: Node = null;
    private  loginTokenInfoNode: Node = null
    private  tipsLabelNode: Node = null
    private  loadingLabelNode: Node = null

    private  mParent: Node = null
    private  buylandBtn: Node = null
    private  ntfStartBtn: Node = null
    private  loginButton: Node = null
    private  logoutButton: Node = null
    private  tokenIds:number[] = []

    private sleep = async (ms) => {
        return new Promise((resolve, reject)=>{
            setTimeout(resolve,ms)
        })
    }
    
    private orginWidget:Widget = null

    start(){
        this.orginWidget = this.node.getComponent(Widget)
        super.start()

        if (this.scaleVec3 && this.orginWidget) {
            
            this.orginWidget.top = this.orginWidget.top * this.scaleVec3.y
            this.orginWidget.right = this.orginWidget.right * this.scaleVec3.x
        }

        this.initNode()
    }

    private initNode() {

        this.mParent = MainGame.find("UIParent")
        this.loginTokenInfoNode =this.node

        this.buylandBtn = find("buyland", this.loginTokenInfoNode);
        this.ntfStartBtn = find("nft_start", this.loginTokenInfoNode);
        this.loginButton = find("loginButton", this.loginTokenInfoNode);
        this.logoutButton = find("logoutButton", this.loginTokenInfoNode);
        this.tokenIdScrollView = find("tokenScrollView", this.loginTokenInfoNode);
        //this.titleLabe = titleLabelNode.getComponent(Label);

        this.tokenIdScrollViewContentNode = find("view/content", this.tokenIdScrollView);
        this.loadingLabelNode = find("loadingLabel", this.tokenIdScrollView);
        this.loadingLabelNode.active = false
        this.tipsLabelNode = find("noDataTips", this.tokenIdScrollView);
        this.tipsLabelNode.active = false

        this.tipsLabelNode.on(Button.EventType.CLICK, () => {
            sys.openURL("https://metacitym.com/")//https://metacitym.com/
        }, this);

        var aaa = 0;
        this.buylandBtn.on(Button.EventType.CLICK, () => {

            aaa = aaa + 1;
            sys.openURL("https://metacitym.com/")
        }, this);


        this.ntfStartBtn.on(Button.EventType.CLICK, () => {

            if (!MainGame.isLogin()) {
                // alert("请先登录")
                location.href = "https://metacitym.com/login/index.html?redirect=https://metacitym.com/map/"
                return
            }

            if (this.tokenIdScrollView.active) {
                this.tokenIdScrollView.active = false
            } else {
                this.tokenIdScrollView.active = true
            }

        }, this)

        this.loginButton.on(Button.EventType.CLICK, () => {
            console.log("login click")
            // sys.openURL("https://metacitym.com/login/index.html?redirect=https://www.baidu.com/");
            location.href = "https://metacitym.com/login/index.html?redirect=https://metacitym.com/map/"
        }, this)

        this.logoutButton.on(Button.EventType.CLICK, () => {
            console.log("logout click")
            location.href = "https://metacitym.com/map/"
        }, this)

        this.initRequestData()
    }

    private  initRequestData()
    {
        
        if (MainGame.isLogin()) {
            this.tokenIdScrollView.active = true
            this.loginButton.active = false
            this.logoutButton.active = true
            this.startRequestData()
           
        }else{
            this.tokenIdScrollView.active = false
            this.loginButton.active = true
            this.logoutButton.active = false
        }
    }

    private  async startRequestData(){

        this.loadingLabelNode.active = true
        await this.sleep(1000)
        this.requestTokenIds(MainGame.address,null, 1)
    }

    private  createTokenIdView()
    {   
        console.log("createTokenIdView")
        if (this.tokenIds.length > 0) {

            this.tipsLabelNode.active = false
            
            resources.load("Prefab/TokenIdItem", Prefab, (err, data) => {
                if (err) {
                    console.log(err);
                }
                
                this.tokenIdScrollViewContentNode.removeAllChildren()
                let itemprefabtemp: Node = instantiate(data);
                let uitfansform = itemprefabtemp.getComponent(UITransform)
                
                let itemHeight = uitfansform.height
                let allHeight = (itemHeight  + 40) * (this.tokenIds.length / 2 + 2)

                this.tokenIdScrollViewContentNode.getComponent(UITransform).height = allHeight
                
                this.refreshTokenUi(data);
            })

            this.showLightOnMap()
            
        }else{
            this.tipsLabelNode.active = true
        }
    }

    private refreshTokenUi(data: Prefab) {
        for (let index = 0; index < this.tokenIds.length; index++) {
            const tokenId = this.tokenIds[index];

            let itemprefab: Node = instantiate(data);
            
            itemprefab.getChildByName("tokenIdLabel").getComponent(Label).string = tokenId + "";
            //设置点击事件传递的内容
            itemprefab.getComponent(Button).clickEvents[0].customEventData = tokenId + "";
            this.tokenIdScrollViewContentNode.addChild(itemprefab);
           
        }
    }  
    private lightIndex = 0
    private showLightOnMap() {
        this.lightIndex = 0
        this.showLightOnMapLoop()
    }
    private showLightOnMapLoop() {
        if (this.tokenIds.length > 0) {
            
            const tokenId = this.tokenIds[this.lightIndex];
               //在地图上显示发光点
            MapController.getDataAndShowLandTips(tokenId, true, ()=>{
                if (this.lightIndex < this.tokenIds.length-1) {
                    this.lightIndex = this.lightIndex + 1
                    this.showLightOnMapLoop()
                }
               
            });
        }

    }

    private requestTokenIds(address:string,pageKey:string, times:number) {
        
        if (times != 1 && !pageKey) {
            return
        }
        var reqUrl = ""
        if (times != 1 && pageKey) {
            reqUrl = "https://act.gamamobi.com/pre/nft/getTokenIds.web?owner=" + address  + "&pageKey=" + pageKey + "&contractAddress=0x82016d4ad050ef4784e282b82a746d3e01df23bf,0xa39853A45D0420D8dB0F660EA39dA1E89608fCfa&_=" + Date.parse(new Date().toString()) 
        }else{
            reqUrl = "https://act.gamamobi.com/pre/nft/getTokenIds.web?owner=" + address  + "&contractAddress=0x82016d4ad050ef4784e282b82a746d3e01df23bf,0xa39853A45D0420D8dB0F660EA39dA1E89608fCfa&_=" + Date.parse(new Date().toString()) 

        }
        // let testUrl = "https://act.gamamobi.com/pre/nft/getTokenIds.web?owner=0x2f2e99bcbe39D8407552E821e7F4F0F9592Dfcab&contractAddress=0x82016d4ad050ef4784e282b82a746d3e01df23bf&_=" + Date.parse(new Date().toString())
        
        CUtil.httpPequest(reqUrl,(result)=>{
            
            if (result) {
                
                let resultJson = JSON.parse(result)
                let ownedNfts = resultJson.ownedNfts
                let pageKey = resultJson.pageKey
                let totalCount = resultJson.totalCount
                let blockHash = resultJson.blockHash
                
                if (ownedNfts) {
                    for (let index = 0; index < ownedNfts.length; index++) {
                        const element = ownedNfts[index];
                        let hextokenId = element.id.tokenId
                        let tokenId_num = CUtil.hex2Number(hextokenId)
                        if (tokenId_num && hextokenId) {
                            this.tokenIds.push(tokenId_num)
                            // this.tokenIds.join
                        }
                    }
                }

                if (pageKey) {
                    this.requestTokenIds(address, pageKey, 2)
                }else{
                    console.log("全部请求完成")
                    this.loadingLabelNode.active = false
                    this.createTokenIdView()
                }
            
                console.log("解析完成 key=" + pageKey)
            }else{
                console.log("request error:"+ times)
                this.loadingLabelNode.active = false
                this.tipsLabelNode.active = true
            }
            
        })
        
        // let testUrl22 = "https://act.gamamobi.com/pre/nft/getTokenIds.web"
        // CUtil.httpPostPequest(testUrl22,(result)=>{


        // })

    }

}