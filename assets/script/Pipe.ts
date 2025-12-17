import { _decorator, Component, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Pipe')
export class Pipe extends Component {

    // 移动速度
    
    private moveSpeed: number = 100;

    start() {
        this.moveSpeed = GameManager.instance().moveSpeed;
    }

    update(deltaTime: number) {
        this.node.setPosition(this.node.position.x - this.moveSpeed * deltaTime, this.node.position.y);
    }
}


