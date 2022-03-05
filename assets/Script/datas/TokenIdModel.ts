
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TokenIdModel
 * DateTime = Sat Mar 05 2022 10:54:38 GMT+0800 (中国标准时间)
 * Author = 372129081
 * FileBasename = TokenIdModel.ts
 * FileBasenameNoExtension = TokenIdModel
 * URL = db://assets/Script/datas/TokenIdModel.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('TokenIdModel')
export class TokenIdModel {
    
    ownerNfts:OwnerNft[] = []
    pageKey:string = ""
    totalCount = 0
    blockHash:string = ""
}

export class OwnerNft {
    
    contract:Contract = null
    id:Id = null
    balance:string = ""
}

export class Contract {
    
    address:string = ""
    
}

export class Id {
    
    tokenId:string = ""
    
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
