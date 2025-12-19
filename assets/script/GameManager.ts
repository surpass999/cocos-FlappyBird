import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


// 游戏状态
export enum GameState {
    READY,
    PLAYING,
    OVER
}

@ccclass('GameManager')
export class GameManager extends Component {


    private static _instance: GameManager = null;

    // 当前游戏状态
    private _currentState: GameState = GameState.READY;

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

    // 将游戏设置为指定状态
    public setGameState(state: GameState) {
        this._currentState = state;
    }
    // 获取当前游戏状态
    public getGameState(): GameState {
        return this._currentState;
    }

    start() {
        
    }

    update(deltaTime: number) {
        
    }
}


