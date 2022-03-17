
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, sys, System, UITransform, RichText, SpriteFrame, Texture2D } from 'cc';
import { MainGame } from '../../MainGame';
import { MapController } from '../../Map/MapController';
import { CUtil } from '../../Utils/CUtil';
import { UIController } from '../UIController';
const { ccclass, property } = _decorator;

@ccclass('LisaCityInfoTipsComponent')
export class LisaCityInfoTipsComponent extends Component{

    private cityHomeScrollViewContent: Node = null
    private closeButton: Node = null
    private homeCityBg: Node = null

    private infoData: Map<string, string>  = null
    
    private cityLevel = 0
    
    start () {

        this.homeCityBg = find("homeCityBg", this.node)

        this.cityHomeScrollViewContent = find("cityHomeScrollView/view/content", this.node);
       
        this.closeButton = find("btn_close", this.node);

        // this.planetText.getComponent(RichText).string = "<color=#00ff00>Planet:</color><color=#0fffff>Tain</color>"
       
        this.closeButton.on(Button.EventType.CLICK, () => {
            this.node.removeFromParent()
            this.node.destroy()
           
        })
        if (!this.infoData) {
            return
        }
        resources.load("Prefab/itemRichText", Prefab, (err, data) => {
            if (err) {
                console.log(err);
                return
            }

            for (let [key, value] of this.infoData) {
                let itemNode = instantiate(data);
                let xxxText = find("xxRichText",itemNode)
                xxxText.getComponent(RichText).string = this.getRichString(key+": ", value)
                this.cityHomeScrollViewContent.addChild(itemNode)
            }

        })

        if (this.cityLevel == 2) {
            //加载图片的方式，需要这样写
            resources.load("Texture/CityLevel_2_bg/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                
                if (err) {
                    console.log(err);
                    return
                }

                // if (nTexture2D) {
                //     const spriteFrame = new SpriteFrame();
                //     spriteFrame.texture = nTexture2D;
                //     this.homeCityBg.getComponent(Sprite).spriteFrame = spriteFrame
                // }

                this.homeCityBg.getComponent(Sprite).spriteFrame = spriteFrame
            })
     
        }
    }

    public updateData(url:string, planet:string,cityName:string,totalLand:string,cityGrade:string, 
        cityLevel:number,tokenId:string,landLevel:string,townName:string, landNo:string, landPosx:string,
        landPosy:string) {
        console.log("updateData")

// Land Name：Lisa‘s Home
// Token ID ：
// LAND LEVEL：
// TOWN ：
// LAND NO ：
// LAND POSX：
// LAND POSY：

        this.cityLevel = cityLevel
        this.infoData = new Map([

            [CUtil.getLocalString("Land_Name"), "Lisa‘s Home"],
            ["Planet",planet],
            ["City", cityName],
            ["TotalLand", totalLand],
            ["City Grade", cityGrade],

            ["Token_ID", tokenId],
            ["LAND_LEVEL", landLevel],
            ["TOWN", townName],
            ["LAND NO",landNo + ""],
            ["LAND POSX", landPosx + ""],
            ["LAND POSY", landPosy + ""]
           
        ])
        // this.planetText.getComponent(RichText).string = this.getRichString("Planet:",planet)
        // this.cityText.getComponent(RichText).string = this.getRichString("City:",city)
        // this.totalLandText.getComponent(RichText).string = this.getRichString("TotalLand:",totalLand)
        // this.cityGradeText.getComponent(RichText).string = this.getRichString("City Grade:",cityGrade)
    
    }

    getRichString(title:string, value:string){

        return "<color=#00f1e8>" + title + "</color><color=#f0b432>" + value + "</color>"
    }
}
