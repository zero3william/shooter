var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.duration = 50;
        _this.skinName = "resource/game/GameScene.exml";
        return _this;
    }
    GameScene.prototype.onComplete = function () {
        this.toEndBtn.touchEnabled = true;
        this.toEndBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.endGame, this);
        this.playAnimation(this.bgAnimate, true);
        var bulletArr = this.bulletArr;
        console.log(bulletArr);
        for (var i = 0; i < 50; i++) {
            var bullet = new BulletObject(this);
            bulletArr.push(bullet);
        }
        var that = this;
        document.addEventListener("keydown", function _onKeyDown(evt) {
            document.removeEventListener("keydown", _onKeyDown, true);
            var intervalId;
            var keyCode;
            (function (keyCode) {
                keyCode[keyCode["spacebar"] = 32] = "spacebar";
                keyCode[keyCode["left"] = 37] = "left";
                keyCode[keyCode["up"] = 38] = "up";
                keyCode[keyCode["right"] = 39] = "right";
                keyCode[keyCode["down"] = 40] = "down";
            })(keyCode || (keyCode = {}));
            switch (evt.keyCode) {
                case keyCode.left:
                    intervalId = egret.setInterval(that.move, that, that.duration, that.player, [-5, 0]);
                    that.player.currentState = "left";
                    break;
                case keyCode.up:
                    intervalId = egret.setInterval(that.move, that, that.duration, that.player, [0, -5]);
                    break;
                case keyCode.right:
                    intervalId = egret.setInterval(that.move, that, that.duration, that.player, [5, 0]);
                    that.player.currentState = "right";
                    break;
                case keyCode.down:
                    intervalId = egret.setInterval(that.move, that, that.duration, that.player, [0, 5]);
                    break;
                case keyCode.spacebar:
                    var b = that.GetBullet();
                    if (b == undefined) {
                        console.log("对象池中没有对象");
                        return;
                    }
                    b.Use(BulletType.HERO, that.player.x + that.player.width / 2, that.player.y - 18);
                    break;
                default:
                    console.log(evt.keyCode);
            }
            document.addEventListener("keyup", function _onKeyUp() {
                document.removeEventListener("keyup", _onKeyUp, true);
                that.player.currentState = "normal";
                egret.clearInterval(intervalId);
                document.addEventListener("keydown", _onKeyDown);
            });
        });
    };
    GameScene.prototype.endGame = function () {
        var s1 = new EndScene();
        SceneManager.Instance.changeScene(s1);
    };
    GameScene.prototype.playAnimation = function (target, isLoop) {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
        }
        target.play();
    };
    GameScene.prototype.move = function (obj, offset) {
        var tween = egret.Tween.get(obj);
        tween.to({ x: obj.x + offset[0], y: obj.y + offset[1] }, this.duration);
    };
    GameScene.prototype.GetBullet = function () {
        for (var i = 0; i < this.bulletArr.length; i++) {
            if (this.bulletArr[i].inUse == false) {
                return this.bulletArr[i];
            }
        }
        console.log("对象池已经用光了，可能是没有回收");
    };
    return GameScene;
}(Scene));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map