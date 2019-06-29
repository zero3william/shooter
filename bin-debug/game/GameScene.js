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
        _this.moveSpeed = 20;
        _this.attackRate = 500;
        _this.reloading = false;
        _this._EnemyFactory = new EnemyFactory();
        _this._bulletPool = new BulletFactory();
        _this.keydownObj = {
            left: false,
            up: false,
            right: false,
            down: false,
            spacebar: false
        };
        _this.skinName = "resource/game/GameScene.exml";
        return _this;
    }
    GameScene.prototype.onComplete = function () {
        var _this = this;
        this._EnemyFactory.Init(this);
        this._bulletPool.Init(this);
        this.toEndBtn.touchEnabled = true;
        this.toEndBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.endGame, this);
        this.playAnimation(this.bgAnimate, true);
        var keyCode;
        (function (keyCode) {
            keyCode[keyCode["spacebar"] = 32] = "spacebar";
            keyCode[keyCode["left"] = 37] = "left";
            keyCode[keyCode["up"] = 38] = "up";
            keyCode[keyCode["right"] = 39] = "right";
            keyCode[keyCode["down"] = 40] = "down";
        })(keyCode || (keyCode = {}));
        document.addEventListener("keydown", function (evt) {
            switch (evt.keyCode) {
                case keyCode.left:
                    _this.keydownObj.left = true;
                    break;
                case keyCode.up:
                    _this.keydownObj.up = true;
                    break;
                case keyCode.right:
                    _this.keydownObj.right = true;
                    break;
                case keyCode.down:
                    _this.keydownObj.down = true;
                    break;
                case keyCode.spacebar:
                    _this.keydownObj.spacebar = true;
                    _this.tryShoot();
                    break;
                default:
            }
        });
        document.addEventListener("keyup", function (evt) {
            switch (evt.keyCode) {
                case keyCode.left:
                    _this.keydownObj.left = false;
                    break;
                case keyCode.up:
                    _this.keydownObj.up = false;
                    break;
                case keyCode.right:
                    _this.keydownObj.right = false;
                    break;
                case keyCode.down:
                    _this.keydownObj.down = false;
                    break;
                case keyCode.spacebar:
                    _this.keydownObj.spacebar = false;
                    break;
                default:
            }
        });
        egret.setInterval(function () {
            if (_this.keydownObj.left && _this.keydownObj.up) {
                _this.move(_this.player, [-5, -5]);
                _this.player.currentState = "left";
            }
            else if (_this.keydownObj.left && _this.keydownObj.down) {
                _this.move(_this.player, [-5, 5]);
                _this.player.currentState = "left";
            }
            else if (_this.keydownObj.right && _this.keydownObj.up) {
                _this.move(_this.player, [5, -5]);
                _this.player.currentState = "right";
            }
            else if (_this.keydownObj.right && _this.keydownObj.down) {
                _this.move(_this.player, [5, 5]);
                _this.player.currentState = "right";
            }
            else if (_this.keydownObj.left) {
                _this.move(_this.player, [-5, 0]);
                _this.player.currentState = "left";
            }
            else if (_this.keydownObj.right) {
                _this.move(_this.player, [5, 0]);
                _this.player.currentState = "right";
            }
            else if (_this.keydownObj.up) {
                _this.move(_this.player, [0, -5]);
            }
            else if (_this.keydownObj.down) {
                _this.move(_this.player, [0, 5]);
            }
        }, this, this.moveSpeed);
        egret.setInterval(function () {
            if (_this.keydownObj.spacebar) {
                _this.tryShoot();
            }
        }, this, this.attackRate);
        this.addEventListener(egret.Event.ENTER_FRAME, function (e) {
            //判断子弹是否和飞机碰撞
            var isHit = _this._bulletPool.IsHit(_this.player);
            console.log("Hit:" + isHit);
            //判断Enemy是否和主角碰撞
        }, this);
    };
    GameScene.prototype.tryShoot = function () {
        var _this = this;
        if (!this.reloading) {
            var b = this._bulletPool.GetBullet();
            if (b === undefined) {
                return;
            }
            else {
                b.Use(BulletType.HERO, this.player.x + this.player.width / 2 - b.width / 2, this.player.y - b.height);
                this.reloading = true;
                egret.setTimeout(function () {
                    _this.reloading = false;
                }, this, this.attackRate);
            }
        }
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
        tween.to({ x: obj.x + offset[0], y: obj.y + offset[1] }, this.moveSpeed);
    };
    return GameScene;
}(Scene));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map