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
var Toast = (function (_super) {
    __extends(Toast, _super);
    function Toast() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/game/toast.exml";
        return _this;
    }
    Toast.prototype.onComplete = function () {
        this.btn_close.touchEnabled = true;
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapclose, this);
    };
    Toast.prototype.onTapclose = function () {
        SceneManager.Instance.popScene();
    };
    return Toast;
}(Scene));
__reflect(Toast.prototype, "Toast");
//# sourceMappingURL=Toast.js.map