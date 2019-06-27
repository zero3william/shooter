class StartScene extends Scene {
	public menuTitle: eui.Label;
	public toStartBtn: eui.Button;


	public constructor() {
		super();
		this.skinName = "resource/game/StartScene.exml";
	}
	protected onComplete() {
		this.menuTitle.touchEnabled = true;
		this.menuTitle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToast, this);
		this.toStartBtn.touchEnabled = true;
		this.toStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
	}
	private onToast() {
		let toast: Toast = new Toast();
		SceneManager.Instance.pushScene(toast);
	}
	private startGame() {
		let s1: GameScene = new GameScene();
		SceneManager.Instance.changeScene(s1);
	}
}