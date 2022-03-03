import { Input, Node, Tween, EventTouch, EventMouse, Vec2, Vec3, UITransform, find, clamp, TiledMap, assetManager, resources} from 'cc';
import { MainGame } from './../MainGame';

export class MapController {
    private static mapInput: Node = null
    private static mapGroup: Node = null
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

    private static lastTouchPos1: Vec2 = null
    private static lastTouchPos2: Vec2 = null

    private static isDrag: boolean = false

    //每个城镇数据
    private static worldTowns = {}
    //城市对应城镇数据
    private static belongTowns = {}
    //城市信息
    private static cityInfo = {}
    //城市名字
    private static cityNameMap = {}

    public static init() {
        this.mapInput = MainGame.find("MapInput")
        this.mapGroup = find("MapGroup", this.mapInput)

        this.basePosYRange = this.oneMapHeight * this.minScale

        this.mapTiled = find("Map1/Tiled", this.mapGroup).getComponent<TiledMap>(TiledMap)

        var input = this.mapInput

        //加载所有城镇及其对应的tile 坐标
        resources.load('Json/MapData/map', (err, data) => {
            console.log("err, data = ", err, data)
            if (err) {
                return
            }
            let townlist = data.json.townlist;
            console.log("townlist = ", townlist)
            for(let i=0; i < townlist.length; i++) {
                let townInfo = townlist[i];
                let key = 'x_' + townInfo.posx + '_y_' + townInfo.posy;
                let tmp = []
                if (this.worldTowns[key]) {
                    tmp = this.worldTowns[key];
                }
                tmp[tmp.length] = townInfo
                this.worldTowns[key] = tmp

                let belongTmp = []
                if (this.belongTowns[townInfo.belong]) {
                    belongTmp = this.belongTowns[townInfo.belong]
                }
                belongTmp[belongTmp.length] = townInfo
                this.belongTowns[townInfo.belong] = belongTmp
            }

            console.log("this.worldTowns =", this.worldTowns);
            console.log("this.belongTowns =", this.belongTowns);
        })

        //加载城市的名字列表
        resources.load('Json/MapData/cityname', (err, data) => {
            console.log("err, data = ", err, data)
            if (err) {
                return
            }
            let cityDatas = data.json.list
            for(let i = 0; i < cityDatas.length; i++) {
                let data = cityDatas[i]
                this.cityNameMap[data.id] = data.name;
            }
            console.log("this.cityNameMap = ", this.cityNameMap);
        })

        //加载城市信息
        resources.load('Json/MapData/city', (err, data) => {
            console.log("err, data = ", err, data)
            if (err) {
                return
            }
            let cityList = data.json.citylist
            if (cityList) {
                for (let i = 0; i < cityList.length; i++) {
                    let city = cityList[i];
                    this.cityInfo[city.id] = city;
                }
            }
            console.log("this.cityInfo = ", this.cityInfo);
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

            this.isDrag = true
        })

        input.on(Input.EventType.MOUSE_WHEEL, (event: EventMouse) => {
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
                //找到该镇所属的城市
                let starName = 'Titan';
                let cityId = '';
                let landNum = 150 * 4;  // 4个镇构成一个一级城市, 2个镇构成一个二级城市
                let cityLevel = '1st class city';  //一級城市 First class city /1st class city ; 二級城市. Second class city/2nd class city
                let cityName = '';
                let city = this.cityInfo[townInfo[0].belong]
                console.log("city = ", city, townInfo)
                if (city) {
                    cityId = city.id
                    if (city.level == 1) {
                        cityLevel = '1st class city';
                    } else {
                        cityLevel = '2nd class city';
                        landNum = 150 * 2
                    }
                    //获取城市的名字
                    cityName = this.cityNameMap[cityId]
                    if (!cityName) {
                        cityName = cityId + ' City';  //二级城市没有名字，用cityId代替
                    }
                }

                //TODO: 显示城市tips
                console.log("starName, cityName, cityLevel, landNum = ", starName, cityName, cityLevel, landNum);
            }
            this.isDrag = false
        })
    }

    private static getPosYRangeV2: Vec2 = null
    private static getPosYRange(): Vec2 {
        if (!this.getPosYRangeV2) {
            this.getPosYRangeV2 = new Vec2(0, 0)
        }

        // 计算出最大最小Pos Y
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
        let lbY = this.getMapTownPosOutV3.y + this.halfOneMapHeight % this.oneMapHeight

        //坐标映射到坐上角为起始点
        lbY = this.oneMapHeight - lbY

        this.getMapTownPosOutV3.x = lbX
        this.getMapTownPosOutV3.y = lbY

        return this.getMapTownPosOutV3
    }

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
}
