
/**
 * Creator : Alfred Yang
 * Date : 2018-08-27
 */

const {ccclass, property} = cc._decorator;

@ccclass
export class card extends cc.Component {

    @property(cc.SpriteFrame)
    front : cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    back : cc.SpriteFrame = null

    @property
    number : number = 0
    
    @property
    title : string = ""

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    }

    // update (dt) {},

    setCardFrame(f : cc.SpriteFrame) {
        this.front = f
    }

    setCardBack(b : cc.SpriteFrame) {
        this.back = b
    }

    showBack() {
        this.node.getComponent(cc.Sprite).spriteFrame = this.back
    }

    showFront() {
        this.node.getComponent(cc.Sprite).spriteFrame = this.front
    }
}