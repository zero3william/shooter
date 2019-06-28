class SceneManager {
	private static _manager: SceneManager;
	public static get Instance() {
		if (SceneManager._manager == null) {
			SceneManager._manager = new SceneManager();
		}
		return SceneManager._manager;
	}
	public constructor() {

	}
	public rootLayer: eui.UILayer;
	private currentScene: Scene;
	private pop_scene: Scene;

	public changeScene(s: Scene) {
		if (this.currentScene) {
			this.rootLayer.removeChild(this.currentScene);
			this.currentScene = null;
		}
		this.rootLayer.addChild(s);
		this.currentScene = s;
	}

	public pushScene(s: Scene) {
		this.popScene();
		if (!this.pop_scene) {
			this.rootLayer.addChild(s);
			this.pop_scene = s;
		}
	}

	public popScene() {
		if (this.pop_scene) {
			this.rootLayer.removeChild(this.pop_scene);
			this.pop_scene = null;
		}
	}
}