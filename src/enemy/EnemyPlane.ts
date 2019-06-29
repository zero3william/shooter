class EnemyPlane extends egret.DisplayObjectContainer {
    _enemy: egret.Bitmap;
    _timer: egret.Timer;
    _speed: number = 2;
    _type: EnemyType = EnemyType.SHIP;
    _enemyOpenFireEvent: FireEvent;
    _bulletPool: BulletFactory;
    
    public IsUse: boolean = false;
    _main: any;
    public constructor(main: any, type: EnemyType) {
        super();
        this._main = main;
        this._type = type;
        this._enemy = new egret.Bitmap();
        this.addChild(this._enemy);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {}, this);

        this._bulletPool = this._main._bulletPool;

        //定時產生子彈
        this._timer = new egret.Timer(2500)
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this)

        this._enemyOpenFireEvent = new FireEvent(FireEvent.EventString);

        this.addEventListener(FireEvent.EventString, (e: FireEvent) => {
            let bullet = this._bulletPool.GetBullet();
            if (bullet == undefined) {
                return;
            }
            let bx = this.x + this.width/2 - bullet.width/2;
            let by = this.y + 10;
            bullet.Use(BulletType.ENEMY, bx, by);
        }, this)
    }

    private timerFunc(): void {
        this.dispatchEvent(this._enemyOpenFireEvent);
    }

    public Use() {
        this.IsUse = true;
        this.y = -this.height; 
        this._main.addChildAt(this, 20)
        this.addEventListener(egret.Event.ENTER_FRAME, this.frame, this)
        this._timer.start();
    }

    public Recycle() {
        this.IsUse = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frame, this)
        this._timer.stop();
    }
    frame() {
        if (this.IsUse) {
            this.y += this._speed;
            if (this.y >= 736) {
                if (this.parent) {
                    this.parent.removeChild(this);
                    this.Recycle();
                }
            }
        }
    }
}