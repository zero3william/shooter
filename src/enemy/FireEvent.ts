class FireEvent extends egret.Event {
    public static EventString = "Fire";
    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}