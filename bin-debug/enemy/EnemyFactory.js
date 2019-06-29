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
var EnemyFactory = (function (_super) {
    __extends(EnemyFactory, _super);
    function EnemyFactory() {
        var _this = _super.call(this) || this;
        _this._enemys = [];
        return _this;
    }
    /**
     * 初始化对象池
     */
    EnemyFactory.prototype.Init = function (main) {
        var _this = this;
        this._main = main;
        for (var i = 0; i < 10; i++) {
            var p = new ShipEnemyPlane(main);
            this._enemys.push(p);
        }
        this._giveevent = new AddShipEnemyEvent(AddShipEnemyEvent.EventName);
        this._timer = new egret.Timer(5000);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this._timer.start();
        this.addEventListener(AddShipEnemyEvent.EventName, function (e) {
            var x = Math.random() * 355.2;
            var ship = _this.GetSamllEnemyObject(EnemyType.SHIP);
            ship.x = x;
            ship.Use();
        }, this);
    };
    /**
 * 定时调用
 */
    EnemyFactory.prototype.timerFunc = function () {
        this.dispatchEvent(this._giveevent);
    };
    EnemyFactory.prototype.GetSamllEnemyObject = function (type) {
        for (var i = 0; i < this._enemys.length; i++) {
            if (!this._enemys[i].IsUse && this._enemys[i]._type == type) {
                return this._enemys[i];
            }
        }
    };
    return EnemyFactory;
}(egret.DisplayObjectContainer));
__reflect(EnemyFactory.prototype, "EnemyFactory");
//# sourceMappingURL=EnemyFactory.js.map