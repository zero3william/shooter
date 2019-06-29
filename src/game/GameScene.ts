class GameScene extends Scene {
	private toEndBtn: eui.Label;
	private bgAnimate: egret.tween.TweenGroup;
	private player: eui.Component;
	private moveSpeed: number = 20;
	private attackRate: number = 500;
	private reloading: Boolean = false; 
	private _EnemyFactory: EnemyFactory = new EnemyFactory();
	private _bulletPool: BulletFactory = new BulletFactory();
	private keydownObj = {
		left: false,
		up: false,
		right: false,
		down: false,
		spacebar: false
	};

	public constructor() {
		super();
		this.skinName = "resource/game/GameScene.exml";
	}
	protected onComplete() {
    	this._EnemyFactory.Init(this);
		this._bulletPool.Init(this);

		this.toEndBtn.touchEnabled = true;
		this.toEndBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.endGame, this);
		this.playAnimation(this.bgAnimate, true);

		enum keyCode {
			spacebar = 32,
			left = 37,
			up,
			right,
			down
		}
		document.addEventListener("keydown", (evt) => {
			switch (evt.keyCode) {
				case keyCode.left:
					this.keydownObj.left=true;
					break;
				case keyCode.up: 
					this.keydownObj.up=true;
					break;
				case keyCode.right:
					this.keydownObj.right=true;
					break;
				case keyCode.down:
				 	this.keydownObj.down=true;
					break;
				case keyCode.spacebar:
					this.keydownObj.spacebar=true;
					this.tryShoot();
					break;
				default:
			}
		});
		document.addEventListener("keyup", (evt) => {
			switch (evt.keyCode) {
				case keyCode.left:
					this.keydownObj.left=false;
					break;
				case keyCode.up: 
					this.keydownObj.up=false;
					break;
				case keyCode.right:
					this.keydownObj.right=false;
					break;
				case keyCode.down:
				 	this.keydownObj.down=false;
					break;
				case keyCode.spacebar:
				 	this.keydownObj.spacebar=false;
					break;
				default:
			}
		});

		egret.setInterval(()=>{
			if(this.keydownObj.left && this.keydownObj.up) {
				this.move(this.player,[-5,-5]);
				this.player.currentState = "left";
			} else if(this.keydownObj.left && this.keydownObj.down) {
				this.move(this.player,[-5,5]);
				this.player.currentState = "left";
			} else if(this.keydownObj.right && this.keydownObj.up) {
				this.move(this.player,[5,-5]);
				this.player.currentState = "right";
			}  else if(this.keydownObj.right && this.keydownObj.down) {
				this.move(this.player,[5,5]);
				this.player.currentState = "right";
			} else if (this.keydownObj.left) {
				this.move(this.player,[-5,0]); 
				this.player.currentState = "left";
			} else if (this.keydownObj.right ) {
				this.move(this.player,[5,0]);
				this.player.currentState = "right";
			} else if (this.keydownObj.up) {
				this.move(this.player,[0,-5]);
			} else if (this.keydownObj.down) {
				this.move(this.player,[0,5]);
			}
		},this,this.moveSpeed);

		egret.setInterval(()=>{
			if(this.keydownObj.spacebar) {
				this.tryShoot();
			}
		},this,this.attackRate)

		this.addEventListener(egret.Event.ENTER_FRAME, (e) => {
			//判断子弹是否和飞机碰撞
			let isHit = this._bulletPool.IsHit(this.player);
	
			//判断Enemy是否和主角碰撞
		}, this);

	
	}

	private tryShoot() {
		if(!this.reloading) {
			let b = this._bulletPool.GetBullet();
			if (b === undefined) {
				return;
			} else {
				b.Use(BulletType.HERO, this.player.x + this.player.width / 2 - b.width/2, this.player.y - b.height)
				this.reloading = true;
				egret.setTimeout(()=>{	
					this.reloading = false;
				},this,this.attackRate)
			}
		}
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
	private move(obj: eui.Component, offset: [number, number]) {
		let tween: egret.Tween = egret.Tween.get(obj);
		tween.to({ x: obj.x + offset[0], y: obj.y + offset[1] }, this.moveSpeed);
	}

}