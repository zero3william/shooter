class BulletObject extends egret.DisplayObjectContainer {
    private _bullet: egret.Bitmap;
    private _main: Main;
    private _speed = 5;

    public bType: BulletType;
    public inUse: boolean = false;

    public constructor(main: any) {
        super();
        const w = 8;
        const h = 30;
        this.width = w;
        this.height = h;
        this._main = main;
        this._bullet = new egret.Bitmap();
        this._bullet.width = w;
        this._bullet.height = h;
        this.addChild(this._bullet)
    }

    frame() {
        if (this.inUse) {
            if (this.bType == BulletType.ENEMY) {
                this.y += this._speed;
                if (this.y >= 716) {
                    if (this.parent) {
                        this.parent.removeChild(this);
                        this.Recycle();
                    }
                }
            } else if (this.bType == BulletType.HERO) {
                this.y -= this._speed;
                if (this.y <= 0) {
                    if (this.parent) {
                        this.parent.removeChild(this);
                        this.Recycle();
                    }
                }
            }
        }
    }

    public Use(type: BulletType, x: number, y: number) {
        this.inUse = true;
        this.x = x;
        this.y = y;
        this.bType = type;
        if (type === BulletType.ENEMY) {
            this._bullet.texture = RES.getRes("laserGreen_png")
        } else {
            this._bullet.texture = RES.getRes("laserRed_png")
        }
        this._main.addChildAt(this, 10)
        this.addEventListener(egret.Event.ENTER_FRAME, this.frame, this)

        this.addEventListener(HitEvent.EventString, (e: HitEvent) => {
            console.log("碰撞事件触发：" + this.bType + "的子彈")
            if (this.bType == BulletType.ENEMY) {
                //Hero被击中
                console.log("life -1");
            }
            if (this.bType == BulletType.HERO) {
                //Enemy被击中
                // e.enemy.Recycle();
                // this._Score += 1;
                console.log("分数 +1");
            }
            console.log(this.bType);
        }, this)
    }

    public Recycle() {
        this.inUse = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frame, this)
    }
}