class Toast extends Scene {
	public btn_close: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/game/toast.exml";
	}
	protected onComplete() {
		this.btn_close.touchEnabled = true;
		this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapclose, this);
	}
	private onTapclose() {
		SceneManager.Instance.popScene();
	}
}