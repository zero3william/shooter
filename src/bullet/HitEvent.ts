class HitEvent extends egret.Event {
    public static EventString = "Hit";
    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}