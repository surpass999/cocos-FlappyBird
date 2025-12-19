import { _decorator, Component, EventTouch, Game, Input, input, Node } from 'cc';
import { GameManager, GameState } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('Launch')
export class Launch extends Component {


    onLoad() {
        console.log('页面加载了');
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    start() {
        console.log('游戏开始了');
    }

    update(deltaTime: number) {
        
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    // 触摸开始回调
    onTouchStart(event: EventTouch) {
        // Handle touch start event
        console.log('Touch started on Launch component');
        GameManager.instance().setGameState(GameState.PLAYING);
        // this.node.active = false;
    }
}


