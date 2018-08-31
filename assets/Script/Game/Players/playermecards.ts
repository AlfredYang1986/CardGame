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

const card_scale = 0.5
const card_width = 120
const card_height = 195 
const card_step = 10

@ccclass
export class playermecards extends cc.Component {

    public cards : card[] = []
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    }

    // update (dt) {},

    gainCard(cd : card) {
        this.cards.push(cd)
        cd.showFront()

        let tmp = cd.node
        tmp.scale = card_scale
        tmp.setAnchorPoint(0, 1)

        this.node.addChild(tmp)
        
        // tmp.setPosition(cc.p(0, 0))

        this.resetCardPos()
    }

    resetCardPos() {
        let count = this.cards.length
        let total = (count - 1) * card_step + card_width
        for (let index = 0; index < this.cards.length; index++) {
            const element = this.cards[index];
            element.node.setPosition(cc.p(index * card_step, 0))
        }

        this.node.setPosition(cc.p(-total / 2, -150))
        this.node.setAnchorPoint(0, 1)
    }
}
