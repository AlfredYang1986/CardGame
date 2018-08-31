// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;

import {card} from '../Card/card'

@ccclass
export class playercards extends cc.Component {

    public cards : card[] = []
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    }

    // update (dt) {},

    gainCard(cd : card) {
        this.cards.push(cd)

        let tmp = cd.node

        let cd_node = this.node.getChildByName('cardTB')
        cd_node.addChild(tmp)
        tmp.setPosition(cc.p(0, 0))

        let count = this.cards.length
        let label_node = this.node.getChildByName('cardNum')
        let label = label_node.getComponent(cc.Label)
        label.string = "* " + count
    }
}
