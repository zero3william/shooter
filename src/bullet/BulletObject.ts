class BulletObject extends egret.DisplayObjectContainer {
    private _bullet: egret.Bitmap;
    private _main: Main;
    private _speed: number = 10;
    private wBoom: number = 56;
    private hBoom: number = 56;
    public width: number = 8;
    public height: number = 30;

    public bType: BulletType;
    public inUse: boolean = false;

    public constructor(main: any) {
        super();
        this._main = main;
        this._bullet = new egret.Bitmap();
        this._bullet.smoothing = true;
        this.addChild(this._bullet)
    }

    frame() {
        if (this.inUse) {
            if (this.bType == BulletType.ENEMY) {
                this.y += this._speed;
                if (this.y >= 716) {
                    if (this.parent) {
                        this.parent.removeChild(this);
                        this.Recycle(false);
                    }
                }
            } else if (this.bType == BulletType.HERO) {
                this.y -= this._speed;
                if (this.y <= 0) {
                    if (this.parent) {
                        this.parent.removeChild(this);
                        this.Recycle(false);
                    }
                }
            }
        }
    }

    public Use(type: BulletType, x: number, y: number) {
        this.inUse = true;
        this._bullet.width = this.width;
        this._bullet.height = this.height;
        this._bullet.alpha = 1;
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
    }

    public Recycle(isHit: boolean) {
        this._bullet.width = this.wBoom;
        this._bullet.height = this.hBoom;
        if (isHit) {
            if (this.bType === BulletType.ENEMY) {
                this._bullet.texture = RES.getRes("laserGreenShot_png");
                let tween: egret.Tween = egret.Tween.get(this._bullet);
                tween.to({ alpha: 0.5 }, 200)
                    .to({ alpha: 0.7 }, 150)
                    .to({ alpha: 0.2 }, 200)
                    .to({ alpha: 0.4 }, 150)
                    .to({ alpha: 0 }, 100)
                    .call(() => { this.inUse = false; });
            } else {
                this._bullet.texture = RES.getRes("laserGreenShot_png");
                let tween: egret.Tween = egret.Tween.get(this._bullet);
                tween.to({ alpha: 0.5 }, 200)
                    .to({ alpha: 0.7 }, 150)
                    .to({ alpha: 0.2 }, 200)
                    .to({ alpha: 0.4 }, 150)
                    .to({ alpha: 0 }, 100)
                    .call(() => { this.inUse = false; });
            }
        } else {
            this.inUse = false;
        }
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frame, this)
    }
}