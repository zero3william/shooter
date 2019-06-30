class HitEvent extends egret.Event {
    public static EventString = "Hit";
    public hType: HitType;
    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}