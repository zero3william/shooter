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
            var bullet  = new BulletObject(main);
            this._bulletArr.push(bullet);
        }
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
        for(let i = 0; i < this._bulletArr.length; i++) {
            if (this._bulletArr[i].inUse === true) {  
                if (this._bulletArr[i].bType === BulletType.ENEMY) {  
                    isHit = this.hitTest(e, this._bulletArr[i])
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
                if (isHit) {  //如果碰撞检测为true，那么触发HitEvent事件，并传递检测结果，并手动调用子弹的回收方法
                    this.dispatchEvent(this._hitEvent);
                    // this._bulletArr[i].Recycle();
                }
            }
        }
        return isHit;
    }

    private hitTest(e: egret.DisplayObjectContainer,b: BulletObject):boolean {
        return true;
    }

}