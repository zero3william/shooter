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
        _this.skinName = "resource/game/GameScene.exml";
        return _this;
    }
    GameScene.prototype.onComplete = function () {
        this.toEndBtn.touchEnabled = true;
        this.toEndBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.endGame, this);
    };
    GameScene.prototype.endGame = function () {
        var s1 = new EndScene();
        SceneManager.Instance.changeScene(s1);
    };
    return GameScene;
}(Scene));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map