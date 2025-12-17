import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private static _instance: GameManager = null;

    // 获取单例
    public static instance(): GameManager {

        return this._instance;
    }

    // 移动速度
    @property
    moveSpeed: number = 100;


    onLoad() {

        // 防止重复创建单例
        if (!GameManager._instance) {
            GameManager._instance = this;
        } 
    }

    start() {
        
    }

    update(deltaTime: number) {
        
    }
}


