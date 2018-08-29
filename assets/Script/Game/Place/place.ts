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

import {player} from '../Players/player'
// import {DouDiZhu} from '../doudizu'

export enum status {
    unknown = 0,
    me_is_ready,
    me_not_ready,
    other_is_ready,
    other_not_ready
}

@ccclass
export class place extends cc.Component {

    @property(cc.Node)
    game : cc.Node = null

    @property
    public placeIndex : number = 0

    public curPlayer : player = null
    public stm : status = status.unknown

    @property(cc.Prefab)
    menotready : cc.Prefab = null

    @property(cc.Prefab)
    meready : cc.Prefab = null

    @property(cc.Prefab)
    otherready : cc.Prefab = null

    @property(cc.Prefab)
    othernotready : cc.Prefab = null

    isMe() {
        return this.stm == status.me_is_ready || this.stm == status.me_not_ready
    }

    isReady() {
        // return this.stm == status.me_is_ready || this.stm == status.other_is_ready
        return this.stm != status.me_not_ready
    }

    resetCurPlayer(p : player, me : boolean) : boolean {
        if (this.curPlayer == null) {
            this.curPlayer = p
          
            let s = status.unknown
            if (me) {
                s = status.me_not_ready
            } else {
                s = status.other_not_ready
            }
            this.changeSTM(s)

            return true
        } else {
            console.log('this place has already been taken by other player');
            return false
        }
    }

    changeSTM(s : status) {
        if (this.stm != s) {
            this.stm = s
            switch (this.stm) {
                case status.me_not_ready:
                    this.change2menotready()
                    break
                case status.me_is_ready:
                    this.change2meisready()
                    break
                case status.other_is_ready:
                    this.change2otherready()
                    break
                case status.other_not_ready:
                    this.change2othernotready()
                    break
                default:
                    console.log("something wrong with the ");
                    break
            }

            let ddz = this.game.getComponent('doudizu')
            if (ddz.canStartGame()) {
                ddz.startGame()
            }
        }
    }

    private change2othernotready() {
        var newPlace : cc.Node = cc.instantiate(this.othernotready);
        this.node.addChild(newPlace);
        newPlace.setPosition(cc.p(0, 0));
        newPlace.getComponent('othernotready').parent = this
        
        newPlace.getChildByName('name').getComponent(cc.Label).string = this.curPlayer.playerName

        this.otherReady()
    }

    private change2otherready() {
        var newPlace : cc.Node = cc.instantiate(this.otherready);
        this.node.addChild(newPlace);
        newPlace.setPosition(cc.p(0, 0));
        newPlace.getComponent('otherready').parent = this
        
        newPlace.getChildByName('name').getComponent(cc.Label).string = this.curPlayer.playerName
    }

    private change2meisready() {
        var newPlace : cc.Node = cc.instantiate(this.meready);
        this.node.addChild(newPlace);
        newPlace.setPosition(cc.p(0, 0));
        newPlace.getComponent('meready').parent = this
        
        newPlace.getChildByName('name').getComponent(cc.Label).string = this.curPlayer.playerName

    }

    private change2menotready() {
        var newPlace : cc.Node = cc.instantiate(this.menotready);
        this.node.addChild(newPlace);
        newPlace.setPosition(cc.p(0, 0));
        newPlace.getComponent('menotready').parent = this
        
        newPlace.getChildByName('name').getComponent(cc.Label).string = this.curPlayer.playerName
    }

    async otherReady() : Promise<string> {
        var self = this
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                console.log("ready for others")

                this.changeSTM(status.other_is_ready)

                resolve("true")
            }, 2000)
        })
    }
}