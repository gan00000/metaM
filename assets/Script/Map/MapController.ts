import { Input, Node, Tween, EventTouch, EventMouse, Vec2, Vec3, UITransform, find, clamp, TiledMap, assetManager, resources, JsonAsset, Prefab, instantiate, Sprite, SpriteFrame, AnimationComponent, view} from 'cc';
import { CityInfoTipsComponent } from '../UI/Component/CityInfoTipsComponent';
import { SLightComponent } from '../UI/Component/SLightComponent';
import { LisaCityInfoTipsComponent } from '../UI/Component/LisaCityInfoTipsComponent';

import { UIController } from '../UI/UIController';
import { MainGame } from './../MainGame';
import { CUtil } from '../Utils/CUtil';
import { LandInfoTipsComponent } from '../UI/Component/LandInfoTipsComponent';
import { TokenIdButtonComponent } from '../UI/Component/TokenIdButtonComponent';

export class MapController {
    private static mapInput: Node = null
    private static mapGroup: Node = null
    private static uIParent: Node = null
    private static mapTiled: TiledMap = null

    private static oneMapWidth: number = 6498
    private static oneMapHeight: number = 3724

    private static halfOneMapWidth: number = 6498 / 2
    private static halfOneMapHeight: number = 3724 / 2

    //地图组成个数
    private static mapCount = 3

    private static minScale: number = 0.2
    private static maxScale: number = 1.8

    private static basePosYRange: number = 0

    private static mouseWheelRate: number = 0.0001
    private static touchZoomRate: number = 0.0012
    private static touchBaseHeight: number = 1080
    private static touchMoveRate: number = 0.5

    private static lastTouchPos1: Vec2 = null
    private static lastTouchPos2: Vec2 = null

    private static isDrag: boolean = false

    //每个城镇数据 （x_y:townlistinfo）
    private static worldTowns = {}
    private static worldTownsWithTownId = {}
    private static allWorldTownId = []
    //城市对应城镇数据
    private static belongTowns = {}
    //城市信息
    private static cityInfo = {}
    //城市名字
    private static cityNameMap = {}
    //已售土地数据{tokenId: landInfo}
    private static saledLandData = {}
    //每个城镇的土地数据{townId:{}}
    private static townLands = {}
    //lisa home data 运营给的 {cityId:info}
    private static lisaData = {}

    // private static lightTownPosTag = {}
    private static lightPosNode = {}
    //发光点对应的townId:{}坐标
    public static lightPosWithTokenId = {}
    public static lightPosWithLightNode = {}

    public static mAlertView:Node = null
    public static mClickCityBgNode:Node = null

    // public static mNtfsControllerNode: Node = null

    private static loadDataFinish = 0

    public static mapCanMove = true
    public static mapCanScale = true

    private static lisaHomeNodes = {}

    public static languageDic = {}

    public static clickNodeOfSLightComponent:SLightComponent = null
    public static mLandInfoTipsComponent:LandInfoTipsComponent = null
    public static mTokenIdButtonComponent:TokenIdButtonComponent = null

    public static init() {
        this.mapInput = MainGame.find("MapInput")
        this.mapGroup = find("MapGroup", this.mapInput)
        this.uIParent = MainGame.find("UIParent")

        this.basePosYRange = this.oneMapHeight * this.minScale

        this.mapTiled = find("Map1/Tiled", this.mapGroup).getComponent<TiledMap>(TiledMap)

        var input = this.mapInput

        //加载语言
        resources.load('Json/language/' + MainGame.language, (err, data: any) => {
            // console.log("err, data = ", err, data)
            if (err) {
                console.log(err);
                return
            }
            this.languageDic = data.json

        })

        view.setResizeCallback(()=>{
            console.log("setResizeCallback");
            this.move(0.1,0.1)
        })

        //加载所有城镇及其对应的tile 坐标
        resources.load('Json/MapData/map', (err, data: any) => {
            // console.log("err, data = ", err, data)
            if (err) {
                console.log(err);
                return
            }
            let townlist = data.json.townlist;
            // console.log("townlist = ", townlist)
            for(let i=0; i < townlist.length; i++) {
                let townInfo = townlist[i];
                let key = 'x_' + townInfo.posx + '_y_' + townInfo.posy;
                let tmp = []
                if (this.worldTowns[key]) {
                    tmp = this.worldTowns[key];
                }
                tmp[tmp.length] = townInfo
                this.worldTowns[key] = tmp

                this.worldTownsWithTownId[townInfo.id + ""] = townInfo
                this.allWorldTownId.push(townInfo.id + "")

                let belongTmp = []
                if (this.belongTowns[townInfo.belong]) {
                    belongTmp = this.belongTowns[townInfo.belong]
                }
                belongTmp[belongTmp.length] = townInfo
                this.belongTowns[townInfo.belong] = belongTmp
            }
            this.loadDataFinish = this.loadDataFinish + 1
            //lisa的加添加粉红色框
            MapController.setLisaCityBg();
            console.log("this.worldTowns =", this.worldTowns);
            console.log("this.belongTowns =", this.belongTowns);
        })

        //加载城市的名字列表
        resources.load('Json/MapData/cityname', (err, data: any) => {
            console.log("err, data = ", err, data)
            if (err) {
                console.log(err);
                return
            }
            let cityDatas = data.json.list
            for(let i = 0; i < cityDatas.length; i++) {
                let data = cityDatas[i]
                this.cityNameMap[data.id] = data.name;
            }
            // console.log("this.cityNameMap = ", this.cityNameMap);
        })

        //加载城市信息
        resources.load('Json/MapData/city', (err, data: any) => {
            // console.log("err, data = ", err, data)
            if (err) {
                console.log(err);
                return
            }
            let cityList = data.json.citylist
            if (cityList) {
                for (let i = 0; i < cityList.length; i++) {
                    let city = cityList[i];
                    this.cityInfo[city.id] = city;
                }
                this.loadDataFinish = this.loadDataFinish + 1
                //lisa的加添加粉红色框
                MapController.setLisaCityBg();
            }
            // console.log("this.cityInfo = ", this.cityInfo);
        })

        //加载已售土地信息
        resources.load('Json/MapData/landpos', (err, data: any) => {
            // console.log("err, data = ", err, data)
            if (err) {
                console.log(err);
                return
            }
            this.saledLandData = data.json
            // console.log("this.landData = ", this.saledLandData);
            resources.load('Json/MapData/webmap_buchang_5016', (xerr, xdata: any) => {
                // console.log("err, data = ", xerr, xdata)
                if (xerr) {
                    console.log(xerr);
                    return
                }
                let buchangDatas = xdata.json
                if (buchangDatas) {
                    for (const key in buchangDatas) {
                        if (!this.saledLandData[key]) {
                            this.saledLandData[key] = buchangDatas[key];
                        }
                    }
                }

                // console.log("this.landData = ", this.saledLandData);
            })
            
        })

        resources.load('Json/lisaHomeData/lisaData', (err, data: any) => {
            // console.log("err, data = ", err, data)
            if (err) {
                console.log(err);
                return
            }
            let lisaData = data.json
            for(let i = 0; i < lisaData.length; i++) {
                let data = lisaData[i]
                this.lisaData[data.cityId] = data;
            }
            this.loadDataFinish = this.loadDataFinish + 1
            //lisa的加添加粉红色框
            MapController.setLisaCityBg();
        })

        input.on(Input.EventType.TOUCH_START, (event: EventTouch) => {
            let touches = event.getAllTouches()
            let touchCount = touches.length

            if (touchCount == 2) {
                if (!this.lastTouchPos1 || !this.lastTouchPos2) {
                    this.lastTouchPos1 = new Vec2(0, 0)
                    this.lastTouchPos2 = new Vec2(0, 0)
                }

                this.lastTouchPos1.x = touches[0].getLocationX()
                this.lastTouchPos1.y = touches[0].getLocationY()

                this.lastTouchPos2.x = touches[1].getLocationX()
                this.lastTouchPos2.y = touches[1].getLocationY()
            }
        })

        input.on(Input.EventType.TOUCH_MOVE, (event: EventTouch) => {
            let touches = event.getAllTouches()
            let touchCount = touches.length

            // if (!this.canMove()) {
            //     return
            // }

            if (touchCount == 1) {
                this.move(event.getDeltaX(), event.getDeltaY())
            } else if (touchCount == 2) {
                let curX1 = touches[0].getLocationX()
                let curY1 = touches[0].getLocationY()
                let curX2 = touches[1].getLocationX()
                let curY2 = touches[1].getLocationY()

                let newDist = Math.sqrt(Math.pow(curX1 - curX2, 2) + Math.pow(curY1 - curY2, 2))
                let oldDist = Math.sqrt(Math.pow(this.lastTouchPos1.x - this.lastTouchPos2.x, 2) + Math.pow(this.lastTouchPos1.y - this.lastTouchPos2.y, 2))

                let zoom = (newDist - oldDist) / (screen.height / this.touchBaseHeight) * this.touchZoomRate

                this.scale(zoom, (touches[0].getUILocationX() + touches[1].getUILocationX()) / 2, (touches[0].getUILocationY() + touches[1].getUILocationY()) / 2)

                this.lastTouchPos1.x = curX1
                this.lastTouchPos1.y = curY1

                this.lastTouchPos2.x = curX2
                this.lastTouchPos2.y = curY2

            }

            if(Math.abs(event.getDeltaX()) >= 1 || Math.abs(event.getDeltaY()) >= 1){
                this.isDrag = true
            }
        })

        input.on(Input.EventType.MOUSE_WHEEL, (event: EventMouse) => {
            // if (!this.canScale()) {
            //     return
            // }
            this.scale(this.mouseWheelRate * event.getScrollY(), event.getUILocationX(), event.getUILocationY())
        })

        input.on(Input.EventType.TOUCH_END, (event: EventTouch) => {
            if (!this.isDrag) {
                let uiPos = event.getUILocation()
                let pos = this.getMapTownPos(uiPos.x, uiPos.y)
                this.transferToTilePos(pos)
                console.log("城镇左上角坐标:   ", event.getAllTouches().length, pos)
                let key = 'x_' + pos.x + '_y_' + pos.y;
                //获取当前点击的是哪个城镇
                let townInfo = this.worldTowns[key]
                if(!townInfo) {
                    console.log("当前点击的不是城镇图标", pos);
                    return
                }
                this.getDataAndShowCityTipsFromClick(townInfo);
            }
            this.isDrag = false
        })

       
    }

    private static setLisaCityBg() {

        if (this.loadDataFinish == 3) {
            
            for (const key in this.lisaData) {

                if (Object.prototype.hasOwnProperty.call(this.lisaData, key)) {

                    const lisaCityData = this.lisaData[key];
                    let town = this.belongTowns[lisaCityData.cityId][0];
                    let city = this.cityInfo[lisaCityData.cityId];

                    let townUIPos = this.getCityFirstTownPos(town.id, city);
                    if (townUIPos) {
                        
                        let cityLevel = city.level;
                        // let prefabName = "Prefab/mapPinkNormalBgLevel" + cityLevel
                        let prefabName = "Prefab/slight_pink_" + cityLevel
                        resources.load(prefabName, Prefab, (err, data) => {
                            if (err) {
                                console.log(err);
                                return;
                            }

                            for (let index = -1; index <= 1; index++) {
                
                                let px = townUIPos.x + index * this.oneMapWidth
                                let py = townUIPos.y

                                let lisaCityBg = instantiate(data);
                                if (cityLevel==1) {//城市等级不一样，格子大小不一样
                                
                                    this.mapGroup.addChild(lisaCityBg);
                                    lisaCityBg.setPosition(px + 38, py - 38);
                                } else if(cityLevel==2) {

                                    this.mapGroup.addChild(lisaCityBg);
                                    lisaCityBg.setPosition(px + 19, py - 19);
        
                                }
                                lisaCityBg.getComponent(SLightComponent).setLisaData(lisaCityData)
                                this.lisaHomeNodes[px + "_" + py] = lisaCityBg

                            }
                            
                            
                        });
                    }
                }
            }
           console.log("set lisa home bg finish")
        
        }

    }

    private static getPosYRangeV2: Vec2 = null
    private static getPosYRange(): Vec2 {
        if (!this.getPosYRangeV2) {
            this.getPosYRangeV2 = new Vec2(0, 0)
        }

        // 计算出最大最小Pos Y
        // let range = (this.mapGroup.scale.x * this.oneMapHeight * 3 - this.basePosYRange) / 2
        let range = (this.mapGroup.scale.x * this.oneMapHeight - this.basePosYRange) / 2

        if (range <= 0) {
            this.getPosYRangeV2.x = 0
            this.getPosYRangeV2.y = 0
        } else {
            this.getPosYRangeV2.x = range
            this.getPosYRangeV2.y = -range
        }

        return this.getPosYRangeV2
    }

    private static getMapTownPosInV3 = null
    private static getMapTownPosOutV3 = null
    private static getMapTownPos(uiPosX: number, uiPosY: number): Vec3 {
        if (!this.getMapTownPosInV3 || !this.getMapTownPosOutV3) {
            this.getMapTownPosInV3 = new Vec3(0, 0, 0)
            this.getMapTownPosOutV3 = new Vec3(0, 0, 0)
        }

        this.getMapTownPosInV3.x = uiPosX
        this.getMapTownPosInV3.y = uiPosY

        this.mapGroup.getComponent<UITransform>(UITransform).convertToNodeSpaceAR(this.getMapTownPosInV3, this.getMapTownPosOutV3)

        let lbX = (this.getMapTownPosOutV3.x + this.halfOneMapWidth) % this.oneMapWidth
        let lbY = (this.getMapTownPosOutV3.y + this.halfOneMapHeight) % this.oneMapHeight

        if (lbX < 0) {
            lbX += this.oneMapWidth
        }

        if (lbY < 0) {
            lbY += this.oneMapHeight
        }

        //坐标映射到坐上角为起始点
        lbY = this.oneMapHeight - lbY

        this.getMapTownPosOutV3.x = lbX
        this.getMapTownPosOutV3.y = lbY

        return this.getMapTownPosOutV3
    }


    // private static getUIPosByTownPosOutV3 = null
    // private static getUIPosByTownPos(townX: number, townY: number): Vec3 {
    //     if (!this.getUIPosByTownPosOutV3) {
    //         this.getUIPosByTownPosOutV3 = new Vec3(0, 0, 0)
    //     }

    //     let tileSize = this.mapTiled.getTileSize()

    //     let x = tileSize.x * townX
    //     let y = tileSize.y * townY

    //     y = this.oneMapHeight - y

    //     this.getUIPosByTownPosOutV3.x = x - this.halfOneMapWidth
    //     this.getUIPosByTownPosOutV3.y = y - this.halfOneMapHeight

    //     return this.getUIPosByTownPosOutV3
    // }

    private static getPosXRangeV2: Vec2 = null
    private static getPosXRange(): Vec2 {
        if (!this.getPosXRangeV2) {
            this.getPosXRangeV2 = new Vec2(0, 0)
        }

        // 计算出最大最小Pos X
        let border = 100
        let range = (this.mapGroup.scale.x * this.oneMapWidth) - border

        this.getPosXRangeV2.x = range
        this.getPosXRangeV2.y = -range

        return this.getPosXRangeV2
    }

    private static move(deltaX: number, deltaY: number) {

        console.log("deltaX,deltaY",deltaX, deltaY)

        let x = this.mapGroup.position.x + deltaX
        let y = this.mapGroup.position.y + deltaY

        let posYRange = this.getPosYRange()
        y = clamp(y, posYRange.y, posYRange.x)

        let posXRange = this.getPosXRange()
        if (x > posXRange.x) {
            x -= posXRange.x
        } else if (x < posXRange.y) {
            x -= posXRange.y
        }

        this.mapGroup.setPosition(x, y, 0)
    }

    private static scaleInV3: Vec3 = null
    private static scaleOutV3: Vec3 = null
    private static scale(scale: number, uiPosX: number, uiPosY: number) {
        if (!this.scaleInV3 || !this.scaleOutV3) {
            this.scaleInV3 = new Vec3(0, 0, 0)
            this.scaleOutV3 = new Vec3(0, 0, 0)
        }

        this.scaleInV3.x = uiPosX
        this.scaleInV3.y = uiPosY
        
        this.mapGroup.getComponent<UITransform>(UITransform).convertToNodeSpaceAR(this.scaleInV3, this.scaleOutV3)

        let oldScale = this.mapGroup.scale.x

        scale += oldScale

        scale = clamp(scale, this.minScale, this.maxScale)

        this.mapGroup.setScale(scale, scale, scale)

        let scaleOffset = this.mapGroup.scale.x - oldScale

        let dirX = 0
        let dirY = 0
        if (this.scaleOutV3.x < 0) {
            dirX = 1
        }
        else if (this.scaleOutV3.x > 0) {
            dirX = -1
        }

        if (this.scaleOutV3.y < 0) {
            dirY = 1
        }
        else if (this.scaleOutV3.y > 0) {
            dirY = -1
        }

        this.move(dirX * scaleOffset * this.halfOneMapWidth * Math.abs(this.scaleOutV3.x / this.halfOneMapWidth),
            dirY * scaleOffset * this.halfOneMapHeight * Math.abs(this.scaleOutV3.y / this.halfOneMapHeight))
    }

    private static transferToTilePos(outPos: Vec3) {
        let tileSize = this.mapTiled.getTileSize()
        outPos.x = Math.floor(outPos.x / tileSize.x)
        outPos.y = Math.floor(outPos.y / tileSize.y)
    }


    private static getDataAndShowCityTipsFromClick(townInfo: any) {
        let city = this.cityInfo[townInfo[0].belong] //找到城镇所属城市
        let townId = townInfo[0].id //去第一个城镇，即左上角坐标城镇
        console.log("city = ", city, townInfo)
        this.getDataAndShowCityTips(city.id, ()=>{})
    }

    //获取数据，然后显示城市tips
    public static getDataAndShowCityTips(xxCityId: number, callback:Function) {

        let city = this.cityInfo[xxCityId]
        if (!city) {
            console.log("not find city cityId=",xxCityId)
            return
        }
        let starName = 'Titan';
        let cityId = '';
        let landNum = 150 * 4;  // 4个镇构成一个一级城市, 2个镇构成一个二级城市
        let cityLevelName = '1st class city';  //一級城市 First class city /1st class city ; 二級城市. Second class city/2nd class city
        let cityName = '';
        // let city = this.cityInfo[townInfo[0].belong] //找到城镇所属城市
        // let townId = townInfo[0].id //去第一个城镇，即左上角坐标城镇
        // console.log("city = ", city, townInfo)
        
        let townId = this.belongTowns[xxCityId][0].id

        if (city) {
            cityId = city.id
            if (city.level == 1) {
                cityLevelName = '1st class city';
            } else {
                cityLevelName = '2nd class city';
                landNum = 150 * 2
            }
            //获取城市的名字
            cityName = this.cityNameMap[cityId]
            if (!cityName) {
                cityName = cityId + ' City';  //二级城市没有名字，用cityId代替
            }

            MapController.resetCityInfoState();

              //添加白框或者黄色框
            let cityLevel = city.level
            let townUIPos = MapController.getCityFirstTownPos(townId, city);

            let lisaInfo = this.lisaData[cityId+""]
            
            if (lisaInfo) {//点击了lisa的家
                
                // this.getDataAndShowLandTips(1033,false)
                
                MapController.showLisaCityInfo(true,starName, cityName, landNum, cityLevelName, city, lisaInfo, cityLevel, townUIPos,callback);

            } else {
                
                // resources.load("Prefab/CityInfo", Prefab, (err, data) => {
                //     if (err) {
                //         console.log(err);
                //         return
                //     }
                //     this.mCityInfo = instantiate(data);
                //     this.mCityInfo.getComponent(CityInfoTipsComponent).updateData("",starName,cityName,landNum + "",cityLevelName,city.level)
                //     this.uIParent.addChild(this.mCityInfo)
                //     this.setTouchMove(this.mCityInfo)

                //     MapController.setCityBlockBg(cityLevel, townUIPos);
                // })

                resources.load("Prefab/LisaCityTips", Prefab, (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    this.mAlertView = instantiate(data);
                    let mLisaCityInfoTipsComponent = this.mAlertView.getComponent(LisaCityInfoTipsComponent)
                    mLisaCityInfoTipsComponent.updateData(false,"", starName, cityName, landNum + "", cityLevelName, city.level,
                        "", "", "", "", "", "");
                    mLisaCityInfoTipsComponent.callback = callback

                    this.uIParent.addChild(this.mAlertView);
                    this.setTouchMove(this.mAlertView) 
                    MapController.setCityBlockBg(cityLevel, townUIPos);
                })
            }
        }

        //TODO: 显示城市tips
        // console.log("starName, cityName, cityLevel, landNum = ", starName, cityName, cityLevel, landNum);

        //NOTE: 测试显示读土地tips
        // this.getDataAndShowLandTips(1033);

        
    }

    private static setCityBlockBg(cityLevel: any, townUIPos: Vec3) {
        if (cityLevel == 1) {

            resources.load("Prefab/mapYellowClickBg", Prefab, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this.mClickCityBgNode = instantiate(data);
                this.mapGroup.addChild(this.mClickCityBgNode);
                this.mClickCityBgNode.setPosition(townUIPos.x + 38, townUIPos.y - 38);
            });

        } else {

            resources.load("Prefab/mapWhiteClickBg", Prefab, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this.mClickCityBgNode = instantiate(data);
                this.mapGroup.addChild(this.mClickCityBgNode);
                this.mClickCityBgNode.setPosition(townUIPos.x + 19, townUIPos.y - 19);
            });
        }
    }

    private static showLisaCityInfo(isLisa:boolean,starName: string, cityName: string, landNum: number, cityLevelName: string, city: any, lisaInfo: any, cityLevel: any, townUIPos: Vec3, callback:Function) {
    
        resources.load("Prefab/LisaCityTips", Prefab, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            this.mAlertView = instantiate(data);
            let mLisaCityInfoTipsComponent = this.mAlertView.getComponent(LisaCityInfoTipsComponent)
            mLisaCityInfoTipsComponent.updateData(true,"", starName, cityName, landNum + "", cityLevelName, city.level,
                lisaInfo.tokenID, lisaInfo.landLevel, lisaInfo.townName, lisaInfo.landNo, lisaInfo.landPosx, lisaInfo.landPosy);
            mLisaCityInfoTipsComponent.callback = callback
            this.uIParent.addChild(this.mAlertView);
            this.setTouchMove(this.mAlertView) 
/**
            if (cityLevel == 1) {

                resources.load("Prefab/mapPinkClickBgLevel1", Prefab, (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    this.mClickTownNode = instantiate(data);
                    this.mapGroup.addChild(this.mClickTownNode);
                    this.mClickTownNode.setPosition(townUIPos.x + 38, townUIPos.y - 38);
                });

            } else {

                resources.load("Prefab/mapPinkClickBgLevel2", Prefab, (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    this.mClickTownNode = instantiate(data);
                    this.mapGroup.addChild(this.mClickTownNode);
                    this.mClickTownNode.setPosition(townUIPos.x + 19, townUIPos.y - 19);
                });
            }
 */
        });
        
    }

    public static resetCityInfoState() {

        if (this.clickNodeOfSLightComponent) {
            this.clickNodeOfSLightComponent.reset()
            this.clickNodeOfSLightComponent = null
        } 
        if (this.mLandInfoTipsComponent) {
            this.mLandInfoTipsComponent.reset()
            this.mLandInfoTipsComponent = null
        }
        if (this.mTokenIdButtonComponent) {
            this.mTokenIdButtonComponent.reset()
            this.mTokenIdButtonComponent = null
        }
        if (this.mAlertView) {
            this.mAlertView.removeFromParent();
            this.mAlertView.destroy();
            this.mAlertView = null;
        }
        if (this.mClickCityBgNode) {
            this.mClickCityBgNode.removeFromParent();
            this.mClickCityBgNode.destroy();
            this.mClickCityBgNode = null;
        }
    }

    //根据tokenId获取土地数据，然后显示土地tips
    public static getDataAndShowLandTips(tokenId: number,isLight:boolean,callback: Function) {
        
        let saledLand = this.saledLandData[tokenId + ""]//已售信息
        if (!saledLand) {
            console.log("not found the saledLandData by tokenId: ", tokenId)
            return
        }

        let townId = saledLand.townid
        // console.log("land data townId,tokenId", townId,tokenId);
        //加载该城镇土地数据
        let townLandMap = this.townLands[townId];
        if (!townLandMap) {
            //如果不存在加载
            resources.load('Json/Land/' + townId, (err, data: any) => {
                if (err) {
                    console.log("err = ", err)
                    return
                }
                //拿到该镇所有的土地信息
                let landInfo = {};
                let lands = data.json;
                for (let i = 0; i < lands.length; i++) {
                    let land = lands[i];
                    let key = 'x_' + land.posx + '_y_' + land.posy;
                    // let key = CUtil.hex2Number(land.tokenid)
                    landInfo[key] = land;
                    
                }
                this.townLands[townId] = landInfo
                // console.log("landData = ", landInfo);
                let xkey = 'x_' + saledLand.landx + '_y_' + saledLand.landy;
                let landdata = this.townLands[townId][xkey]
                this.showLandTips(tokenId,landdata, isLight,callback);
            });
        } else {
            let xkey = 'x_' + saledLand.landx + '_y_' + saledLand.landy;
           
            let landdata = townLandMap[xkey]
            this.showLandTips(tokenId,landdata,isLight,callback);
        }
    }

    // public static sLightPrefabData:Prefab = null

    //根据某个城镇的土地坐标显示土地tips   landdata.townid, landdata.posx, landdata.posy
    private static showLandTips(tokenId: number, land:any, isLight:boolean,callback: Function) {
        // console.log("townId, x, y =", townId, landx, landy);
        // let townLandMap = this.townLands[townId];
        // if(!townLandMap) {
        //     console.log("not found the town lands ", townId);
        //     return;
        // }

        // let key = 'x_' + landx + '_y_' + landy;
        // let land = townLandMap[key];
        if (!land) {
            console.log("not found the town land");
            return
        }
       
        let townId = land.townid
        let landx = land.posx
        let landy = land.posy
        let starContent = 'Titan' //"泰坦星"
        let infoConetent = land.cityid + ' City, ' + townId + 'Town'
        //获取城市的名字
        let cityName = this.cityNameMap[land.cityid]
        if (cityName) {
            infoConetent = cityName + ' , ' + land.townid + 'Town'
        }
         if (!cityName) {
             cityName = land.cityid + ' City';  //二级城市没有名字，用cityId代替
         }
    
        let cityLevel = '2'
        // let mCity = ""
        let city = this.cityInfo[land.cityid]
        
        if (isLight) {
            
            this.createLightNode(tokenId,townId,city,callback)
            
        }else{

             if (city) {
            if (city.level == 1) {
                cityLevel = '1';
                // mCity = city.name + ""
            } else {
                cityLevel = '2';
                // mCity = city.cityname + "City"
            }
        }

        let landLevel = "B"
        if (land.level == 1) {
            landLevel = "S"
        } else if (land.level == 2) {
            landLevel = "A"
        }

        let tmplandId = land.id.toString(16)
        tmplandId = parseInt(tmplandId.substring(tmplandId.length-4), 16)
        let landId = tmplandId % 150
        if(landId == 0) {
            landId = 150
        }
        let landPos = 'X:' + land.posx + '/Y:' + land.posy;
        let landUrl = 'https://static-download2.metacitym.com' + land.imageurl

        let landName = ""
        let landSize = "40*30"

        //TODO: 显示土地tips
        console.log("hello land:townId,cityid,cityName,cityLevel,landId,landLevel,landPos,landUrl=", townId, land.cityid, cityName, cityLevel, landId, landLevel, landPos, landUrl)
        // 'PLANET', 'CITY LEVEL', 'LAND LEVEL', 'CITY', 'TOWN',
        //  'LAND NO', 'LAND POSX', 'LAND POSY', 'LAND SIZE', 'LAND NAME'
        let cityInfoMap = new Map([
            [CUtil.getLocalString("planet"),starContent],
            [CUtil.getLocalString("city_level"), cityLevel],
            [CUtil.getLocalString("land_level"), landLevel],
            [CUtil.getLocalString("city"), cityName],
            [CUtil.getLocalString("town"), townId + "Town"],
            [CUtil.getLocalString("land_no"),landId + ""],
            [CUtil.getLocalString("land_posx"), landx + ""],
            [CUtil.getLocalString("land_posy"), landy + ""],
            [CUtil.getLocalString("land_size"), landSize + ""]
            
        ])
        if (callback) {
            callback(tokenId,landUrl,cityInfoMap)
            return
        }
            let lightUIPos = this.lightPosWithTokenId[tokenId] //点击左边tokenId

            // console.log("lightUIPos Position x,y=",lightUIPos.x,lightUIPos.y)
            if (lightUIPos) {
                 
                resources.load("Prefab/nfts_bg", Prefab, (err, data) => {
                    if (err) {
                        console.log(err);
                        return
                    }
                    this.mAlertView = instantiate(data);
                    this.mLandInfoTipsComponent = this.mAlertView.getComponent(LandInfoTipsComponent)
                    this.mLandInfoTipsComponent.updateDatas(tokenId + "",landUrl,cityInfoMap)
                    this.uIParent.addChild(this.mAlertView)
                    this.setTouchMove(this.mAlertView)
                    // this.mNtfsControllerNode.setPosition(34 * this.mapGroup.scale.x, -16 * this.mapGroup.scale.y)
                    
                })

                let key = lightUIPos.x + "_" + lightUIPos.y
                let lightNode:Node = this.lightPosWithLightNode[key]
                if (lightNode) {
                    
                    lightNode.getComponent(SLightComponent).doClick()
                }

                // let lisaInfo = this.lisaData[city.id+""]
                // if (lisaInfo) {
                //     let key = lightUIPos.x + "_" + lightUIPos.y
                //     let lightNode = this.lightPosWithLightNode[key]
                //     lightNode.getComponent<SLightComponent>(SLightComponent).doClick()
                // }else{

                //     MapController.setCityBlockBg(city.level,lightUIPos)
                // }
        
            }
        }
    }

    private static createLightNode(tokenId:number, townId:number, city:any, callback:Function){

        if (this.worldTownsWithTownId[townId]) {
            let cityLevel = city.level;
            let lightUIPos = MapController.getCityFirstTownPos(townId, city);
            this.lightPosWithTokenId[tokenId] = lightUIPos

            let lisaInfo = this.lisaData[city.id+""]

            // let aKey = mx+"_"+my
            let existLightNode:Node = this.lightPosWithLightNode[lightUIPos.x + "_" + lightUIPos.y]
            if (existLightNode) {//已经存在发光点
                //记录该发光点对应的tokenId
                // console.log("exist light = " + tokenId)

                for (let index = -1; index <= 1; index++) {
                
                    let px = lightUIPos.x + index * this.oneMapWidth
                    let py = lightUIPos.y
                    let tempExistNode = this.lightPosWithLightNode[px + "_" + py]

                    if (lisaInfo) {

                        tempExistNode.getComponent<SLightComponent>(SLightComponent).addTokenId(tokenId,3)
                    }else{

                        tempExistNode.getComponent<SLightComponent>(SLightComponent).addTokenId(tokenId,cityLevel)
                    }

                }
                callback()
                return
            }

            
            if (lisaInfo) {
                console.log("start lisa flash tokenId=" + tokenId)
                for (let index = -1; index <= 1; index++) {
                
                    let px = lightUIPos.x + index * this.oneMapWidth
                    let py = lightUIPos.y

                    let lisaNode:Node = this.lisaHomeNodes[px + "_" + py]
                    lisaNode.getComponent<SLightComponent>(SLightComponent).startFlash()
                    lisaNode.getComponent<SLightComponent>(SLightComponent).addTokenId(tokenId,3)
                    this.lightPosWithLightNode[px + "_" + py] = lisaNode

                }
                callback()
                return
            }
           
                let sLightPrefabName = "Prefab/slight" + cityLevel
                resources.load(sLightPrefabName, Prefab, (err, data) => {
                    if (err) {
                        console.log(err);
                        return
                    }
                    // console.log("add light2 = " + tokenId)
                    for (let index = -1; index <= 1; index++) {
                
                        let px = lightUIPos.x + index * this.oneMapWidth
                        let py = lightUIPos.y

                        let lightRefab: Node = instantiate(data);
                        this.mapGroup.addChild(lightRefab);
                        if (cityLevel == 1) {//不同等级偏移量不一样
                            lightRefab.setPosition(px+ 38,py -38)
                            lightRefab.getComponent<SLightComponent>(SLightComponent).addTokenId(tokenId,cityLevel)
                        } else {
                            lightRefab.setPosition(px+ 19,py - 19)
                            lightRefab.getComponent<SLightComponent>(SLightComponent).addTokenId(tokenId,cityLevel)
                        }
                        this.lightPosWithLightNode[px + "_" + py] = lightRefab
                    } 
                    callback()
                })
            
        }else{
            console.log("找不到townInfo townId=" + townId);
            callback()
        }
        
    }

    private static getCityFirstTownPos(townId: number, city: any) {

        if (townId == null || city == null) {
            return null
        }

        let townInfo = this.worldTownsWithTownId[townId];
        let mx = townInfo.posx; //* 38
        let my = townInfo.posy; //* 38
        let cityLevel = city.level;
        if (city.level == 1) {
            let firstTownInfo = this.belongTowns[townInfo.belong][0];
            if (firstTownInfo) {
                mx = firstTownInfo.posx;
                my = firstTownInfo.posy;
            }

        }

        let townUIPos = this.getUIPosByTownPos(mx, my);
        return townUIPos;
    }

    /**
     * name
     */
    public static testCreateAllLight() {
        if (this.worldTownsWithTownId) {
            
            // for (let index = 0; index < this.allWorldTownId.length; index++) {
            //     const townInfo = this.allWorldTownId[index];
            //     let xTownId = this.worldTownsWithTownId[townInfo].
            // }
        }
    }
    // private static getUIPosByTownPosOutV3 = null
    private static getUIPosByTownPos(townX: number, townY: number): Vec3 {
        // if (!this.getUIPosByTownPosOutV3) {
        // }
        let getUIPosByTownPosOutV3 = new Vec3(0, 0, 0)

        let tileSize = this.mapTiled.getTileSize()

        let x = tileSize.x * townX
        let y = tileSize.y * townY

        y = this.oneMapHeight - y

        getUIPosByTownPosOutV3.x = x - this.halfOneMapWidth
        getUIPosByTownPosOutV3.y = y - this.halfOneMapHeight

        return getUIPosByTownPosOutV3
    }
   
    private static canMove() {
        if (this.mAlertView || !this.mapCanMove) {
            return false
        } else {
            return true
        }
    }

    private static canScale() {
        if (this.mAlertView || !this.mapCanScale) {
            return false
        } else {
            return true
        }
    }

    /**
     * 弹框移动
     */
    public static setTouchMove(moveNode:Node) {

        if (moveNode) {
            
            moveNode.on(Input.EventType.TOUCH_MOVE, (event: EventTouch) => {
                let touches = event.getAllTouches()
                let touchCount = touches.length
    
                if (touchCount == 1) {
                    this.alertViewMove(moveNode,event.getDeltaX(), event.getDeltaY())
                } 
            })
        }

    }

    private static alertViewMove(moveNode:Node, deltaX: number, deltaY: number) {

        console.log("deltaX,deltaY",deltaX, deltaY)

        let scale_y = 1
        if (view.getScaleY() > 1) {
            scale_y = view.getScaleY()
        }
        let x = moveNode.position.x + deltaX / scale_y
        let y = moveNode.position.y + deltaY / scale_y

        // let posYRange = this.getPosYRange()
        // y = clamp(y, posYRange.y, posYRange.x)

        // let posXRange = this.getPosXRange()
        // if (x > posXRange.x) {
        //     x -= posXRange.x
        // } else if (x < posXRange.y) {
        //     x -= posXRange.y
        // }

        moveNode.setPosition(x, y, 0)
    }
}
