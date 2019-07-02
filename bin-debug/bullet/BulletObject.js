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
        _this._speed = 10;
        _this.wBoom = 56;
        _this.hBoom = 56;
        _this.width = 8;
        _this.height = 30;
        _this.inUse = false;
        _this._main = main;
        _this._bullet = new egret.Bitmap();
        _this._bullet.smoothing = true;
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
                        this.Recycle(false);
                    }
                }
            }
            else if (this.bType == BulletType.HERO) {
                this.y -= this._speed;
                if (this.y <= 0) {
                    if (this.parent) {
                        this.parent.removeChild(this);
                        this.Recycle(false);
                    }
                }
            }
        }
    };
    BulletObject.prototype.Use = function (type, x, y) {
        this.inUse = true;
        this._bullet.width = this.width;
        this._bullet.height = this.height;
        this._bullet.alpha = 1;
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
    BulletObject.prototype.Recycle = function (isHit) {
        var _this = this;
        this._bullet.width = this.wBoom;
        this._bullet.height = this.hBoom;
        if (isHit) {
            if (this.bType === BulletType.ENEMY) {
                this._bullet.texture = RES.getRes("laserGreenShot_png");
                var tween = egret.Tween.get(this._bullet);
                tween.to({ alpha: 0.5 }, 200)
                    .to({ alpha: 0.7 }, 150)
                    .to({ alpha: 0.2 }, 200)
                    .to({ alpha: 0.4 }, 150)
                    .to({ alpha: 0 }, 100)
                    .call(function () { _this.inUse = false; });
            }
            else {
                this._bullet.texture = RES.getRes("laserGreenShot_png");
                var tween = egret.Tween.get(this._bullet);
                tween.to({ alpha: 0.5 }, 200)
                    .to({ alpha: 0.7 }, 150)
                    .to({ alpha: 0.2 }, 200)
                    .to({ alpha: 0.4 }, 150)
                    .to({ alpha: 0 }, 100)
                    .call(function () { _this.inUse = false; });
            }
        }
        else {
            this.inUse = false;
        }
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frame, this);
    };
    return BulletObject;
}(egret.DisplayObjectContainer));
__reflect(BulletObject.prototype, "BulletObject");
//# sourceMappingURL=BulletObject.js.map