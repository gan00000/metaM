
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, sys, System, UITransform, RichText, SpriteFrame, Texture2D, AnimationComponent } from 'cc';
import { MainGame } from '../../MainGame';
import { MapController } from '../../Map/MapController';
import { LandTipsNode2Component } from './LandTipsNode2Component';
const { ccclass, property } = _decorator;

@ccclass('SLightComponent')
export class SLightComponent extends Component {

    private lightTokenIds: number[] = []
    private lisaData = null //type=3才有
    private tokenIdMapCityInfo = {}
    private parent: Node = null
    // private lightButton:Button = null
    private lightBgSprite: Sprite = null

    private lightBgClick = 0 //1为点击状态 0位正常状态

    // 1为黄色 2 为白色  3为粉色
    private type = 3

    private flashNode: Node = null
    private flashSprite: Sprite = null

    public setLisaData(data: any) {
        this.lisaData = data
    }
    public startFlash() {

        if (this.flashNode) {
            console.log("flashNode startFlash")
            this.flashNode.active = true
            this.flashNode.getComponent(AnimationComponent).play()
        }else{
            console.log("flashNode is null")
        }
    }

    public reset() {
        this.lightBgClick = 0
        this.setNormalStatue()
    }
    
    public doClick(){
        this.lightBgClick = 1
        this.setClickStatue()
        MapController.clickNodeOfSLightComponent = this
    }

    start() {

        this.parent = MainGame.find("UIParent")
        // this.lightButton = this.node.getComponent(Button)
        this.lightBgSprite = this.node.getComponent(Sprite)

        this.flashNode = find("pink_flash", this.node)
        this.flashSprite = this.flashNode.getComponent(Sprite)
        this.node.on(Button.EventType.CLICK, () => {

            console.log("slight click = ", this.lightBgClick)

            if (this.type == 3 && this.lisaData) {//粉红色才能进行次点击事件

                MapController.getDataAndShowCityTips(this.lisaData.cityId, () => {//显示lisa home
                    MapController.resetCityInfoState()
                })

                // if (this.lightBgClick == 0) {
                //     this.lightBgClick = 1
                //     this.setClickStatue()
                // } else {
                //     this.lightBgClick = 0
                //     this.setNormalStatue()
                // }
                this.doClick()
                
            }

        })

        this.flashNode.on(Button.EventType.CLICK, () => {

            console.log("flash click = ", this.lightBgClick)

            if (this.lightTokenIds.length > 0) {
                console.log("lightTokenIds = ", this.lightTokenIds)
                // for (let index = 0; index < this.lightTokenIds.length; index++) {
                //     const tokenId = this.lightTokenIds[index];

                // }
                // this.lightButton.interactable = false
                MapController.resetCityInfoState()
                resources.load("Prefab/LandTipsNode2", Prefab, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    let mLandTipsNode2: Node = instantiate(data);
                    let mLandTipsNode2Component = mLandTipsNode2.getComponent(LandTipsNode2Component)
                    mLandTipsNode2Component.setData(this.lightTokenIds)
                    mLandTipsNode2Component.callback = (m) => {
                        MapController.resetCityInfoState()
                    }
                    
                    this.parent.addChild(mLandTipsNode2)
                    MapController.mCityInfo = mLandTipsNode2
                    MapController.setTouchMove(mLandTipsNode2)
                    this.doClick()

                })

            }
        })
    }

    /**
     * name
     */
    public addTokenId(tokenId: number, type: number) {
        this.lightTokenIds.push(tokenId)
        this.type = type
    }

    setClickStatue() {

        let prefabName = "Texture/pink_100x100v_click/spriteFrame" //默认为lisa家背景
        if (this.type == 1) {
            prefabName = "Texture/yellow_100x100v_click/spriteFrame"
        } else if (this.type == 2) {
            prefabName = "Texture/white_100x100v_click/spriteFrame"
        } else if (this.type == 3) {
            prefabName = "Texture/pink_100x100v_click/spriteFrame"
        }

        resources.load(prefabName, SpriteFrame, (err, spriteFrame) => {

            if (err) {
                console.log(err);
                return
            }
            this.lightBgSprite.spriteFrame = spriteFrame
        })

        if (this.node.active) {
            
            let flashImageName = "Texture/pink_100x100v_flash_click/spriteFrame"
            if (this.type == 1) {
                flashImageName = "Texture/yellow_100x100v_flash_click/spriteFrame"
            } else if (this.type == 2) {
                flashImageName = "Texture/white_100x100v_flash_click/spriteFrame"
            } else if (this.type == 3) {

                flashImageName = "Texture/pink_100x100v_flash_click/spriteFrame"

            }
            resources.load(flashImageName, SpriteFrame, (err, spriteFrame) => {

                if (err) {
                    console.log(err);
                    return
                }
                this.flashSprite.spriteFrame = spriteFrame
            })
        }

    }

    setNormalStatue() {

        let prefabName = "Texture/pink_100x100v_normal/spriteFrame"
        if (this.type == 1) {
            prefabName = "Texture/yellow_100x100v_normal/spriteFrame"
        } else if (this.type == 2) {
            prefabName = "Texture/white_100x100v_normal/spriteFrame"
        } else if (this.type == 3) {

            prefabName = "Texture/pink_100x100v_normal/spriteFrame"

        }
        resources.load(prefabName, SpriteFrame, (err, spriteFrame) => {

            if (err) {
                console.log(err);
                return
            }
            this.lightBgSprite.spriteFrame = spriteFrame
        })

        if (this.node.active) {
            
            let flashImageName = "Texture/pink_100x100v_flash/spriteFrame"
            if (this.type == 1) {
                flashImageName = "Texture/yellow_100x100v_flash/spriteFrame"
            } else if (this.type == 2) {
                flashImageName = "Texture/white_100x100v_flash/spriteFrame"
            } else if (this.type == 3) {

                flashImageName = "Texture/pink_100x100v_flash/spriteFrame"

            }
            resources.load(flashImageName, SpriteFrame, (err, spriteFrame) => {

                if (err) {
                    console.log(err);
                    return
                }
                this.flashSprite.spriteFrame = spriteFrame
            })
        }
    }
}