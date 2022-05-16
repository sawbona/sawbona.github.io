class Randoms {
    range(lower, upper) {
        const diff = upper - lower;
        const rand = Math.random() * diff;
        return Math.floor(lower + rand);
    }
    rand(upper) {
        return this.range(0, upper);
    }
}

export const randoms = new Randoms();