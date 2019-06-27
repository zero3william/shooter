class GameScene extends Scene {
	public toEndBtn: eui.Label;
	public bgAnimate: egret.tween.TweenGroup;

	public constructor() {
		super();
		this.skinName = "resource/game/GameScene.exml";
	}
	protected onComplete() {
		this.toEndBtn.touchEnabled = true;
		this.toEndBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.endGame, this);
		this.playAnimation(this.bgAnimate,true);
	}
	private endGame() {
		let s1: EndScene = new EndScene();
		SceneManager.Instance.changeScene(s1);
	}

	private playAnimation(target:egret.tween.TweenGroup,isLoop:boolean):void {
    if(isLoop)
    {
        for(var key in target.items)
        {
            target.items[key].props = {loop:true};
        }
    }
    target.play();
	} 
}