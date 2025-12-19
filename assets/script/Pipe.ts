import { _decorator, Component, Node } from 'cc';
import { GameManager, GameState } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Pipe')
export class Pipe extends Component {

    // 移动速度
    
    private moveSpeed: number = 100;

    start() {
        this.moveSpeed = GameManager.instance().moveSpeed;
    }

    update(deltaTime: number) {
        if(GameManager.instance().getGameState() !== GameState.PLAYING) {
            return;
        }
        this.node.setPosition(this.node.position.x - this.moveSpeed * deltaTime, this.node.position.y);
        if(this.node.position.x < -900) {
            this.node.destroy();
        }
    }
}


