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
var BulletObject = (function (_super) {
    __extends(BulletObject, _super);
    function BulletObject(main) {
        var _this = _super.call(this) || this;
        _this._speed = 5;
        _this.inUse = false;
        var w = 8;
        var h = 30;
        _this.width = w;
        _this.height = h;
        _this._main = main;
        _this._bullet = new egret.Bitmap();
        _this._bullet.width = w;
        _this._bullet.height = h;
        _this.addChild(_this._bullet);
        return _this;
    }
    BulletObject.prototype.frame = function () {
        if (this.inUse) {
            if (this.bType == BulletType.ENEMY) {
                this.y += this._speed;
                if (this.y >= 716) {
                    if (this.parent) {
                        this.parent.removeChild(this);
                        this.Recycle();
                    }
                }
            }
            else if (this.bType == BulletType.HERO) {
                this.y -= this._speed;
                if (this.y <= 0) {
                    if (this.parent) {
                        this.parent.removeChild(this);
                        this.Recycle();
                    }
                }
            }
        }
    };
    BulletObject.prototype.Use = function (type, x, y) {
        this.inUse = true;
        this.x = x;
        this.y = y;
        this.bType = type;
        if (type === BulletType.ENEMY) {
            this._bullet.texture = RES.getRes("laserGreen_png");
        }
        else {
            this._bullet.texture = RES.getRes("laserRed_png");
        }
        this._main.addChildAt(this, 10);
        this.addEventListener(egret.Event.ENTER_FRAME, this.frame, this);
    };
    BulletObject.prototype.Recycle = function () {
        this.inUse = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frame, this);
    };
    return BulletObject;
}(egret.DisplayObjectContainer));
__reflect(BulletObject.prototype, "BulletObject");
//# sourceMappingURL=BulletObject.js.map