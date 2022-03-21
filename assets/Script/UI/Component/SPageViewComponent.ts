
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, sys, System, UITransform, RichText, SpriteFrame, Texture2D, PageView } from 'cc';
import { MainGame } from '../../MainGame';
import { MapController } from '../../Map/MapController';
import { CUtil } from '../../Utils/CUtil';
import { UIController } from '../UIController';
import { NtfsController } from './NtfsController';
const { ccclass, property } = _decorator;

@ccclass('SPageViewComponent')
export class SPageViewComponent extends Component{

    private mPageView:PageView = null

    private lightTokenIds:number[] = []
    private tokenIdMapLandUrl = {}
    private tokenIdMapCityInfo = {}

    private  pageNodes:Node[] = []// Map<number, Node> = new Map()
    private xxCurrentPageIndex = 0
    private dataIndex = 4
    private handling = 0

    start () {
        
        let pageViewContent = find("view/content",this.node)
        this.mPageView = this.node.getComponent(PageView)
        this.pageNodes = this.mPageView.getPages()
        // resources.load("Prefab/nfts_bg", Prefab, (err, data) => {
        //     if (err) {
        //         console.log(err);
        //         return
        //     }
        //     if (this.lightTokenIds.length > 5) {
                
        //         for (let index = 0; index < this.lightTokenIds.length; index++) {
        //             const tokenId = this.lightTokenIds[index];
        //             let landTipsNode = instantiate(data);

        //             // this.nodeMap.set(index, landTipsNode)
        //             this.pageNodes.push(landTipsNode)

        //             // pageViewContent.addChild(landTipsNode)
        //             this.mPageView.addPage(landTipsNode)
        //             let landUrl = this.tokenIdMapLandUrl[tokenId]
        //             let cityInfoMap = this.tokenIdMapCityInfo[tokenId]
        //             landTipsNode.getComponent(NtfsController).updateDatas("TokenID:"+tokenId,landUrl,cityInfoMap)
        //             // this.mNtfsControllerNode.setPosition(34 * this.mapGroup.scale.x, -16 * this.mapGroup.scale.y)
        //             // this.mNtfsController.updateDatas("TokenID:"+tokenId,landUrl,cityInfoMap)
        //             if (index >= 4) {
        //                 break
        //             }
        //         }
        //         return
        //     }
        //     for (let index = 0; index < this.lightTokenIds.length; index++) {
        //         const tokenId = this.lightTokenIds[index];

        //         let landTipsNode = instantiate(data);
        //         // pageViewContent.addChild(landTipsNode)
        //         this.mPageView.addPage(landTipsNode)
        //         let landUrl = this.tokenIdMapLandUrl[tokenId]
        //         let cityInfoMap = this.tokenIdMapCityInfo[tokenId]
        //         landTipsNode.getComponent(NtfsController).updateDatas("TokenID:"+tokenId,landUrl,cityInfoMap)
        //         // this.mNtfsControllerNode.setPosition(34 * this.mapGroup.scale.x, -16 * this.mapGroup.scale.y)
        //         // this.mNtfsController.updateDatas("TokenID:"+tokenId,landUrl,cityInfoMap)
        //     }

        // })

        

    }

    update (deltaTime: number) {
        
        // let mCurrentPageIndex = this.node.getComponent(PageView).getCurrentPageIndex()
        // console.log('SPageViewComponent update! mCurrentPageIndex=',mCurrentPageIndex);
        // let currentPageIndex = this.mPageView.getCurrentPageIndex()
        // if (currentPageIndex == 2) {
        //    // this.mPageView.setCurrentPageIndex(1)
           
        // }
        this.handlePage()
    }

    callback(event: Event, customEventData: string){
        // 这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        // const node = event.target as unknown as Node;
        // const pageview = node.getComponent(PageView);
        console.log(customEventData); // foobar
        // this.handlePage();
    }

    private handlePage() {
        let currentPageIndex = this.mPageView.getCurrentPageIndex();
        console.log("currentPageIndex=", currentPageIndex);

        if (currentPageIndex > this.xxCurrentPageIndex) { //往左翻页
            this.dataIndex = this.dataIndex + 1;
        }
        if (currentPageIndex < this.xxCurrentPageIndex) { //往右翻页
            this.dataIndex = this.dataIndex - 1;
        }
        if (currentPageIndex == 1 && this.handling==0) {
            this.handling=1
            let firstNode = this.pageNodes.shift(); //删除第一个并返回
            this.mPageView.removePage(firstNode); //pageview移除第一个
            this.mPageView.addPage(firstNode); //重新添加
            this.pageNodes.push(firstNode); //重新放入数组
            this.mPageView.setCurrentPageIndex(0);
            this.handling = 0
            // const tokenId = this.lightTokenIds[this.dataIndex];
            // let landUrl = this.tokenIdMapLandUrl[tokenId];
            // let cityInfoMap = this.tokenIdMapCityInfo[tokenId];
            // firstNode.getComponent(NtfsController).updateDatas("TokenID:" + tokenId, landUrl, cityInfoMap);
        }
    }

    /**
     * name
     */
    public setData(lightTokenIds:any,tokenIdMapLandUrl:any,tokenIdMapCityInfo:any) {
        this.lightTokenIds = lightTokenIds
        this.tokenIdMapLandUrl = tokenIdMapLandUrl
        this.tokenIdMapCityInfo = tokenIdMapCityInfo
    }
}