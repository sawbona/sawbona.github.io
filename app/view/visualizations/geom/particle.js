import { MatrixBase, constOperations, mutOperations as mutate } from './matrix.js';

export class Particle {
    constructor() {
        this.position = MatrixBase.vector(0, 0, 0);
        this.direction = MatrixBase.vector(1, 0, 0);
        this.speed = 1 / (1 * 1000);
    }

    /**
     * @param {any} value
     */
    set speed(value) {
        mutate.multiplyScalar(this.direction, value);
    }

    /**
     * 
     * @param {number} dt ellapsed milliseconds.
     */
    update(dt) {
        mutate.sum(this.position, constOperations.multiplyScalar(this.direction, dt));
    }
}
