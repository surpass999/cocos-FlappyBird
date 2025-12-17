import { _decorator, Component, Node, UITransform } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('MoveElement')
export class MoveElement extends Component {

    @property(Node)
    targetNode1: Node = null;


    @property(Node)
    targetNode2: Node = null;

    // 移动速度

    private moveSpeed: number = 100;

    // 设置偏移量
    @property
    offset: number = 728;

    start() {
        this.moveSpeed = GameManager.instance().moveSpeed;
    }

    update(deltaTime: number) {
        
        if (this.targetNode1 && this.targetNode2) {
            // 设置移动方向和距离
            const moveDistance = this.moveSpeed * deltaTime;
            const node1Position = this.targetNode1.getPosition();
            const node2Position = this.targetNode2.getPosition();
            this.targetNode1.setPosition(node1Position.x - moveDistance, node1Position.y);
            this.targetNode2.setPosition(node2Position.x - moveDistance, node2Position.y);
            // 打印当前节点宽度
            console.log(this.targetNode1.getComponent(UITransform).width);
            // 如果节点1移出屏幕左侧，重置位置到节点2的右侧
            if (node1Position.x < -730) {
                let newX = this.targetNode2.getPosition().x + this.offset;
                this.targetNode1.setPosition(newX, node1Position.y);
            }
            // 如果节点2移出屏幕左侧，重置位置到节点1的右侧
            if (node2Position.x < -730) {
                let newX = this.targetNode1.getPosition().x + this.offset;
                this.targetNode2.setPosition(newX, node2Position.y);
            }
        }
    }
}


