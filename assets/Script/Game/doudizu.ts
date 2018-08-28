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

import {player} from './Players/player';
import {place} from './Place/place'

const pos_me = 0
const opp_left = 1
const opp_right = 2

@ccclass
export class DouDiZhu extends cc.Component {

    @property([place])
    places : place[] = []

    isStarted : boolean = false

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        /**
         * 1. 初始化位置
         */
        //for (var index = 0; index < 3; ++index) {
        //    this.places.push(new place(index))
        //}

        this.creatPlayer()
        this.creatOtherPlayer()

        //  var newPlace = cc.instantiate(this.placePrefab);
        //  this.node.addChild(newPlace);
        //  newPlace.setPosition(cc.p(100, 100));
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
        var b = true
        this.places.forEach(element => {
            b = b && element.isReady()
        });
        return b
    }

    startGame() {
        // 1. 一开始一人发一张牌
        console.log("start card game");
        
    }
}
