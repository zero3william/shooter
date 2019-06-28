class FireEvent extends egret.Event {
    public static EventString = "Fire";
    public Btype: BulletType = BulletType.HERO;
    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}