
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, sys, System, UITransform, RichText } from 'cc';
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

    private mParent: Node = null

    private url:string = null
    private planet:string = null
    private city:string = null
    private totalLand:string = null
    private cityGrade:string = null
    
    start () {

        this.mParent = this.node//MainGame.find("UIParent")
        this.landBg = find("land_bg", this.mParent)

        this.planetText = find("city_info/PlanetRichText", this.mParent);
        this.cityText = find("city_info/CityRichText", this.mParent);
        this.totalLandText = find("city_info/TotalLandRichText", this.mParent);
        // this.totalLandText = find("city_info/TotalLandRichText", this.mParent);
        this.cityGradeText = find("city_info/CityGradeRichText", this.mParent);
        this.closeButton = find("btn_close", this.mParent);

        // this.planetText.getComponent(RichText).string = "<color=#00ff00>Planet:</color><color=#0fffff>Tain</color>"
       
        this.closeButton.on(Button.EventType.CLICK, () => {
            this.mParent.removeFromParent()
            this.mParent.destroy()
            MapController.mCityInfo = null
        })
        console.log("CityInfoTipsComponent start")

        this.planetText.getComponent(RichText).string = this.getRichString("Planet: ", this.planet)
        this.cityText.getComponent(RichText).string = this.getRichString("City: ",this.city)
        this.totalLandText.getComponent(RichText).string = this.getRichString("TotalLand: ",this.totalLand)
        this.cityGradeText.getComponent(RichText).string = this.getRichString("City Grade: ",this.cityGrade)
    
    }

    public updateData(url:string, planet:string,city:string,totalLand:string,cityGrade:string) {
        console.log("updateData")
        // this.planetText.getComponent(RichText).string = this.getRichString("Planet:",planet)
        // this.cityText.getComponent(RichText).string = this.getRichString("City:",city)
        // this.totalLandText.getComponent(RichText).string = this.getRichString("TotalLand:",totalLand)
        // this.cityGradeText.getComponent(RichText).string = this.getRichString("City Grade:",cityGrade)
    
        this.url = url
        this.planet = planet
        this.city = city
        this.totalLand = totalLand
        this.cityGrade = cityGrade
    }

    getRichString(title:string, value:string){

        return "<color=#00f1e8>" + title + "</color><color=#f0b432>" + value + "</color>"
    }
}