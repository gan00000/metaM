
import { _decorator, Component, Node, resources, Prefab, instantiate } from 'cc';
import { MainGame } from './../MainGame';
const { ccclass, property } = _decorator;


@ccclass('UIController')
export class UIController {
    private static parent: Node = null
    private static map: Map<string, Node> = new Map()

    public static init() {
        UIController.parent = MainGame.find("UIParent")
    }

    public static create(name: string, callback: Function) {
        let node: Node = null
        if (this.map.has(name)) {
            node = this.map.get(name)
            this.map.delete(name)
            callback(node)
            node.active = true
        }
        else {
            resources.load("Prefab/" + name, Prefab, (err, prefab) => {
                if (err) {
                    console.log(err)
                }
                else {
                    node = instantiate(prefab)
                    this.parent.addChild(node)
                    callback(node)
                }
            })
        }
    }

    public static recycle(node: Node) {
        node.active = false
        this.map.set(node.name, node)
    }
}