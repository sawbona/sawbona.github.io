export class RandomUtils {
    static range(lower, upper) {
        const diff = upper - lower;
        const rand = Math.random() * diff;
        return lower + rand;
    }
}

