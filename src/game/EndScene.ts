class EndScene extends Scene {
	public toMenuBtn: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/game/EndScene.exml";
	}
	protected onComplete() {
		this.toMenuBtn.touchEnabled = true;
		this.toMenuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toMenu, this);
	}
	private toMenu() {
		let s1: StartScene = new StartScene();
		SceneManager.Instance.changeScene(s1);
	}
}