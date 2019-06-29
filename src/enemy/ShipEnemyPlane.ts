class ShipEnemyPlane extends EnemyPlane {
    public constructor(main: any) {
        super(main, EnemyType.SHIP);
        const width: number = 58.8;
        const height: number = 30;

        this.width = width;
        this.height = height;
        this._enemy.texture = RES.getRes("enemyShip_png");
        this._enemy.width = width;
        this._enemy.height = height;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {}, this);
    }
}