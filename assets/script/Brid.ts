import { _decorator, Component, EventTouch, Input, input, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Brid')
export class Brid extends Component {

    // 设置刚体组件
    private rigidbody: RigidBody2D = null;

    // 小鸟低头速度
    @property
    downSpeed: number = 30;

    // 生命周期方法 - 组件加载时调用
    onLoad() {
        
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    start() {
        this.rigidbody = this.getComponent(RigidBody2D);
    }

    update(deltaTime: number) {
        this.node.angle -= this.downSpeed * deltaTime;
        if (this.node.angle < -60) {
            this.node.angle = -60;
        }
    }

    // 销毁后移除事件监听
    onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart(event: EventTouch) {
        // Handle touch start event
        console.log('Touch started on Brid component');
        this.rigidbody.linearVelocity = new Vec2(0, 10); // Example: Apply an upward force
        // this.node.setRotationFromEuler(new Vec3(0, 0, 45)); // Example: Rotate the node
        this.node.angle = 30; // Rotate the node by 30 degrees
    }
}