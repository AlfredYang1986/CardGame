// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator

import {player} from './Players/player'
import {place} from './Place/place'
import {card} from './Card/card'

const pos_me = 0
const opp_left = 1
const opp_right = 2
const cards_unit = 1
const cards_num = 54

const card_array_s = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S0', 'SJ', "SQ", "SK"]
const card_array_h = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H0', 'HJ', "HQ", "HK"]
const card_array_c = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C0', 'CJ', "CQ", "CK"]
const card_array_d = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D0', 'DJ', "DQ", "DK"]
const card_array_o = ['WW', 'WS', 'BB']

@ccclass
export class DouDiZhu extends cc.Component {

    @property([place])
    places : place[] = []

    @property(cc.Prefab)
    cf : cc.Prefab = null   // card factory

    @property(cc.Node)
    ctb : cc.Node = null

    @property(cc.Node)
    ctf : cc.Node = null

    isStarted : boolean = false

    card_S : cc.SpriteAtlas = null
    card_H : cc.SpriteAtlas = null
    card_C : cc.SpriteAtlas = null
    card_D : cc.SpriteAtlas = null
    card_O : cc.SpriteAtlas = null

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this
        cc.loader.loadRes("Card_S", cc.SpriteAtlas, function (err, atlas) {
            if (err == null) {
                self.card_S = atlas
            }
        });
        cc.loader.loadRes("Card_H", cc.SpriteAtlas, function (err, atlas) {
            if (err == null) {
                self.card_H = atlas
            }
        });
        cc.loader.loadRes("Card_C", cc.SpriteAtlas, function (err, atlas) {
            if (err == null) {
                self.card_C = atlas
            }
        });
        cc.loader.loadRes("Card_D", cc.SpriteAtlas, function (err, atlas) {
            if (err == null) {
                self.card_D = atlas
            }
        });
        cc.loader.loadRes("Card_O", cc.SpriteAtlas, function (err, atlas) {
            if (err == null) {
                self.card_O = atlas
            }
        });

        this.creatPlayer()
        this.creatOtherPlayer()
    }

    start () {

    }

    update (dt) {
        //console.log("update game");

        // this.places.forEach(element => {
        //     console.log(element.curPlayer)
        // });
    }

    pushPlayerAtPlace(p : player, index : number) : boolean {
        var pc = this.places[index];
        if (pc.curPlayer == null) {
            pc.curPlayer = p
            return true
        } else {
            console.log("current place has been taken")
            return false
        }
    }

    playerLeavePlace(index : number) : boolean {
        var pc = this.places[index]
        if (pc.curPlayer == null) {
            console.log("current place has no players")
            return false
        } else {
            pc.curPlayer = null
            return true
        }
    }

    async creatOtherPlayer() : Promise<string> {
        var self = this
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                console.log("create other player")

                {
                    const element = self.places[opp_left]
                    var p = new player('xie', 'xie')
                    element.resetCurPlayer(p, false)
                }

                {
                    const element = self.places[opp_right]
                    var p = new player('wang', 'wang')
                    element.resetCurPlayer(p, false)
                }

                resolve("true")
            }, 2000)
        })
    }

    async creatPlayer() : Promise<string> {
        var self = this
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                console.log("create a player start")

                const element = self.places[pos_me]
                var p = new player('alfred', 'yang')
                element.resetCurPlayer(p, true)

                resolve("true")
            }, 2000)
        })
    }

    canStartGame() : boolean {
        // check if all the player is ready
        var b = true
        this.places.forEach(element => {
            console.log("start check");
            console.log(element.isReady());
            b = b && element.isReady()
        });
        return b
    }

    startGame() {
        console.log("start card game");

        let cards = []
        card_array_c.forEach(element => {
            let tmp = cc.instantiate(this.cf)
            tmp.getComponent('card').setCardFrame(this.card_C.getSpriteFrame(element))
            tmp.getComponent('card').setCardBack(this.card_O.getSpriteFrame('BB'))
            tmp.getComponent('card').showBack()
            cards.push(tmp)
        });
        card_array_d.forEach(element => {
            let tmp = cc.instantiate(this.cf)
            tmp.getComponent('card').setCardFrame(this.card_D.getSpriteFrame(element))
            tmp.getComponent('card').setCardBack(this.card_O.getSpriteFrame('BB'))
            tmp.getComponent('card').showBack()
            cards.push(tmp)
        });
        card_array_h.forEach(element => {
            let tmp = cc.instantiate(this.cf)
            tmp.getComponent('card').setCardFrame(this.card_H.getSpriteFrame(element))
            tmp.getComponent('card').setCardBack(this.card_O.getSpriteFrame('BB'))
            tmp.getComponent('card').showBack()
            cards.push(tmp)
        });
        card_array_s.forEach(element => {
            let tmp = cc.instantiate(this.cf)
            tmp.getComponent('card').setCardFrame(this.card_S.getSpriteFrame(element))
            tmp.getComponent('card').setCardBack(this.card_O.getSpriteFrame('BB'))
            tmp.getComponent('card').showBack()
            cards.push(tmp)
        });
        card_array_o.forEach(element => {
            if (element != 'BB') {
                let tmp = cc.instantiate(this.cf)
                tmp.getComponent('card').setCardFrame(this.card_O.getSpriteFrame(element))
                tmp.getComponent('card').setCardBack(this.card_O.getSpriteFrame('BB'))
                tmp.getComponent('card').showBack()
                cards.push(tmp)
            }
        });

        console.log("total create card :");
        console.log(cards.length);

        this.putCardInCBT(cards)
    }

    putCardInCBT(cs : cc.Node[]) {
        for (let index = 0 ; index < cs.length; index++) {
            const card = cs[index];
            this.ctb.addChild(card)
            card.setPosition(cc.p(index, index))
        }
    }
}
