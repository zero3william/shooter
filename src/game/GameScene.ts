class GameScene extends Scene {
	public toEndBtn: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/game/GameScene.exml";
	}
	protected onComplete() {
		this.toEndBtn.touchEnabled = true;
		this.toEndBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.endGame, this);
	}
	private endGame() {
		let s1: EndScene = new EndScene();
		SceneManager.Instance.changeScene(s1);
	}
}