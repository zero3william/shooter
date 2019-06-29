    class EnemyFactory extends egret.DisplayObjectContainer {
        _timer: egret.Timer;
        _main: any;
        public constructor() {
            super();
        }
        _enemys: EnemyPlane[] = [];
        _giveevent: AddShipEnemyEvent;
        /**
         * 初始化对象池
         */
        public Init(main: any) {
            this._main = main;
            for (var i = 0; i < 10; i++) {
                var p = new ShipEnemyPlane(main)
                this._enemys.push(p)
            }
            this._giveevent = new AddShipEnemyEvent(AddShipEnemyEvent.EventName);
            this._timer = new egret.Timer(5000);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this)
            this._timer.start();
            this.addEventListener(AddShipEnemyEvent.EventName, (e: AddShipEnemyEvent) => {
                var x = Math.random() * 355.2;
                var ship = this.GetSamllEnemyObject(EnemyType.SHIP);
                ship.x = x;
                ship.Use();
            }, this)
        }
        /**
     * 定时调用
     */
        public timerFunc() {
            this.dispatchEvent(this._giveevent);
        }
        public GetSamllEnemyObject(type: EnemyType): ShipEnemyPlane {
            for (var i = 0; i < this._enemys.length; i++) {
                if (!this._enemys[i].IsUse && this._enemys[i]._type == type) {
                    return this._enemys[i];
                }
            }
        }
    }