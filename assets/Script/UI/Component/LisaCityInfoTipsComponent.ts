
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, sys, System, UITransform, RichText, SpriteFrame, Texture2D, view, Vec3 } from 'cc';
import { MainGame } from '../../MainGame';
import { MapController } from '../../Map/MapController';
import { CUtil } from '../../Utils/CUtil';
import { UIController } from '../UIController';
import { BaseComponent } from './BaseComponent';
const { ccclass, property } = _decorator;

@ccclass('LisaCityInfoTipsComponent')
export class LisaCityInfoTipsComponent extends BaseComponent {

    private cityHomeScrollViewContent: Node = null
    private closeButton: Node = null
    private homeCityBg: Node = null

    private infoData: Map<string, string> = null

    private cityLevel = 0

    public callback: Function = null
    private isLisa: boolean = true
    private orginUITransform: UITransform = null


    start() {
        super.start()
        this.orginUITransform = this.node.getComponent(UITransform)
       
        this.homeCityBg = find("homeCityBg", this.node)

        this.cityHomeScrollViewContent = find("cityHomeScrollView/view/content", this.node);

        this.closeButton = find("btn_close", this.node);

        // this.planetText.getComponent(RichText).string = "<color=#00ff00>Planet:</color><color=#0fffff>Tain</color>"

        this.closeButton.on(Button.EventType.CLICK, () => {
            if (this.callback) {
                this.callback()
            }
            this.node.removeFromParent()
            this.node.destroy()

            MapController.resetCityInfoState();
        })

        if (this.isLisa) {

            let imageName = "Texture/LisaCityLevel_1/spriteFrame"
            if (this.cityLevel == 2) {
                //加载图片的方式，需要这样写
                imageName = "Texture/LisaCityLevel_2/spriteFrame"
            }
            resources.load(imageName, SpriteFrame, (err, spriteFrame) => {

                if (err) {
                    console.log(err);
                    return
                }
                if (this.homeCityBg) {

                    this.homeCityBg.getComponent(Sprite).spriteFrame = spriteFrame
                }
            })

        } else {

            let imageName = "Texture/CityLevel_1/spriteFrame"
            if (this.cityLevel == 2) {
                //加载图片的方式，需要这样写
                imageName = "Texture/CityLevel_2/spriteFrame"
            }
            resources.load(imageName, SpriteFrame, (err, spriteFrame) => {

                if (err) {
                    console.log(err);
                    return
                }
                if (this.homeCityBg) {

                    this.homeCityBg.getComponent(Sprite).spriteFrame = spriteFrame
                }
            })

        }


        if (!this.infoData) {
            return
        }
        resources.load("Prefab/itemRichText", Prefab, (err, data) => {
            if (err) {
                console.log(err);
                return
            }
            if (!this.cityHomeScrollViewContent) {
                return
            }
            let height = 0
            let index = 1
            for (let [key, value] of this.infoData) {
                let itemNode = instantiate(data);
                if (height == 0) {
                    height = itemNode.getComponent(UITransform).height
                    this.cityHomeScrollViewContent.getComponent(UITransform).height = (this.infoData.size + 1) * (height + 10)
                }

                let xxxText = find("xxRichText", itemNode)
                let mValue = ""
                if (index > 4) {
                    mValue = this.getRichString2(key + " : ", value)
                } else {
                    mValue = this.getRichString(key + " : ", value)
                }
                xxxText.getComponent(RichText).string = mValue
                this.cityHomeScrollViewContent.addChild(itemNode)
                index = index + 1
            }

        })

    }

    update(dt: number) {

    }

    public updateData(isLisa: boolean, url: string, planet: string, cityName: string, totalLand: string, cityGrade: string,
        cityLevel: number, tokenId: string, landLevel: string, townName: string, landNo: string, landPosx: string,
        landPosy: string) {
        console.log("updateData")

        // Land Name：Lisa‘s Home
        // Token ID ：
        // LAND LEVEL：
        // TOWN ：
        // LAND NO ：
        // LAND POSX：
        // LAND POSY：
        this.isLisa = isLisa
        this.cityLevel = cityLevel
        if (isLisa) {

            this.infoData = new Map([


                [CUtil.getLocalString("planet"), planet],
                [CUtil.getLocalString("city"), cityName],
                [CUtil.getLocalString("total_land"), totalLand],
                [CUtil.getLocalString("city_level"), cityLevel + ""],

                [CUtil.getLocalString("land_name"), "Lisa‘s Home"],
                [CUtil.getLocalString("tokenId"), tokenId],
                [CUtil.getLocalString("land_level"), landLevel],
                [CUtil.getLocalString("town"), townName],
                [CUtil.getLocalString("land_no"), landNo + ""],
                [CUtil.getLocalString("land_posx"), landPosx + ""],
                [CUtil.getLocalString("land_posy"), landPosy + ""]

            ])
        } else {

            this.infoData = new Map([

                [CUtil.getLocalString("planet"), planet],
                [CUtil.getLocalString("city"), cityName],
                [CUtil.getLocalString("total_land"), totalLand],
                [CUtil.getLocalString("city_level"), cityLevel + ""],

            ])

        }


    }

    getRichString(title: string, value: string) {

        return "<color=#00fff6>" + title + "</color><color=#00fff6>" + value + "</color>"
    }

    getRichString2(title: string, value: string) {

        return "<color=#ff48da>" + title + "</color><color=#ff48da>" + value + "</color>"
    }
}
