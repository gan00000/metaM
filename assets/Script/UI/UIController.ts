
import { _decorator, Component, Node } from 'cc';
import { MainGame } from './../MainGame';
const { ccclass, property } = _decorator;


@ccclass('UIController')
export class UIController {
    private static parent: Node = null;

    public static init() {
        UIController.parent = MainGame.find("UIParent")
    }

    public static create(name: string) {
        
    }
}