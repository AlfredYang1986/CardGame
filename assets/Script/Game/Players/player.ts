// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

// const {ccclass, property} = cc._decorator;

import {Role} from '../Defines/Roles'

import {card} from '../Card/card'

// @ccclass
export class player { //extends cc.Component {

    public playerName : string = null
    public playerPhoto : string = null
    public playerRole : Role = Role.normal

    public cards : card[] = []

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    }

    // update (dt) {},

    constructor(name : string, photo : string) {
        this.playerName = name
        this.playerPhoto = photo
    }
}
