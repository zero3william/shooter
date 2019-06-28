class GameScene extends Scene {
	private toEndBtn: eui.Label;
	private bgAnimate: egret.tween.TweenGroup;
	private player: eui.Component;
	private duration: number = 50;

	public constructor() {
		super();
		this.skinName = "resource/game/GameScene.exml";
	}
	protected onComplete() {
		this.toEndBtn.touchEnabled = true;
		this.toEndBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.endGame, this);
		this.playAnimation(this.bgAnimate, true);

		let bulletArr = this.bulletArr;
		console.log(bulletArr);
		for (var i = 0; i < 50; i++) {
			var bullet = new BulletObject(this);
			bulletArr.push(bullet)
		}

		let that = this;
		document.addEventListener("keydown", function _onKeyDown(evt) {
			document.removeEventListener("keydown", _onKeyDown, true);
			let intervalId: number;
			enum keyCode {
				spacebar = 32,
				left = 37,
				up,
				right,
				down
			}
			switch (evt.keyCode) {
				case keyCode.left:
					intervalId = egret.setInterval(that.move, that, that.duration, that.player, [-5, 0]);
					that.player.currentState = "left"
					break;
				case keyCode.up:
					intervalId = egret.setInterval(that.move, that, that.duration, that.player, [0, -5]);
					break;
				case keyCode.right:
					intervalId = egret.setInterval(that.move, that, that.duration, that.player, [5, 0]);
					that.player.currentState = "right"
					break;
				case keyCode.down:
					intervalId = egret.setInterval(that.move, that, that.duration, that.player, [0, 5]);
					break;
				case keyCode.spacebar:
					let b = that.GetBullet();
					if (b == undefined) {
						console.log("对象池中没有对象")
						return;
					}
					b.Use(BulletType.HERO, that.player.x + that.player.width / 2, that.player.y - 18)
					break;
				default:
					console.log(evt.keyCode);
			}
			document.addEventListener("keyup", function _onKeyUp() {
				document.removeEventListener("keyup", _onKeyUp, true);
				that.player.currentState = "normal";
				egret.clearInterval(intervalId);
				document.addEventListener("keydown", _onKeyDown);
			});
		});
	}

	private endGame() {
		let s1: EndScene = new EndScene();
		SceneManager.Instance.changeScene(s1);
	}
	private playAnimation(target: egret.tween.TweenGroup, isLoop: boolean): void {
		if (isLoop) {
			for (let key in target.items) {
				target.items[key].props = { loop: true };
			}
		}
		target.play();
	}
	private move(obj: eui.Image, offset: [number, number]) {
		let tween: egret.Tween = egret.Tween.get(obj);
		tween.to({ x: obj.x + offset[0], y: obj.y + offset[1] }, this.duration);
	}

	public GetBullet(): BulletObject {
		for (var i = 0; i < this.bulletArr.length; i++) {
			if (this.bulletArr[i].inUse == false) {
				return this.bulletArr[i];
			}
		}
		console.log("对象池已经用光了，可能是没有回收")
	}

}