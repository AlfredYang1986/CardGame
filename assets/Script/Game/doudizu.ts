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

    @property(cc.Prefab)
    pf : cc.Prefab = null   // player cards factory
    
    @property(cc.Prefab)
    pmf : cc.Prefab = null   // player me cards factory

    cs : cc.Node[] = []

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
    }

    start () {
        this.creatPlayer()
        this.creatOtherPlayer()
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

                    var tmp = cc.instantiate(self.pf)
                    p.pcds = tmp.getComponent('playercards')
                    self.node.addChild(tmp)
                    tmp.setPosition(cc.p(-350, 100))
                }

                {
                    const element = self.places[opp_right]
                    var p = new player('wang', 'wang')
                    element.resetCurPlayer(p, false)
                    
                    var tmp = cc.instantiate(self.pf)
                    p.pcds = tmp.getComponent('playercards')
                    self.node.addChild(tmp)
                    tmp.setPosition(cc.p(350, 100))
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

                let tmp = cc.instantiate(self.pmf)
                p.pmcds = tmp.getComponent('playermecards')
                self.node.addChild(tmp)
                tmp.setPosition(cc.p(0, -150))

                resolve("true")
            }, 2000)
        })
    }

    canStartGame() : boolean {
        // check if all the player is ready
        var b = true
        this.places.forEach(element => {
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

        this.cs = cards
        this.putCardInCBT()
    }

    /**
     * 建立牌堆
     * @param cs : cards 
     */
    putCardInCBT() {
        for (let index = 0 ; index < this.cs.length; index++) {
            const card = this.cs[index];
            this.node.addChild(card)
            card.setPosition(cc.p(index, index))
        }

        this.sendCard2Player(0)
    }

    /**
     * 发牌的动画
     * TODO: 洗牌
     */
    sendCard2Player(index : number) {
        if (this.cs.length > 0) {
            const ele = this.cs.pop()
            let tmp = null
            switch (index%3) {
                case 0: {
                    tmp = cc.moveTo(0.5, cc.p(0, -100))
                    break;
                }
                case 1: {
                    tmp = cc.moveTo(0.5, cc.p(-100, 100))
                    break;
                }
                case 2: {
                    tmp = cc.moveTo(0.5, cc.p(100, 100))
                    break;
                }
                default:
                    break;
            }
            let act = cc.sequence(tmp, cc.callFunc(this.nextCard2Player, this, index))
            ele.runAction(act)
        } else {
            this.sendCardEnded()
        }
    }

    nextCard2Player(ele: cc.Node, index : number) {
        /**
         * 1. 将牌给用户进行管理，并在用户的区域内显示牌
         */
        ele.removeFromParent()
        // ele.destroy()

        let player = this.places[index%3].curPlayer
        console.log(player.playerName)

        let card = ele.getComponent('card')
        if (player.pcds != null) {
            player.pcds.gainCard(card)
        } else if (player.pmcds != null) {
            player.pmcds.gainCard(card)
        }

        this.sendCard2Player(++index)
    }

    sendCardEnded() {
        console.log('可以开始斗地主了');
    }
}
