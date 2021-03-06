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

import {place, status} from '../Place/place'

@ccclass
export class menotready extends cc.Component {

    // callback
    @property(place)
    parent : place = null

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    }

    // update (dt) {},

    readyBtnClicked() {
        console.log("me want to ready");
        this.parent.changeSTM(status.me_is_ready)
    }

    quiteBtnClicked() {
        console.log("me want to quite");
    }
}
