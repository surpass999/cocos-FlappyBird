import { _decorator, Component, Node } from 'cc';
import { GameData } from '../GameData';
import { GameManager, GameState } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('Gameing')
export class Gameing extends Component {
    start() {
        console.log('游戏进行中');
        
    }

    update(deltaTime: number) {
        console.log('Gameing update');
        if(GameManager.instance().getGameState() !== GameState.PLAYING) {
            this.node.active = false;
        }
        
        // 游戏运行时 每0.5秒获取一次分数 并更新显示
        if(GameManager.instance().getGameState() === GameState.PLAYING) {
             this.node.active = true;
            // 每0.5秒从GameData获取一次分数 并打印
            setInterval(() => {
                console.log('当前分数:', GameData.score);
            }, 500);
        }
    }
}


