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
var ShipEnemyPlane = (function (_super) {
    __extends(ShipEnemyPlane, _super);
    function ShipEnemyPlane(main) {
        var _this = _super.call(this, main, EnemyType.SHIP) || this;
        var width = 58.8;
        var height = 30;
        _this.width = width;
        _this.height = height;
        _this._enemy.texture = RES.getRes("enemyShip_png");
        _this._enemy.width = width;
        _this._enemy.height = height;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () { }, _this);
        return _this;
    }
    return ShipEnemyPlane;
}(EnemyPlane));
__reflect(ShipEnemyPlane.prototype, "ShipEnemyPlane");
//# sourceMappingURL=ShipEnemyPlane.js.map