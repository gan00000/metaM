
import { _decorator, Component, Node } from 'cc';
import { BaseComponent } from './BaseComponent';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UIParentComponent
 * DateTime = Fri Mar 25 2022 16:01:34 GMT+0800 (中国标准时间)
 * Author = 372129081
 * FileBasename = UIParentComponent.ts
 * FileBasenameNoExtension = UIParentComponent
 * URL = db://assets/Script/UI/Component/UIParentComponent.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('UIParentComponent')
export class UIParentComponent extends BaseComponent {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // super.start()
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
