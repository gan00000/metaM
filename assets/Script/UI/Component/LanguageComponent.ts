
import { _decorator, Component, Node, find, Sprite, Label, Layout, ScrollView, resources, Prefab, instantiate, Button, sys, System, UITransform, RichText, SpriteFrame, Texture2D } from 'cc';
import { MainGame } from '../../MainGame';
import { MapController } from '../../Map/MapController';
import { CUtil } from '../../Utils/CUtil';
import { UIController } from '../UIController';
const { ccclass, property } = _decorator;

@ccclass('LanguageComponent')
export class LanguageComponent extends Component{

    private changeLanguageNode: Node = null;
    private languageContentNode: Node = null;
    private languageBgNode: Node = null;
   
    private zhLabelNode: Node = null;
    private enLabelNode: Node = null;
    private krLabelNode: Node = null;
    private jpLabelNode: Node = null;
    private taiLabelNode: Node = null;
   

    start () {
        
        this.changeLanguageNode = find("language_select", this.node)
        this.languageBgNode = find("language_bg", this.node)

        this.languageContentNode = find("language_bg/languageScrollView/view/content", this.node);

        this.zhLabelNode = find("zhLabel", this.languageContentNode)
        this.enLabelNode = find("enLabel", this.languageContentNode)
        this.krLabelNode = find("krLabel", this.languageContentNode)
        this.jpLabelNode = find("jpLabel", this.languageContentNode)
        this.taiLabelNode = find("taiLabel", this.languageContentNode)
        
        this.changeLanguageNode.on(Button.EventType.CLICK, () => {
            
            if (this.languageBgNode.active) {
                this.languageBgNode.active = false
            } else {
                this.languageBgNode.active = true
            }
        })

        this.zhLabelNode.on(Button.EventType.CLICK, () => {
            
            this.languageBgNode.active = false
        })

        this.enLabelNode.on(Button.EventType.CLICK, () => {
            
            this.languageBgNode.active = false
        })


        this.krLabelNode.on(Button.EventType.CLICK, () => {
            
            this.languageBgNode.active = false
        })


        this.taiLabelNode.on(Button.EventType.CLICK, () => {
            
            this.languageBgNode.active = false
        })

        this.jpLabelNode.on(Button.EventType.CLICK, () => {
            
            this.languageBgNode.active = false
        })

        
    }

}