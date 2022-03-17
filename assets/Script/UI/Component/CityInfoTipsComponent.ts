
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, sys, System, UITransform, RichText, SpriteFrame, Texture2D } from 'cc';
import { MainGame } from '../../MainGame';
import { MapController } from '../../Map/MapController';
import { CUtil } from '../../Utils/CUtil';
import { UIController } from '../UIController';
const { ccclass, property } = _decorator;

@ccclass('CityInfoTipsComponent')
export class CityInfoTipsComponent extends Component{

    public landBg: Node = null;
    public planetText: Node = null;
    public cityText: Node = null;
    public totalLandText: Node = null;
    public cityGradeText: Node = null;
    public closeButton: Node = null;
    public cityBgNode: Node = null;
    public cityLevel2BgNode: Node = null;

    private mParent: Node = null

    private url:string = null
    private planet:string = null
    private cityName:string = null
    private totalLand:string = null
    private cityGrade:string = null
    private cityLevel:number = 0
    
    start () {

        this.mParent = this.node//MainGame.find("UIParent")
        this.landBg = find("land_bg", this.mParent)

        this.planetText = find("city_info/PlanetRichText", this.mParent);
        this.cityText = find("city_info/CityRichText", this.mParent);
        this.totalLandText = find("city_info/TotalLandRichText", this.mParent);
        // this.totalLandText = find("city_info/TotalLandRichText", this.mParent);
        this.cityGradeText = find("city_info/CityGradeRichText", this.mParent);
        this.closeButton = find("btn_close", this.mParent);
        this.cityBgNode = find("land_bg/cityBg", this.mParent);
        this.cityLevel2BgNode = find("land_bg/cityLevel2Bg", this.mParent);

        // this.planetText.getComponent(RichText).string = "<color=#00ff00>Planet:</color><color=#0fffff>Tain</color>"
       
        this.closeButton.on(Button.EventType.CLICK, () => {
            this.mParent.removeFromParent()
            this.mParent.destroy()
            MapController.mCityInfo = null
        })
        console.log("CityInfoTipsComponent start")

        this.planetText.getComponent(RichText).string = this.getRichString("Planet: ", this.planet)
        this.cityText.getComponent(RichText).string = this.getRichString("City: ",this.cityName)
        this.totalLandText.getComponent(RichText).string = this.getRichString("TotalLand: ",this.totalLand)
        this.cityGradeText.getComponent(RichText).string = this.getRichString("City Grade: ",this.cityGrade)
        
        if (this.cityLevel == 2) {
            
            // resources.load("Common/CityLevel_2.png", Texture2D, (err, nTexture2D) => {
                
            //     if (nTexture2D) {
            //         const spriteFrame = new SpriteFrame();
            //         spriteFrame.texture = nTexture2D;
            //         this.cityBgNode.getComponent(Sprite).spriteFrame = spriteFrame
            //     }
            // })

            this.cityBgNode.active = false
            this.cityLevel2BgNode.active = true
        }else{
            this.cityBgNode.active = true
            this.cityLevel2BgNode.active = false
        }
    }

    public updateData(url:string, planet:string,cityName:string,totalLand:string,cityGrade:string, cityLevel:number) {
        console.log("updateData")
        // this.planetText.getComponent(RichText).string = this.getRichString("Planet:",planet)
        // this.cityText.getComponent(RichText).string = this.getRichString("City:",city)
        // this.totalLandText.getComponent(RichText).string = this.getRichString("TotalLand:",totalLand)
        // this.cityGradeText.getComponent(RichText).string = this.getRichString("City Grade:",cityGrade)
    
        this.url = url
        this.planet = planet
        this.cityName = cityName
        this.totalLand = totalLand
        this.cityGrade = cityGrade
        this.cityLevel = cityLevel
    }

    getRichString(title:string, value:string){

        return "<color=#00f1e8>" + title + "</color><color=#f0b432>" + value + "</color>"
    }
}