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
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/game/StartScene.exml";
        return _this;
    }
    StartScene.prototype.onComplete = function () {
        this.menuTitle.touchEnabled = true;
        this.menuTitle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToast, this);
        this.toStartBtn.touchEnabled = true;
        this.toStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
    };
    StartScene.prototype.onToast = function () {
        var toast = new Toast();
        SceneManager.Instance.pushScene(toast);
    };
    StartScene.prototype.startGame = function () {
        var s1 = new GameScene();
        SceneManager.Instance.changeScene(s1);
    };
    return StartScene;
}(Scene));
__reflect(StartScene.prototype, "StartScene");
//# sourceMappingURL=StartScene.js.map