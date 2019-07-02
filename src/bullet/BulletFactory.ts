class BulletFactory extends egret.DisplayObjectContainer {
    _main: any;
    _bulletArr: Array<BulletObject> = [];
    _hitEvent: HitEvent;
    public constructor() {
        super();
    }
    /**
     * 初始化对象池
     */
    public Init(main: any) {
        this._main = main;
        for (var i = 0; i < 50; i++) {
            var bullet = new BulletObject(main);
            this._bulletArr.push(bullet);
        }

        this.addEventListener(HitEvent.EventString, (e: HitEvent) => {
            console.log("碰撞事件触发");
            if (e.hType === HitType.ENEMY_HIT_HERO) {
                //Hero被击中
                console.log("life -1");
            }
            if (e.hType === HitType.HERO_HIT_ENEMY) {
                //Enemy被击中
                // e.enemy.Recycle();
                // this._Score += 1;
                console.log("分数 +1");
            }
        }, this)
    }

    public GetBullet(): BulletObject {
        for (let i = 0; i < this._bulletArr.length; i++) {
            if (this._bulletArr[i].inUse == false) {
                return this._bulletArr[i];
            }
        }
    }

    public IsHit(e: egret.DisplayObjectContainer): boolean {
        // let arr = this._main._EnemyFactory.GetIsUsePlane(); //1.从敌机对象池中取出已经在使用的飞机
        let isHit = false;
        this._hitEvent = new HitEvent(HitEvent.EventString);
        for (let i = 0; i < this._bulletArr.length; i++) {
            if (this._bulletArr[i].inUse === true) {
                if (this._bulletArr[i].bType === BulletType.ENEMY) {
                    isHit = this.hitTest(e, this._bulletArr[i]);
                    this._hitEvent.hType = HitType.ENEMY_HIT_HERO;
                }
                // if (this._bulletArr[i].bType == IdentityType.HERO) { //4.如果是主角发射的。那么就和第一步的取出来的数组进行碰撞检测
                //     ; j < arr.length; j++) {
                //         if (arr[j].IsUse) {
                //             isHit = GameUtils.hitTest(arr[j], this._bulletArr[i])
                //             hitevent.enemy = arr[j];
                //             hitevent.hType = HitType.HERO_TO_ENEMY;
                //         }
                //     }
                // }
                if (isHit) {
                    this.dispatchEvent(this._hitEvent);
                    this._bulletArr[i].Recycle(isHit);
                }
            }
        }
        return isHit;
    }

    private hitTest(e: egret.DisplayObjectContainer, b: BulletObject): boolean {
        // Rect1
        let minX1 = e.x,
            maxX1 = e.x + e.width,
            minY1 = e.y,
            maxY1 = e.y + e.height;
        // Rect2
        let minX2 = b.x,
            maxX2 = b.x + b.width,
            minY2 = b.y,
            maxY2 = b.y + b.height;
        if (maxX1 > minX2 && maxX2 > minX1 && maxY1 > minY2 && maxY2 > minY1) {
            return true;
        }
        else {
            return false;
        }
    }

}