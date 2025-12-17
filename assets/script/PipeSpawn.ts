import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipeSpawn')
export class PipeSpawn extends Component {

    @property(Prefab)
    pipePrefab: Prefab = null;

    @property
    spawnRand: number = 0.5;

    private spawnTimer: number = 0;
        

    start() {

    }

    update(deltaTime: number) {
        this.spawnTimer += deltaTime;
        // 达到生成间隔，生成新的管道
        if (this.spawnTimer >= this.spawnRand) {
            this.spawnTimer = 0;
            const newPipe = instantiate(this.pipePrefab);
            this.node.addChild(newPipe);
            // 设置管道的垂直位置为随机值
            let p = this.node.getWorldPosition();
            newPipe.setWorldPosition(p);

            let PLocal = newPipe.getPosition();
            console.log('Spawn Pipe Local:', PLocal);
            const randY = math.randomRangeInt(-150, 300); // 随机范围[-150, 300]
            newPipe.setPosition(PLocal.x, PLocal.y + randY);

        }
    }
}


