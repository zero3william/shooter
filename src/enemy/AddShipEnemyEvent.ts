    class AddShipEnemyEvent extends egret.Event {
        public static EventName = "AddShipEnemy"
        public planetype: EnemyType = EnemyType.SHIP;
        public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
            super(type, bubbles, cancelable);
        }
    }