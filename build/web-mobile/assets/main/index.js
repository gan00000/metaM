System.register("chunks:///_virtual/MapController.ts",["./_rollupPluginModLoBabelHelpers.js","cc","./CityInfoTipsComponent.ts","./MainGame.ts","./NtfsController.ts","./SLightComponent.ts","./LisaCityInfoTipsComponent.ts"],(function(o){"use strict";var t,n,e,a,i,s,l,h,r,c,d,g,p,u,f,T,m;return{setters:[function(o){t=o.defineProperty},function(o){n=o.cclegacy,e=o.find,a=o.TiledMap,i=o.resources,s=o.Input,l=o.Vec2,h=o.Prefab,r=o.instantiate,c=o.Vec3,d=o.UITransform,g=o.clamp},function(o){p=o.CityInfoTipsComponent},function(o){u=o.MainGame},function(o){f=o.NtfsController},function(o){T=o.SLightComponent},function(o){m=o.LisaCityInfoTipsComponent}],execute:function(){n._RF.push({},"07a9aKaoKBJIIFuQKuYKGUx","MapController",void 0);var y=o("MapController",function(){function o(){}return o.init=function(){var t=this;this.mapInput=u.find("MapInput"),this.mapGroup=e("MapGroup",this.mapInput),this.uIParent=u.find("UIParent"),this.basePosYRange=this.oneMapHeight*this.minScale,this.mapTiled=e("Map1/Tiled",this.mapGroup).getComponent(a);var n=this.mapInput;i.load("Json/MapData/map",(function(n,e){if(n)console.log(n);else{var a=e.json.townlist;console.log("townlist = ",a);for(var i=0;i<a.length;i++){var s=a[i],l="x_"+s.posx+"_y_"+s.posy,h=[];t.worldTowns[l]&&(h=t.worldTowns[l]),h[h.length]=s,t.worldTowns[l]=h,t.worldTownsWithTownId[s.id+""]=s,t.allWorldTownId.push(s.id+"");var r=[];t.belongTowns[s.belong]&&(r=t.belongTowns[s.belong]),r[r.length]=s,t.belongTowns[s.belong]=r}t.loadDataFinish=t.loadDataFinish+1,o.setLisaCityBg(),console.log("this.belongTowns =",t.belongTowns)}})),i.load("Json/MapData/cityname",(function(o,n){if(console.log("err, data = ",o,n),o)console.log(o);else for(var e=n.json.list,a=0;a<e.length;a++){var i=e[a];t.cityNameMap[i.id]=i.name}})),i.load("Json/MapData/city",(function(n,e){if(n)console.log(n);else{var a=e.json.citylist;if(a){for(var i=0;i<a.length;i++){var s=a[i];t.cityInfo[s.id]=s}t.loadDataFinish=t.loadDataFinish+1,o.setLisaCityBg()}}})),i.load("Json/MapData/landpos",(function(o,n){o?console.log(o):(t.saledLandData=n.json,i.load("Json/MapData/webmap_buchang_5016",(function(o,n){if(o)console.log(o);else{var e=n.json;if(e)for(var a in e)t.saledLandData[a]||(t.saledLandData[a]=e[a])}})))})),i.load("Json/lisaHomeData/lisaData",(function(n,e){if(n)console.log(n);else{for(var a=e.json,i=0;i<a.length;i++){var s=a[i];t.lisaData[s.cityId]=s}t.loadDataFinish=t.loadDataFinish+1,o.setLisaCityBg()}})),n.on(s.EventType.TOUCH_START,(function(o){var n=o.getAllTouches();2==n.length&&(t.lastTouchPos1&&t.lastTouchPos2||(t.lastTouchPos1=new l(0,0),t.lastTouchPos2=new l(0,0)),t.lastTouchPos1.x=n[0].getLocationX(),t.lastTouchPos1.y=n[0].getLocationY(),t.lastTouchPos2.x=n[1].getLocationX(),t.lastTouchPos2.y=n[1].getLocationY())})),n.on(s.EventType.TOUCH_MOVE,(function(o){var n=o.getAllTouches(),e=n.length;if(t.canMove()){if(1==e)t.move(o.getDeltaX(),o.getDeltaY());else if(2==e){var a=n[0].getLocationX(),i=n[0].getLocationY(),s=n[1].getLocationX(),l=n[1].getLocationY(),h=(Math.sqrt(Math.pow(a-s,2)+Math.pow(i-l,2))-Math.sqrt(Math.pow(t.lastTouchPos1.x-t.lastTouchPos2.x,2)+Math.pow(t.lastTouchPos1.y-t.lastTouchPos2.y,2)))/(screen.height/t.touchBaseHeight)*t.touchZoomRate;t.scale(h,(n[0].getUILocationX()+n[1].getUILocationX())/2,(n[0].getUILocationY()+n[1].getUILocationY())/2),t.lastTouchPos1.x=a,t.lastTouchPos1.y=i,t.lastTouchPos2.x=s,t.lastTouchPos2.y=l}(Math.abs(o.getDeltaX())>=1||Math.abs(o.getDeltaY())>=1)&&(t.isDrag=!0)}})),n.on(s.EventType.MOUSE_WHEEL,(function(o){t.canScale()&&t.scale(t.mouseWheelRate*o.getScrollY(),o.getUILocationX(),o.getUILocationY())})),n.on(s.EventType.TOUCH_END,(function(o){if(!t.isDrag){var n=o.getUILocation(),e=t.getMapTownPos(n.x,n.y);t.transferToTilePos(e),console.log("城镇左上角坐标:   ",o.getAllTouches().length,e);var a="x_"+e.x+"_y_"+e.y,i=t.worldTowns[a];if(!i)return void console.log("当前点击的不是城镇图标",e);t.getDataAndShowCityTips(i)}t.isDrag=!1}))},o.setLisaCityBg=function(){var o=this;if(3==this.loadDataFinish)for(var t in this.lisaData)Object.prototype.hasOwnProperty.call(this.lisaData,t)&&function(){var n=o.lisaData[t],e=o.belongTowns[n.cityId][0],a=o.cityInfo[n.cityId],s=o.getCityFirstTownPos(e.id,a);if(s){var l=a.level,c="Prefab/mapPinkNormalBgLevel"+l;i.load(c,h,(function(t,n){if(t)console.log(t);else{var e=r(n);1==l?(o.mapGroup.addChild(e),e.setPosition(s.x+38,s.y-38)):2==l&&(o.mapGroup.addChild(e),e.setPosition(s.x+19,s.y-19))}}))}}()},o.getPosYRange=function(){this.getPosYRangeV2||(this.getPosYRangeV2=new l(0,0));var o=(this.mapGroup.scale.x*this.oneMapHeight*3-this.basePosYRange)/2;return o<=0?(this.getPosYRangeV2.x=0,this.getPosYRangeV2.y=0):(this.getPosYRangeV2.x=o,this.getPosYRangeV2.y=-o),this.getPosYRangeV2},o.getMapTownPos=function(o,t){this.getMapTownPosInV3&&this.getMapTownPosOutV3||(this.getMapTownPosInV3=new c(0,0,0),this.getMapTownPosOutV3=new c(0,0,0)),this.getMapTownPosInV3.x=o,this.getMapTownPosInV3.y=t,this.mapGroup.getComponent(d).convertToNodeSpaceAR(this.getMapTownPosInV3,this.getMapTownPosOutV3);var n=(this.getMapTownPosOutV3.x+this.halfOneMapWidth)%this.oneMapWidth,e=this.getMapTownPosOutV3.y+this.halfOneMapHeight%this.oneMapHeight;return e=this.oneMapHeight-e,this.getMapTownPosOutV3.x=n,this.getMapTownPosOutV3.y=e,this.getMapTownPosOutV3},o.getPosXRange=function(){this.getPosXRangeV2||(this.getPosXRangeV2=new l(0,0));var o=this.mapGroup.scale.x*this.oneMapWidth-100;return this.getPosXRangeV2.x=o,this.getPosXRangeV2.y=-o,this.getPosXRangeV2},o.move=function(o,t){console.log("deltaX,deltaY",o,t);var n=this.mapGroup.position.x+o,e=this.mapGroup.position.y+t,a=this.getPosYRange();e=g(e,a.y,a.x);var i=this.getPosXRange();n>i.x?n-=i.x:n<i.y&&(n-=i.y),this.mapGroup.setPosition(n,e,0)},o.scale=function(o,t,n){this.scaleInV3&&this.scaleOutV3||(this.scaleInV3=new c(0,0,0),this.scaleOutV3=new c(0,0,0)),this.scaleInV3.x=t,this.scaleInV3.y=n,this.mapGroup.getComponent(d).convertToNodeSpaceAR(this.scaleInV3,this.scaleOutV3);var e=this.mapGroup.scale.x;o=g(o+=e,this.minScale,this.maxScale),this.mapGroup.setScale(o,o,o);var a=this.mapGroup.scale.x-e,i=0,s=0;this.scaleOutV3.x<0?i=1:this.scaleOutV3.x>0&&(i=-1),this.scaleOutV3.y<0?s=1:this.scaleOutV3.y>0&&(s=-1),this.move(i*a*this.halfOneMapWidth*Math.abs(this.scaleOutV3.x/this.halfOneMapWidth),s*a*this.halfOneMapHeight*Math.abs(this.scaleOutV3.y/this.halfOneMapHeight))},o.transferToTilePos=function(o){var t=this.mapTiled.getTileSize();o.x=Math.floor(o.x/t.x),o.y=Math.floor(o.y/t.y)},o.getDataAndShowCityTips=function(t){var n=this,e="Titan",a="",s=600,l="1st class city",c="",d=this.cityInfo[t[0].belong],g=t[0].id;if(console.log("city = ",d,t),d){a=d.id,1==d.level?l="1st class city":(l="2nd class city",s=300),(c=this.cityNameMap[a])||(c=a+" City"),o.resetCityInfoState();var u=d.level,f=o.getCityFirstTownPos(g,d),T=this.lisaData[a+""];T?i.load("Prefab/LisaCityTips",h,(function(o,t){o?console.log(o):(n.mCityInfo=r(t),n.mCityInfo.getComponent(m).updateData("",e,c,s+"",l,d.level,T.tokenID,T.landLevel,T.townName,T.landNo,T.landPosx,T.landPosy),n.uIParent.addChild(n.mCityInfo),1==u?i.load("Prefab/mapPinkClickBgLevel1",h,(function(o,t){o?console.log(o):(n.mClickTownNode=r(t),n.mapGroup.addChild(n.mClickTownNode),n.mClickTownNode.setPosition(f.x+38,f.y-38))})):i.load("Prefab/mapPinkClickBgLevel2",h,(function(o,t){o?console.log(o):(n.mClickTownNode=r(t),n.mapGroup.addChild(n.mClickTownNode),n.mClickTownNode.setPosition(f.x+19,f.y-19))})))})):i.load("Prefab/CityInfo",h,(function(o,t){o?console.log(o):(n.mCityInfo=r(t),n.mCityInfo.getComponent(p).updateData("",e,c,s+"",l,d.level),n.uIParent.addChild(n.mCityInfo),1==u?i.load("Prefab/mapYellowClickBg",h,(function(o,t){o?console.log(o):(n.mClickTownNode=r(t),n.mapGroup.addChild(n.mClickTownNode),n.mClickTownNode.setPosition(f.x+38,f.y-38))})):i.load("Prefab/mapWhiteClickBg",h,(function(o,t){o?console.log(o):(n.mClickTownNode=r(t),n.mapGroup.addChild(n.mClickTownNode),n.mClickTownNode.setPosition(f.x+19,f.y-19))})))}))}},o.resetCityInfoState=function(){this.mCityInfo&&(this.mCityInfo.removeFromParent(),this.mCityInfo.destroy(),this.mCityInfo=null),this.mClickTownNode&&(this.mClickTownNode.removeFromParent(),this.mClickTownNode.destroy(),this.mClickTownNode=null)},o.getDataAndShowLandTips=function(o,t,n){var e=this,a=this.saledLandData[o+""];if(a){var s=a.townid;this.townLands[s]?this.showLandTips(o,a.townid,a.landx,a.landy,t,n):i.load("Json/Land/"+s,(function(i,l){if(i)console.log("err = ",i);else{for(var h={},r=l.json,c=0;c<r.length;c++){var d=r[c];h["x_"+d.posx+"_y_"+d.posy]=d}e.townLands[s]=h,e.showLandTips(o,a.townid,a.landx,a.landy,t,n)}}))}else console.log("not found the land by tokenId: ",o)},o.showLandTips=function(o,t,n,e,a,s){var l=this,c=this.townLands[t];if(c){var d=c["x_"+n+"_y_"+e];if(d){d.cityid,d.townid;var g=this.cityNameMap[d.cityid];g&&g+" , "+d.townid+"Town",g||(g=d.cityid+" City");var p="2",u=this.cityInfo[d.cityid];if(a)this.createLightNode(o,t,u);else{u&&(p=1==u.level?"1":"2");var T="B";1==d.level?T="S":2==d.level&&(T="A");var m=d.id.toString(16),y=(m=parseInt(m.substring(m.length-4),16))%150;0==y&&(y=150);var w="X:"+d.posx+"/Y:"+d.posy,P="https://static-download2.metacitym.com"+d.imageurl;console.log("hello land:townId,cityid,cityName,cityLevel,landId,landLevel,landPos,landUrl=",t,d.cityid,g,p,y,T,w,P);var C=new Map([["PLANET","Titan"],["CITY LEVEL",p],["LAND LEVEL",T],["CITY",g],["TOWN",t+"Town"],["LAND NO",y+""],["LAND POSX",n+""],["LAND POSY",e+""],["LAND SIZE","40*30"],["LAND NAME",""]]);if(s)return void s(o,P,C);var v=this.lightPosWithTokenId[o];console.log("lightUIPos Position x,y=",v.x,v.y),v&&(this.mNtfsControllerNode&&(this.mNtfsControllerNode.removeFromParent(),this.mNtfsControllerNode.destroy(),this.mNtfsControllerNode=null),i.load("Prefab/nfts_bg",h,(function(t,n){t?console.log(t):(l.mNtfsControllerNode=r(n),l.mNtfsControllerNode.getComponent(f).updateDatas(o+"",P,C),l.uIParent.addChild(l.mNtfsControllerNode))})))}}else console.log("not found the town lands ",t,n,e)}else console.log("not found the town lands ",t)},o.createLightNode=function(t,n,e){var a=this;if(this.worldTownsWithTownId[n]){var s=function(){var s=e.level,l=o.getCityFirstTownPos(n,e);a.lightPosWithTokenId[t]=l;var c=a.lightPosWithLightNode[l.x+"_"+l.y];if(c)return c.getComponent(T).addTokenId(t),{v:void 0};for(var d=function(o){var n=l.x+o*a.oneMapWidth,e=l.y,c="Prefab/slight"+s;i.load(c,h,(function(o,i){if(o)console.log(o);else{var l=r(i);a.mapGroup.addChild(l),1==s?l.setPosition(n+38,e-38):l.setPosition(n+19,e-19),a.lightPosWithLightNode[n+"_"+e]=l,console.log("add light2 = "+t),l.getComponent(T).addTokenId(t)}}))},g=-1;g<=1;g++)d(g)}();if("object"==typeof s)return s.v}else console.log("找不到townInfo townId="+n)},o.getCityFirstTownPos=function(o,t){if(null==o||null==t)return null;var n=this.worldTownsWithTownId[o],e=n.posx,a=n.posy;t.level;if(1==t.level){var i=this.belongTowns[n.belong][0];i&&(e=i.posx,a=i.posy)}return this.getUIPosByTownPos(e,a)},o.testCreateAllLight=function(){this.worldTownsWithTownId},o.getUIPosByTownPos=function(o,t){var n=new c(0,0,0),e=this.mapTiled.getTileSize(),a=e.x*o,i=e.y*t;return i=this.oneMapHeight-i,n.x=a-this.halfOneMapWidth,n.y=i-this.halfOneMapHeight,n},o.canMove=function(){return!(this.mNtfsControllerNode||this.mCityInfo||!this.mapCanMove)},o.canScale=function(){return!(this.mNtfsControllerNode||this.mCityInfo||!this.mapCanScale)},o}());t(y,"mapInput",null),t(y,"mapGroup",null),t(y,"uIParent",null),t(y,"mapTiled",null),t(y,"oneMapWidth",6498),t(y,"oneMapHeight",3724),t(y,"halfOneMapWidth",3249),t(y,"halfOneMapHeight",1862),t(y,"mapCount",3),t(y,"minScale",.2),t(y,"maxScale",1.8),t(y,"basePosYRange",0),t(y,"mouseWheelRate",1e-4),t(y,"touchZoomRate",.0012),t(y,"touchBaseHeight",1080),t(y,"lastTouchPos1",null),t(y,"lastTouchPos2",null),t(y,"isDrag",!1),t(y,"worldTowns",{}),t(y,"worldTownsWithTownId",{}),t(y,"allWorldTownId",[]),t(y,"belongTowns",{}),t(y,"cityInfo",{}),t(y,"cityNameMap",{}),t(y,"saledLandData",{}),t(y,"townLands",{}),t(y,"lisaData",{}),t(y,"lightPosNode",{}),t(y,"lightPosWithTokenId",{}),t(y,"lightPosWithLightNode",{}),t(y,"mCityInfo",null),t(y,"mClickTownNode",null),t(y,"mNtfsControllerNode",null),t(y,"loadDataFinish",0),t(y,"mapCanMove",!0),t(y,"mapCanScale",!0),t(y,"getPosYRangeV2",null),t(y,"getMapTownPosInV3",null),t(y,"getMapTownPosOutV3",null),t(y,"getPosXRangeV2",null),t(y,"scaleInV3",null),t(y,"scaleOutV3",null),n._RF.pop()}}}));

System.register("chunks:///_virtual/SPageViewComponent.ts",["./_rollupPluginModLoBabelHelpers.js","cc"],(function(e){"use strict";var t,n,a,i,o,s,r,d;return{setters:[function(e){t=e.inheritsLoose,n=e.defineProperty,a=e.assertThisInitialized},function(e){i=e.cclegacy,o=e._decorator,s=e.find,r=e.PageView,d=e.Component}],execute:function(){var g;i._RF.push({},"14d99EhWsRJfLc7wJbEuXYv","SPageViewComponent",void 0);var h=o.ccclass;o.property,e("SPageViewComponent",h("SPageViewComponent")(g=function(e){function i(){for(var t,i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return t=e.call.apply(e,[this].concat(o))||this,n(a(t),"mPageView",null),n(a(t),"lightTokenIds",[]),n(a(t),"tokenIdMapLandUrl",{}),n(a(t),"tokenIdMapCityInfo",{}),n(a(t),"pageNodes",[]),n(a(t),"xxCurrentPageIndex",0),n(a(t),"dataIndex",4),n(a(t),"handling",0),t}t(i,e);var o=i.prototype;return o.start=function(){s("view/content",this.node);this.mPageView=this.node.getComponent(r),this.pageNodes=this.mPageView.getPages()},o.update=function(e){this.handlePage()},o.callback=function(e,t){console.log(t)},o.handlePage=function(){var e=this.mPageView.getCurrentPageIndex();if(console.log("currentPageIndex=",e),e>this.xxCurrentPageIndex&&(this.dataIndex=this.dataIndex+1),e<this.xxCurrentPageIndex&&(this.dataIndex=this.dataIndex-1),1==e&&0==this.handling){this.handling=1;var t=this.pageNodes.shift();this.mPageView.removePage(t),this.mPageView.addPage(t),this.pageNodes.push(t),this.mPageView.setCurrentPageIndex(0),this.handling=0}},o.setData=function(e,t,n){this.lightTokenIds=e,this.tokenIdMapLandUrl=t,this.tokenIdMapCityInfo=n},i}(d))||g);i._RF.pop()}}}));

System.register("chunks:///_virtual/TokenIdModel.ts",["./_rollupPluginModLoBabelHelpers.js","cc"],(function(t){"use strict";var e,n,o;return{setters:[function(t){e=t.defineProperty},function(t){n=t.cclegacy,o=t._decorator}],execute:function(){var c;n._RF.push({},"1b7cd1lQ15DPZdl21IAA+kY","TokenIdModel",void 0);var s=o.ccclass;o.property,t("TokenIdModel",s("TokenIdModel")(c=function(){e(this,"ownerNfts",[]),e(this,"pageKey",""),e(this,"totalCount",0),e(this,"blockHash","")})||c),t("OwnerNft",(function(){e(this,"contract",null),e(this,"id",null),e(this,"balance","")})),t("Contract",(function(){e(this,"address","")})),t("Id",(function(){e(this,"tokenId","")}));n._RF.pop()}}}));

System.register("chunks:///_virtual/UIController.ts",["./_rollupPluginModLoBabelHelpers.js","cc","./MainGame.ts"],(function(e){"use strict";var t,n,r,a,i,o,c;return{setters:[function(e){t=e.defineProperty},function(e){n=e.cclegacy,r=e._decorator,a=e.resources,i=e.Prefab,o=e.instantiate},function(e){c=e.MainGame}],execute:function(){var l,s,u;n._RF.push({},"3b5f6XUzCBF87UiVZLCmNK4","UIController",void 0);var p=r.ccclass;r.property,e("UIController",p("UIController")((u=s=function(){function e(){}return e.init=function(){e.parent=c.find("UIParent")},e.create=function(e,t,n){var r=this,c=null;this.map.has(e)?(c=this.map.get(e),this.map.delete(e),n(c),c.active=!0):a.load("Prefab/"+e,i,(function(e,a){e?console.log(e):(c=o(a),t&&r.parent.addChild(c),n(c))}))},e.recycle=function(e){e.active=!1,this.map.set(e.name,e)},e}(),t(s,"parent",null),t(s,"map",new Map),l=u))||l);n._RF.pop()}}}));

System.register("chunks:///_virtual/CUtil.ts",["cc"],(function(e){"use strict";var t,n;return{setters:[function(e){t=e.cclegacy,n=e._decorator}],execute:function(){var o;t._RF.push({},"51648wVQwlFzoh7MuSIErH4","CUtil",void 0);var s=n.ccclass;n.property,e("CUtil",s("CUtil")(o=function(){function e(){}return e.getLocalString=function(e){return e},e.getQueryVariable=function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substring(1).match(t);return null!=n?decodeURI(n[2]):null},e.httpPequest=function(e,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4==n.readyState&&n.status>=200&&n.status<400){var e=n.responseText;t(e)}else t(null)},n.open("GET",e,!0),n.withCredentials=!0,n.send()},e.loadRequest=function(e,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4==n.readyState&&n.status>=200&&n.status<400){var e=n.response;return console.log("loadRequest response:"+e),void t(e)}t(null)},n.open("GET",e,!0),n.withCredentials=!0,n.send()},e.httpPostPequest=function(e,t){var n=new XMLHttpRequest;n.timeout=5e3,n.open("POST",e,!0),n.setRequestHeader("Authorization","true"),n.onerror=function(e){console.log("onerror")},n.onreadystatechange=function(){4===n.readyState&&n.status>=200&&n.status<300?(console.log("success"),console.log(n.responseText)):console.log("fail")},n.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");n.send("jQuery18206190064924153293_1646388734858&owner=0x2f2e99bcbe39D8407552E821e7F4F0F9592Dfcab&contractAddress=0x82016d4ad050ef4784e282b82a746d3e01df23bf&_=1646388740791")},e.hex2Number=function(e){return void 0===e&&(e=""),0===e.indexOf("0x")&&(e=e.slice(2)),parseInt("0x"+e,16)},e}())||o);t._RF.pop()}}}));

System.register("chunks:///_virtual/LandTipsNode2Component.ts",["./_rollupPluginModLoBabelHelpers.js","cc","./NtfsController.ts","./MapController.ts"],(function(t){"use strict";var n,e,o,i,s,a,r,l,h,c,d,p;return{setters:[function(t){n=t.inheritsLoose,e=t.defineProperty,o=t.assertThisInitialized},function(t){i=t.cclegacy,s=t._decorator,a=t.find,r=t.Button,l=t.Sprite,h=t.Color,c=t.Component},function(t){d=t.NtfsController},function(t){p=t.MapController}],execute:function(){var u;i._RF.push({},"550a6iIGkpCaoRV/fQjOrY5","LandTipsNode2Component",void 0);var C=s.ccclass;s.property,t("LandTipsNode2Component",C("LandTipsNode2Component")(u=function(t){function i(){for(var n,i=arguments.length,s=new Array(i),a=0;a<i;a++)s[a]=arguments[a];return n=t.call.apply(t,[this].concat(s))||this,e(o(n),"previous",null),e(o(n),"next",null),e(o(n),"closeBtn",null),e(o(n),"lightTokenIds",null),e(o(n),"landShowInfoNode",null),e(o(n),"index",0),n}n(i,t);var s=i.prototype;return s.start=function(){var t=this;if(this.previous=a("previous",this.node),this.next=a("next",this.node),this.closeBtn=a("btn_close",this.node),a("nfts_bg/closeButton",this.node).active=!1,this.landShowInfoNode=a("nfts_bg",this.node),this.closeBtn.on(r.EventType.CLICK,(function(){p.mapCanMove=!0,p.mapCanScale=!0,t.node.removeFromParent(),t.node.destroy()})),this.previous.on(r.EventType.CLICK,(function(){t.index<0||(t.index=t.index-1,t.showData(t.lightTokenIds[t.index]),t.checkBtnStatue())})),this.next.on(r.EventType.CLICK,(function(){t.index>t.lightTokenIds.length-1||(t.index=t.index+1,t.showData(t.lightTokenIds[t.index]),t.checkBtnStatue())})),p.mapCanMove=!1,p.mapCanScale=!1,this.lightTokenIds.length>0){var n=this.lightTokenIds[0];p.getDataAndShowLandTips(n,!1,(function(n,e,o){t.showData(n)}))}this.checkBtnStatue()},s.setData=function(t){this.lightTokenIds=t},s.showData=function(t){var n=this;p.getDataAndShowLandTips(t,!1,(function(t,e,o){n.landShowInfoNode.getComponent(d).updateDatas(t+"",e,o)}))},s.checkBtnStatue=function(){0==this.index?(this.previous.getComponent(l).color=h.GRAY,this.previous.getComponent(r).interactable=!1):(this.previous.getComponent(l).color=h.WHITE,this.previous.getComponent(r).interactable=!0),this.index>=this.lightTokenIds.length-1?(this.next.getComponent(l).color=h.GRAY,this.next.getComponent(r).interactable=!1):(this.next.getComponent(l).color=h.WHITE,this.next.getComponent(r).interactable=!0)},i}(c))||u);i._RF.pop()}}}));

System.register("chunks:///_virtual/NtfsController.ts",["./_rollupPluginModLoBabelHelpers.js","cc","./MapController.ts"],(function(e){"use strict";var t,o,n,r,i,l,s,a,d,c,u,f,p,h,g,m,N,v,C;return{setters:[function(e){t=e.inheritsLoose,o=e.defineProperty,n=e.assertThisInitialized,r=e.createForOfIteratorHelperLoose},function(e){i=e.cclegacy,l=e._decorator,s=e.find,a=e.Node,d=e.Label,c=e.Sprite,u=e.Button,f=e.resources,p=e.Prefab,h=e.instantiate,g=e.assetManager,m=e.SpriteFrame,N=e.Texture2D,v=e.Component},function(e){C=e.MapController}],execute:function(){var b;i._RF.push({},"58db7uTBt5Pr5RYW2ZPCYKZ","NtfsController",void 0);var S=l.ccclass;l.property,e("NtfsController",S("NtfsController")(b=function(e){function i(){for(var t,r=arguments.length,i=new Array(r),l=0;l<r;l++)i[l]=arguments[l];return t=e.call.apply(e,[this].concat(i))||this,o(n(t),"titleLabe",null),o(n(t),"proScrollView_contentNode",null),o(n(t),"proScrollView",null),o(n(t),"ntfsNode",null),o(n(t),"imgSprite",null),o(n(t),"closeNode",null),o(n(t),"bgNode",null),o(n(t),"tokenId",null),o(n(t),"imageUrl",null),o(n(t),"landDatas",null),t}t(i,e);var l=i.prototype;return l.start=function(){var e=this;this.ntfsNode=this.node;var t=s("TestButton",this.ntfsNode);this.bgNode=s("bgNode",this.ntfsNode),this.bgNode.on(a.EventType.TOUCH_MOVE,(function(){}));var o=s("titleLabel",this.ntfsNode);this.titleLabe=o.getComponent(d),this.closeNode=s("closeButton",this.ntfsNode),this.imgSprite=s("nfts_img_Sprite",this.ntfsNode).getComponent(c),this.proScrollView=s("proScrollView",this.ntfsNode),this.proScrollView_contentNode=s("view/content",this.proScrollView),t.on(u.EventType.CLICK,(function(){f.load("Prefab/proItemNodePrefab",p,(function(t,o){t&&console.log(t);var n=h(o);e.proScrollView_contentNode.addChild(n)}))}),this),this.closeNode.on(u.EventType.CLICK,(function(){e.node&&(e.node.removeFromParent(),e.node.destroy(),C.mNtfsControllerNode=null)}),this),this.updateDatas(this.tokenId,this.imageUrl,this.landDatas)},l.updateDatas=function(e,t,o){var n=this;if(this.tokenId=e,this.imageUrl=t,this.landDatas=o,this.ntfsNode){this.titleLabe.string="TokenID:"+e;var i=this;console.log("loadRemote imageUrl=",t),g.loadRemote(t,{xhrWithCredentials:!0},(function(e,t){if(e)console.log(e);else if(t){var o=new m,n=new N;n.image=t,o.texture=n,o&&i&&i.imgSprite&&i.imgSprite.spriteFrame&&(i.imgSprite.spriteFrame=o)}}));for(var l,a=function(){var e=l.value,t=e[0],o=e[1];f.load("Prefab/proItemNodePrefab",p,(function(e,r){if(e)console.log(e);else{var i=h(r),l=s("itemNameLabel",i).getComponent(d),a=s("itemValueLabel",i).getComponent(d);l.string=t,a.string=o,n.proScrollView_contentNode.addChild(i)}}))},c=r(o);!(l=c()).done;)a()}},i}(v))||b);i._RF.pop()}}}));

System.register("chunks:///_virtual/SLightComponent.ts",["./_rollupPluginModLoBabelHelpers.js","cc","./MainGame.ts","./LandTipsNode2Component.ts"],(function(n){"use strict";var t,o,e,i,s,a,r,c,l,p,d,u;return{setters:[function(n){t=n.inheritsLoose,o=n.defineProperty,e=n.assertThisInitialized},function(n){i=n.cclegacy,s=n._decorator,a=n.Button,r=n.resources,c=n.Prefab,l=n.instantiate,p=n.Component},function(n){d=n.MainGame},function(n){u=n.LandTipsNode2Component}],execute:function(){var h;i._RF.push({},"6be49OU6OVJD7Szbc8b5Jwc","SLightComponent",void 0);var g=s.ccclass;s.property,n("SLightComponent",g("SLightComponent")(h=function(n){function i(){for(var t,i=arguments.length,s=new Array(i),a=0;a<i;a++)s[a]=arguments[a];return t=n.call.apply(n,[this].concat(s))||this,o(e(t),"lightTokenIds",[]),o(e(t),"tokenIdMapLandUrl",{}),o(e(t),"tokenIdMapCityInfo",{}),o(e(t),"parent",null),t}t(i,n);var s=i.prototype;return s.start=function(){var n=this;this.parent=d.find("UIParent"),this.node.on(a.EventType.CLICK,(function(){console.log("slight click"),n.lightTokenIds.length>0&&(console.log("lightTokenIds = ",n.lightTokenIds),r.load("Prefab/LandTipsNode2",c,(function(t,o){t&&console.log(t);var e=l(o);e.getComponent(u).setData(n.lightTokenIds),n.parent.addChild(e)})))}))},s.addTokenId=function(n){this.lightTokenIds.push(n)},i}(p))||h);i._RF.pop()}}}));

System.register("chunks:///_virtual/LisaCityInfoTipsComponent.ts",["./_rollupPluginModLoBabelHelpers.js","cc","./CUtil.ts","./MapController.ts"],(function(t){"use strict";var e,o,n,i,r,a,l,s,c,u,p,f,h,C,y,m,d;return{setters:[function(t){e=t.inheritsLoose,o=t.defineProperty,n=t.assertThisInitialized,i=t.createForOfIteratorHelperLoose},function(t){r=t.cclegacy,a=t._decorator,l=t.find,s=t.Button,c=t.resources,u=t.Prefab,p=t.instantiate,f=t.RichText,h=t.SpriteFrame,C=t.Sprite,y=t.Component},function(t){m=t.CUtil},function(t){d=t.MapController}],execute:function(){var L;r._RF.push({},"6e845D3U/tNO7X1uUUPrS6/","LisaCityInfoTipsComponent",void 0);var g=a.ccclass;a.property,t("LisaCityInfoTipsComponent",g("LisaCityInfoTipsComponent")(L=function(t){function r(){for(var e,i=arguments.length,r=new Array(i),a=0;a<i;a++)r[a]=arguments[a];return e=t.call.apply(t,[this].concat(r))||this,o(n(e),"cityHomeScrollViewContent",null),o(n(e),"closeButton",null),o(n(e),"homeCityBg",null),o(n(e),"infoData",null),o(n(e),"cityLevel",0),e}e(r,t);var a=r.prototype;return a.start=function(){var t=this;this.homeCityBg=l("homeCityBg",this.node),this.cityHomeScrollViewContent=l("cityHomeScrollView/view/content",this.node),this.closeButton=l("btn_close",this.node),this.closeButton.on(s.EventType.CLICK,(function(){t.node.removeFromParent(),t.node.destroy(),d.resetCityInfoState()})),this.infoData&&(c.load("Prefab/itemRichText",u,(function(e,o){if(e)console.log(e);else for(var n,r=i(t.infoData);!(n=r()).done;){var a=n.value,s=a[0],c=a[1],u=p(o);l("xxRichText",u).getComponent(f).string=t.getRichString(s+": ",c),t.cityHomeScrollViewContent.addChild(u)}})),2==this.cityLevel&&c.load("Texture/CityLevel_2/spriteFrame",h,(function(e,o){e?console.log(e):t.homeCityBg.getComponent(C).spriteFrame=o})))},a.updateData=function(t,e,o,n,i,r,a,l,s,c,u,p){console.log("updateData"),this.cityLevel=r,this.infoData=new Map([[m.getLocalString("Land_Name"),"Lisa‘s Home"],["Planet",e],["City",o],["TotalLand",n],["City Grade",i],["Token_ID",a],["LAND_LEVEL",l],["TOWN",s],["LAND NO",c+""],["LAND POSX",u+""],["LAND POSY",p+""]])},a.getRichString=function(t,e){return"<color=#00f1e8>"+t+"</color><color=#f0b432>"+e+"</color>"},r}(y))||L);r._RF.pop()}}}));

System.register("chunks:///_virtual/CityInfoTipsComponent.ts",["./_rollupPluginModLoBabelHelpers.js","cc","./MapController.ts"],(function(t){"use strict";var e,n,i,o,r,l,a,s,c,h,u,p,y;return{setters:[function(t){e=t.inheritsLoose,n=t.defineProperty,i=t.assertThisInitialized},function(t){o=t.cclegacy,r=t._decorator,l=t.find,a=t.Button,s=t.RichText,c=t.resources,h=t.SpriteFrame,u=t.Sprite,p=t.Component},function(t){y=t.MapController}],execute:function(){var d;o._RF.push({},"9fdefjZUENB74GLtfl0NkNU","CityInfoTipsComponent",void 0);var g=r.ccclass;r.property,t("CityInfoTipsComponent",g("CityInfoTipsComponent")(d=function(t){function o(){for(var e,o=arguments.length,r=new Array(o),l=0;l<o;l++)r[l]=arguments[l];return e=t.call.apply(t,[this].concat(r))||this,n(i(e),"landBg",null),n(i(e),"planetText",null),n(i(e),"cityText",null),n(i(e),"totalLandText",null),n(i(e),"cityGradeText",null),n(i(e),"closeButton",null),n(i(e),"cityBgNode",null),n(i(e),"mParent",null),n(i(e),"url",null),n(i(e),"planet",null),n(i(e),"cityName",null),n(i(e),"totalLand",null),n(i(e),"cityGrade",null),n(i(e),"cityLevel",0),e}e(o,t);var r=o.prototype;return r.start=function(){var t=this;this.mParent=this.node,this.landBg=l("land_bg",this.mParent),this.planetText=l("city_info/PlanetRichText",this.mParent),this.cityText=l("city_info/CityRichText",this.mParent),this.totalLandText=l("city_info/TotalLandRichText",this.mParent),this.cityGradeText=l("city_info/CityGradeRichText",this.mParent),this.closeButton=l("btn_close",this.mParent),this.cityBgNode=l("land_bg/cityBg",this.mParent),this.closeButton.on(a.EventType.CLICK,(function(){t.mParent.removeFromParent(),t.mParent.destroy(),y.resetCityInfoState()})),console.log("CityInfoTipsComponent start"),this.planetText.getComponent(s).string=this.getRichString("Planet: ",this.planet),this.cityText.getComponent(s).string=this.getRichString("City: ",this.cityName),this.totalLandText.getComponent(s).string=this.getRichString("TotalLand: ",this.totalLand),this.cityGradeText.getComponent(s).string=this.getRichString("City Grade: ",this.cityGrade),2==this.cityLevel&&c.load("Texture/CityLevel_2/spriteFrame",h,(function(e,n){e?console.log(e):t.cityBgNode.getComponent(u).spriteFrame=n}))},r.updateData=function(t,e,n,i,o,r){console.log("updateData"),this.url=t,this.planet=e,this.cityName=n,this.totalLand=i,this.cityGrade=o,this.cityLevel=r},r.getRichString=function(t,e){return"<color=#00f1e8>"+t+"</color><color=#f0b432>"+e+"</color>"},o}(p))||d);o._RF.pop()}}}));

System.register("chunks:///_virtual/LanguageComponent.ts",["./_rollupPluginModLoBabelHelpers.js","cc"],(function(e){"use strict";var n,a,t,o,g,l,i,u;return{setters:[function(e){n=e.inheritsLoose,a=e.defineProperty,t=e.assertThisInitialized},function(e){o=e.cclegacy,g=e._decorator,l=e.find,i=e.Button,u=e.Component}],execute:function(){var s;o._RF.push({},"b82b4M4t+9He5NGuP9cXEIj","LanguageComponent",void 0);var d=g.ccclass;g.property,e("LanguageComponent",d("LanguageComponent")(s=function(e){function o(){for(var n,o=arguments.length,g=new Array(o),l=0;l<o;l++)g[l]=arguments[l];return n=e.call.apply(e,[this].concat(g))||this,a(t(n),"changeLanguageNode",null),a(t(n),"languageContentNode",null),a(t(n),"languageBgNode",null),a(t(n),"zhLabelNode",null),a(t(n),"enLabelNode",null),a(t(n),"krLabelNode",null),a(t(n),"jpLabelNode",null),a(t(n),"taiLabelNode",null),n}return n(o,e),o.prototype.start=function(){var e=this;this.changeLanguageNode=l("language_select",this.node),this.languageBgNode=l("language_bg",this.node),this.languageContentNode=l("language_bg/languageScrollView/view/content",this.node),this.zhLabelNode=l("zhLabel",this.languageContentNode),this.enLabelNode=l("enLabel",this.languageContentNode),this.krLabelNode=l("krLabel",this.languageContentNode),this.jpLabelNode=l("jpLabel",this.languageContentNode),this.taiLabelNode=l("taiLabel",this.languageContentNode),this.changeLanguageNode.on(i.EventType.CLICK,(function(){e.languageBgNode.active?e.languageBgNode.active=!1:e.languageBgNode.active=!0})),this.zhLabelNode.on(i.EventType.CLICK,(function(){e.languageBgNode.active=!1})),this.enLabelNode.on(i.EventType.CLICK,(function(){e.languageBgNode.active=!1})),this.krLabelNode.on(i.EventType.CLICK,(function(){e.languageBgNode.active=!1})),this.taiLabelNode.on(i.EventType.CLICK,(function(){e.languageBgNode.active=!1})),this.jpLabelNode.on(i.EventType.CLICK,(function(){e.languageBgNode.active=!1}))},o}(u))||s);o._RF.pop()}}}));

System.register("chunks:///_virtual/LoginTokenController.ts",["./_rollupPluginModLoBabelHelpers.js","cc","./CUtil.ts","./MainGame.ts","./MapController.ts"],(function(t){"use strict";var e,n,o,i,r,s,a,l,c,d,u,h,f,p,k;return{setters:[function(t){e=t.defineProperty,n=t.asyncToGenerator},function(t){o=t.cclegacy,i=t._decorator,r=t.find,s=t.Button,a=t.sys,l=t.resources,c=t.Prefab,d=t.instantiate,u=t.UITransform,h=t.Label},function(t){f=t.CUtil},function(t){p=t.MainGame},function(t){k=t.MapController}],execute:function(){var m,g,I;o._RF.push({},"c8f9eDQ5mdNvL1U+Ccejn1x","LoginTokenController",void 0);var v=i.ccclass;i.property,t("LoginTokenController",v("LoginTokenController")((I=g=function(){function t(){}return t.getNftsNode=function(){return this.loginTokenInfoNode},t.init=function(){var t=this;this.mParent=p.find("UIParent"),this.loginTokenInfoNode=r("loginTokenInfo",this.mParent),this.buylandBtn=r("buyland",this.loginTokenInfoNode),this.ntfStartBtn=r("nft_start",this.loginTokenInfoNode),this.pursrBtn=r("purseButton",this.loginTokenInfoNode),this.tokenIdScrollView=r("tokenScrollView",this.loginTokenInfoNode),this.tokenIdScrollViewContentNode=r("view/content",this.tokenIdScrollView),this.tipsLabelNode=r("noDataTips",this.tokenIdScrollView),this.tipsLabelNode.active=!1,this.tipsLabelNode.on(s.EventType.CLICK,(function(){a.openURL("https://metacitym.com/")}),this),this.buylandBtn.on(s.EventType.CLICK,(function(){a.openURL("https://metacitym.com/")}),this),this.ntfStartBtn.on(s.EventType.CLICK,(function(){p.isLogin()?t.tokenIdScrollView.active?t.tokenIdScrollView.active=!1:t.tokenIdScrollView.active=!0:location.href="https://metacitym.com/login/index.html?redirect=https://metacitym.com/map/"}),this),this.pursrBtn.on(s.EventType.CLICK,(function(){console.log("pursebtn click"),location.href="https://metacitym.com/login/index.html?redirect=https://metacitym.com/map/"}),this),p.isLogin()?(this.tokenIdScrollView.active=!0,this.pursrBtn.getComponent(s).interactable=!1,this.requestTokenIds(p.address,null,1)):(this.tokenIdScrollView.active=!1,this.pursrBtn.getComponent(s).interactable=!0)},t.prototype.addToParent=function(t){},t.createTokenIdView=function(){var e=this;this.tokenIds.length>0?(this.tipsLabelNode.active=!1,l.load("Prefab/TokenIdLabel",c,(function(n,o){n&&console.log(n),e.tokenIdScrollViewContentNode.removeAllChildren();var i=(d(o).getComponent(u).height+6)*(e.tokenIds.length/2+1)+8;e.tokenIdScrollViewContentNode.getComponent(u).height=i,t.refreshTokenUi(o)}))):this.tipsLabelNode.active=!0},t.refreshTokenUi=function(){var t=n(regeneratorRuntime.mark((function t(e){var n,o,i;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=0;case 1:if(!(n<this.tokenIds.length)){t.next=18;break}if(o=this.tokenIds[n],(i=d(e)).getComponent(h).string=o+"",i.getComponent(s).clickEvents[0].customEventData=o+"",this.tokenIdScrollViewContentNode.addChild(i),k.getDataAndShowLandTips(o,!0,null),0!=n&&1!=n){t.next=13;break}return t.next=11,this.sleep(200);case 11:t.next=15;break;case 13:return t.next=15,this.sleep(50);case 15:n++,t.next=1;break;case 18:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}(),t.requestTokenIds=function(e,n,o){var i=this;if(1==o||n){var r="";r=1!=o&&n?"https://act.gamamobi.com/pre/nft/getTokenIds.web?owner="+e+"&pageKey="+n+"&contractAddress=0x82016d4ad050ef4784e282b82a746d3e01df23bf,0xa39853A45D0420D8dB0F660EA39dA1E89608fCfa&_="+Date.parse((new Date).toString()):"https://act.gamamobi.com/pre/nft/getTokenIds.web?owner="+e+"&contractAddress=0x82016d4ad050ef4784e282b82a746d3e01df23bf,0xa39853A45D0420D8dB0F660EA39dA1E89608fCfa&_="+Date.parse((new Date).toString()),f.httpPequest(r,(function(n){if(n){var o=JSON.parse(n),r=o.ownedNfts,s=o.pageKey;o.totalCount,o.blockHash;if(r)for(var a=0;a<r.length;a++){var l=r[a].id.tokenId,c=f.hex2Number(l);c&&l&&t.tokenIds.push(c)}s?i.requestTokenIds(e,s,2):(console.log("全部请求完成"),i.createTokenIdView()),console.log("解析完成 key="+s)}}))}},t}(),e(g,"tokenIdScrollView",null),e(g,"tokenIdScrollViewContentNode",null),e(g,"loginTokenInfoNode",null),e(g,"tipsLabelNode",null),e(g,"mParent",null),e(g,"buylandBtn",null),e(g,"ntfStartBtn",null),e(g,"pursrBtn",null),e(g,"tokenIds",[]),e(g,"sleep",function(){var t=n(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,n){setTimeout(t,e)})));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),m=I))||m);o._RF.pop()}}}));

System.register("chunks:///_virtual/TokenIdButtonComponent.ts",["./_rollupPluginModLoBabelHelpers.js","cc","./MapController.ts"],(function(t){"use strict";var n,o,e,r,c,u;return{setters:[function(t){n=t.inheritsLoose},function(t){o=t.cclegacy,e=t._decorator,r=t.Button,c=t.Component},function(t){u=t.MapController}],execute:function(){var l;o._RF.push({},"e341c7WxlRBm6lvXLdHjCUg","TokenIdButtonComponent",void 0);var s=e.ccclass;e.property,t("TokenIdButtonComponent",s("TokenIdButtonComponent")(l=function(t){function o(){return t.apply(this,arguments)||this}n(o,t);var e=o.prototype;return e.start=function(){},e.btnClickCallback=function(t,n){t.target.getComponent(r);console.log(n);var o=parseInt(n);u.getDataAndShowLandTips(o,!1,null)},o}(c))||l);o._RF.pop()}}}));

System.register("chunks:///_virtual/MainGame.ts",["./_rollupPluginModLoBabelHelpers.js","cc","./CUtil.ts","./LoginTokenController.ts","./UIController.ts","./MapController.ts"],(function(n){"use strict";var t,e,a,i,r,o,s,l,u,c;return{setters:[function(n){t=n.defineProperty,e=n.inheritsLoose},function(n){a=n.cclegacy,i=n._decorator,r=n.find,o=n.Component},function(n){s=n.CUtil},function(n){l=n.LoginTokenController},function(n){u=n.UIController},function(n){c=n.MapController}],execute:function(){var f,C,d;a._RF.push({},"fc1783xF95ARYakZeB0C/v9","MainGame",void 0);var m=i.ccclass;n("MainGame",m("MainGame")((d=C=function(n){function t(){return n.apply(this,arguments)||this}e(t,n),t.find=function(n){return r(n,t.mainCanvas)},t.isLogin=function(){return!!t.address};var a=t.prototype;return a.start=function(){t.mainCanvas=r("Canvas"),t.mainCamera=r("Camera",t.mainCanvas),t.address=s.getQueryVariable("address"),c.init(),u.init(),l.init()},a.update=function(n){t.deltaTime=n},t}(o),t(C,"mainCamera",null),t(C,"mainCanvas",null),t(C,"deltaTime",0),t(C,"address",null),f=d))||f);a._RF.pop()}}}));

System.register("chunks:///_virtual/main",["./CityInfoTipsComponent.ts","./CUtil.ts","./LoginTokenController.ts","./UIController.ts","./MainGame.ts","./NtfsController.ts","./LandTipsNode2Component.ts","./SLightComponent.ts","./LisaCityInfoTipsComponent.ts","./MapController.ts","./SPageViewComponent.ts","./TokenIdModel.ts","./LanguageComponent.ts","./TokenIdButtonComponent.ts"],(function(){"use strict";return{setters:[null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});