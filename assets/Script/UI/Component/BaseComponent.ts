
import { _decorator, Component, Node, Vec3 } from 'cc';
import { CUtil } from '../../Utils/CUtil';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BaseComponent
 * DateTime = Fri Mar 25 2022 12:33:58 GMT+0800 (中国标准时间)
 * Author = 372129081
 * FileBasename = BaseComponent.ts
 * FileBasenameNoExtension = BaseComponent
 * URL = db://assets/Script/UI/Component/BaseComponent.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('BaseComponent')
export class BaseComponent extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        let scaleVec3 = CUtil.getScaleRatio()
    
        if (scaleVec3) {
            let nodeScale = this.node.getScale()
            let newScale = new Vec3(scaleVec3.x * nodeScale.x,scaleVec3.y * nodeScale.y,scaleVec3.z * nodeScale.z)
            this.node.setScale(newScale)
        }
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
