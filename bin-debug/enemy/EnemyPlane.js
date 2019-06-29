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
var EnemyPlane = (function (_super) {
    __extends(EnemyPlane, _super);
    function EnemyPlane(main, type) {
        var _this = _super.call(this) || this;
        _this._speed = 2;
        _this._type = EnemyType.SHIP;
        _this.IsUse = false;
        _this._main = main;
        _this._type = type;
        _this._enemy = new egret.Bitmap();
        _this.addChild(_this._enemy);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () { }, _this);
        _this._bulletPool = _this._main._bulletPool;
        //定時產生子彈
        _this._timer = new egret.Timer(2500);
        _this._timer.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
        _this._enemyOpenFireEvent = new FireEvent(FireEvent.EventString);
        _this.addEventListener(FireEvent.EventString, function (e) {
            var bullet = _this._bulletPool.GetBullet();
            if (bullet == undefined) {
                return;
            }
            var bx = _this.x + _this.width / 2 - bullet.width / 2;
            var by = _this.y + 10;
            bullet.Use(BulletType.ENEMY, bx, by);
        }, _this);
        return _this;
    }
    EnemyPlane.prototype.timerFunc = function () {
        this.dispatchEvent(this._enemyOpenFireEvent);
    };
    EnemyPlane.prototype.Use = function () {
        this.IsUse = true;
        this.y = -this.height;
        this._main.addChildAt(this, 20);
        this.addEventListener(egret.Event.ENTER_FRAME, this.frame, this);
        this._timer.start();
    };
    EnemyPlane.prototype.Recycle = function () {
        this.IsUse = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frame, this);
        this._timer.stop();
    };
    EnemyPlane.prototype.frame = function () {
        if (this.IsUse) {
            this.y += this._speed;
            if (this.y >= 736) {
                if (this.parent) {
                    this.parent.removeChild(this);
                    this.Recycle();
                }
            }
        }
    };
    return EnemyPlane;
}(egret.DisplayObjectContainer));
__reflect(EnemyPlane.prototype, "EnemyPlane");
//# sourceMappingURL=EnemyPlane.js.map