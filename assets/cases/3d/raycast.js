// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const WHITE = cc.Color.WHITE;

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var canvas = cc.find('Canvas');
        canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

        this.touchPos = null;
        this.results = [];
    },

    onTouchStart (event) {
        this.touchPos = event.touch.getLocation();
    },

    onTouchMove (event) {
        this.touchPos = event.touch.getLocation();
    },

    onTouchEnd (event) {
        this.touchPos = null;
    },

    raycast (pos) {
        let ray = cc.Camera.main.getRay(pos);
        return cc.geomUtils.intersect.raycast(this.node, ray);
    },

    update (dt) {
        for (let i = 0; i < this.results.length; i++) {
            this.results[i].node.opacity = 255;
        }
        this.results.length = 0;

        if (!this.touchPos) return;

        let ray = cc.Camera.main.getRay(this.touchPos);
        let results = cc.geomUtils.intersect.raycast(this.node, ray);
        if (results.length > 0) {
            // results[0].node.opacity = 100;

            let distance = results[0].distance;
            
            let d = cc.vmath.vec3.normalize(cc.v3(), ray.d);
            let p = cc.vmath.vec3.scaleAndAdd(cc.v3(), ray.o, d, distance);
            cc.find('mesh').position = p;
            cc.find('mesh').color = cc.Color.BLUE;
        }
        this.results = results;
    },
});