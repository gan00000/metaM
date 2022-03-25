
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, sys, System, UITransform, RichText, SpriteFrame, Texture2D, view, Vec3 } from 'cc';
import { MainGame } from '../../MainGame';
import { MapController } from '../../Map/MapController';
import { CUtil } from '../../Utils/CUtil';
import { UIController } from '../UIController';
const { ccclass, property } = _decorator;

@ccclass('LisaCityInfoTipsComponent')
export class LisaCityInfoTipsComponent extends Component {

    private cityHomeScrollViewContent: Node = null
    private closeButton: Node = null
    private homeCityBg: Node = null

    private infoData: Map<string, string> = null

    private cityLevel = 0

    public callback: Function = null
    private isLisa: boolean = true
    private orginUITransform: UITransform = null


    start() {

        this.orginUITransform = this.node.getComponent(UITransform)
        let nVisibleSizeInPixel = view.getVisibleSizeInPixel()
        let nDesignResolutionSize = view.getDesignResolutionSize()
        let width = nVisibleSizeInPixel.width
        let height = nVisibleSizeInPixel.height
        console.log("nVisibleSizeInPixel =", nVisibleSizeInPixel)
        console.log("nDesignResolutionSize =", nDesignResolutionSize)
        if (height > width) {
            let scale = width / nDesignResolutionSize.width
            if (scale < 1) {

                let scaleVec3 = new Vec3(scale, scale, scale)
                this.node.setScale(scaleVec3)

            }

        }

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
                    mValue = this.getRichString2(key + ": ", value)
                } else {
                    mValue = this.getRichString(key + ": ", value)
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


                ["PLANET", planet],
                ["CITY", cityName],
                ["TOTALLAND", totalLand],
                ["CITY GRADE", cityGrade],

                [CUtil.getLocalString("LAND NAME"), "Lisa‘s Home"],
                ["TOKEN ID", tokenId],
                ["LAND LEVEL", landLevel],
                ["TOWN", townName],
                ["LAND NO", landNo + ""],
                ["LAND POSX", landPosx + ""],
                ["LAND POSY", landPosy + ""]

            ])
        } else {

            this.infoData = new Map([

                ["PLANET", planet],
                ["CITY", cityName],
                ["TOTALLAND", totalLand],
                ["CITY GRADE", cityGrade],

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
