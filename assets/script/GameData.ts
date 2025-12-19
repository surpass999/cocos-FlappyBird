import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


export class GameData {
    // 分数
    private static _score: number = 0;

    // 获取分数
    public static get score(): number {
        return this._score;
    }

    // 设置分数
    public static set score(value: number) {
        this._score = value;
    }
}


