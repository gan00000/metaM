
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, sys, System, UITransform } from 'cc';
import { MainGame } from '../../MainGame';
import { CUtil } from '../../Utils/CUtil';
import { UIController } from '../UIController';
const { ccclass, property } = _decorator;

@ccclass('LoginTokenController')
export class LoginTokenController {

    public static tokenIdScrollView: Node = null;
    public static tokenIdScrollViewContentNode: Node = null;
    private static loginTokenInfoNode: Node = null
    private static tipsLabelNode: Node = null

    private static mParent: Node = null
    private static buylandBtn: Node = null
    private static ntfStartBtn: Node = null
    private static pursrBtn: Node = null
    private static tokenIds:number[] = []

    public static getNftsNode(): Node {

        return this.loginTokenInfoNode
    }

    public static init() {

        this.mParent = MainGame.find("UIParent")
        this.loginTokenInfoNode = find("loginTokenInfo", this.mParent)

        this.buylandBtn = find("buyland", this.loginTokenInfoNode);
        this.ntfStartBtn = find("nft_start", this.loginTokenInfoNode);
        this.pursrBtn = find("btn_purse_h", this.loginTokenInfoNode);
        this.tokenIdScrollView = find("tokenScrollView", this.loginTokenInfoNode);
        //this.titleLabe = titleLabelNode.getComponent(Label);

        this.tokenIdScrollViewContentNode = find("view/content", this.tokenIdScrollView);
        this.tipsLabelNode = find("tipsLabel", this.tokenIdScrollView);
        this.tipsLabelNode.active = false

        var aaa = 0;
        this.buylandBtn.on(Button.EventType.CLICK, () => {

            aaa = aaa + 1;

        }, this);


        this.ntfStartBtn.on(Button.EventType.CLICK, () => {

            if (!MainGame.isLogin()) {
                alert("请先登录")
                return
            }

            if (this.tokenIdScrollView.active) {
                this.tokenIdScrollView.active = false
            } else {
                this.tokenIdScrollView.active = true
            }

        }, this)

        this.pursrBtn.on(Button.EventType.CLICK, () => {
            console.log("pursebtn click")
            // sys.openURL("https://metacitym.com/login/index.html?redirect=https://www.baidu.com/");
            location.href = "https://metacitym.com/login/index.html?redirect=http://localhost:7456"
        }, this)


        if (MainGame.isLogin()) {
            this.tokenIdScrollView.active = true
            
            this.requestTokenIds(MainGame.address,null, 1)
        }else{
            this.tokenIdScrollView.active = false
        }
        // test
        // this.requestTokenIds("0x2f2e99bcbe39D8407552E821e7F4F0F9592Dfcab",null, 1)
    }


    /**
     * addToParent
     */
    public addToParent(parent: Node) {

    }

    private static createTokenIdView()
    {
        if (this.tokenIds.length > 0) {

            this.tipsLabelNode.active = false
            
            resources.load("Prefab/TokenIdLabel", Prefab, (err, data) => {
                if (err) {
                    console.log(err);
                }
                this.tokenIdScrollViewContentNode.removeAllChildren()
                let itemprefabtemp: Node = instantiate(data);
                let uitfansform = itemprefabtemp.getComponent(UITransform)
                
                let itemHeight = uitfansform.height
                let allHeight = itemHeight  * this.tokenIds.length + 10 * (this.tokenIds.length / 2 +1)

                this.tokenIdScrollViewContentNode.getComponent(UITransform).height = allHeight
                
                for (let index = 0; index < this.tokenIds.length; index++) {
                    const element = this.tokenIds[index];
                    
                    let itemprefab: Node = instantiate(data);
                    itemprefab.getComponent(Label).string = element + ""
                    this.tokenIdScrollViewContentNode.addChild(itemprefab);
                }
            })

            // for (let index = 0; index < this.tokenIds.length; index++) {
            //     const element = this.tokenIds[index];
                
            //     resources.load("Prefab/TokenIdLabel", Prefab, (err, data) => {
            //         if (err) {
            //             console.log(err);
            //         }
            //         let itemprefab: Node = instantiate(data);
            //         let uitfansform = itemprefab.getComponent(UITransform)

            //         itemprefab.getComponent(Label).string = element + ""
            //         this.tokenIdScrollViewContentNode.addChild(itemprefab);
            //     })
 
            // }
            
        }else{
            this.tipsLabelNode.active = true
        }
    }

    private static requestTokenIds(address:string,pageKey:string, times:number) {
        
        if (times != 1 && !pageKey) {
            return
        }
        var reqUrl = ""
        if (times != 1 && pageKey) {
            reqUrl = "https://act.gamamobi.com/pre/nft/getTokenIds.web?owner=" + address  + "&pageKey=" + pageKey + "&contractAddress=0x82016d4ad050ef4784e282b82a746d3e01df23bf&_=" + Date.parse(new Date().toString()) 
        }else{
            reqUrl = "https://act.gamamobi.com/pre/nft/getTokenIds.web?owner=" + address  + "&contractAddress=0x82016d4ad050ef4784e282b82a746d3e01df23bf&_=" + Date.parse(new Date().toString()) 

        }
        // let testUrl = "https://act.gamamobi.com/pre/nft/getTokenIds.web?owner=0x2f2e99bcbe39D8407552E821e7F4F0F9592Dfcab&contractAddress=0x82016d4ad050ef4784e282b82a746d3e01df23bf&_=" + Date.parse(new Date().toString())
       
        CUtil.httpPequest(reqUrl,(result)=>{
            if (result) {
                
                let resultJson = JSON.parse(result,)
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
                            LoginTokenController.tokenIds.push(tokenId_num)
                            // this.tokenIds.join
                        }
                    }
                }

                if (pageKey) {
                    this.requestTokenIds(address, pageKey, 2)
                }else{
                    console.log("全部请求完成")
                    this.createTokenIdView()
                }
            
                console.log("解析完成")
            }
            
        })
        
        // let testUrl22 = "https://act.gamamobi.com/pre/nft/getTokenIds.web"
        // CUtil.httpPostPequest(testUrl22,(result)=>{


        // })

    }

}