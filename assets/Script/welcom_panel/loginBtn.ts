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

@ccclass
export default class NewClass extends cc.Component {
    // onLoad () {},

    start () {

    }

    loginBtnClick (event : Event, customEventData : Object) {
        //here event is a Touch Event object, you can get events sent to the event node node
        //var node = event.target;
        //var button = node.getComponent(cc.Button);
        //here the customEventData parameter is equal to you set before the "foobar"
        console.log(customEventData);
        cc.director.loadScene('play_table');
    }
}
