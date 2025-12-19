import { _decorator, Animation, Collider2D, Component, Contact2DType, EventTouch, Input, input, IPhysics2DContact, log, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
import { GameManager, GameState } from './GameManager';
import { Tags } from './Tags';
import { GameData } from './GameData';
import { Launch } from './UI/Launch';
import { Gameing } from './UI/Gameing';
const { ccclass, property } = _decorator;

@ccclass('Brid')
export class Brid extends Component {

    // 设置刚体组件
    private rigidbody: RigidBody2D = null;

    // 游戏Launch管理器
    @property(Launch)
    launch:Launch = null;

    // 游戏Gameing管理器
    @property(Gameing)
    gameing:Gameing = null;

    // 小鸟低头速度
    @property
    downSpeed: number = 30;

    // 设置初始状态
    private _initialBrid: boolean = false;

    // 生命周期方法 - 组件加载时调用
    onLoad() {
        console.log('Brid onLoad');
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);

        // 注册碰撞回调
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            // collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            // collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }
    }

    start() {
        this.rigidbody = this.getComponent(RigidBody2D);
        
    }

    update(deltaTime: number) {
        if(GameManager.instance().getGameState() === GameState.READY) {
            this.launch.node.active = true;
            this.gameing.node.active = false;
        }


        if(GameManager.instance().getGameState() !== GameState.PLAYING) {
            this.rigidbody.getComponent(Animation).enabled = false;
            this.rigidbody.gravityScale = 0;
            // 停止小鸟的任何运动
            this.rigidbody.linearVelocity = new Vec2(0, 0);
            this.rigidbody.angularVelocity = 0;
            if(this.node.angle <= -60) {
                this.node.angle = -60;
            }
            return;
        } else if (!this._initialBrid) {
            this.rigidbody.getComponent(Animation).enabled = true;
            this.rigidbody.gravityScale = 1;
            this.rigidbody.linearVelocity = new Vec2(0, 5);
            this.gameing.node.active = true;
            this._initialBrid = true;
        }
        
        this.node.angle -= this.downSpeed * deltaTime;
        if(this.node.angle <= -60) {
            this.node.angle = -60;
        }
    }

    // 销毁后移除事件监听
    onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    // 触摸开始回调
    onTouchStart(event: EventTouch) {
        if(GameManager.instance().getGameState() !== GameState.PLAYING) {
            this._initialBrid = false;
            return;
        }
        // Handle touch start event
        console.log('Touch started on Brid component');
        this.rigidbody.linearVelocity = new Vec2(0, 5); // Example: Apply an upward force
        // this.node.setRotationFromEuler(new Vec3(0, 0, 45)); // Example: Rotate the node
        this.node.angle = 30; // Rotate the node by 30 degrees
        // this.node.setRotationFromEuler(new Vec3(0, 0, 30));
    }

    // 碰撞开始回调
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact:IPhysics2DContact | null) {
        console.log('Collision began');
        console.log('Self Collider:', selfCollider);
        console.log('Other Collider:', otherCollider);
        console.log('Other Node:', otherCollider.node);
        console.log('Other Node Name:', otherCollider.node.name);
        console.log('碰撞标签：', selfCollider.tag, '-', otherCollider.tag);
        // 碰撞后地面或者圆柱将游戏状态设置为结束
        if(otherCollider.tag !== Tags.PIPE_MIDDLE) {
            GameManager.instance().setGameState(GameState.OVER);
        }
        
        if (contact) {
            console.log('Contact:', contact);
        }
    }
    // 碰撞结束回调
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact:IPhysics2DContact | null) {
        console.log('Collision ended');
        if(otherCollider.tag === Tags.PIPE_MIDDLE) {
            // 得分逻辑
            console.log('Passed through the pipe middle, score +1');
            GameData.score += 1;
        }
    }

    // 
}