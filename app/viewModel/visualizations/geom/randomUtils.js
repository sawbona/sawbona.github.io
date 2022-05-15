class Randoms {
    range(lower, upper) {
        const diff = upper - lower;
        const rand = Math.random() * diff;
        return Math.floor(lower + rand);
    }
}

export const randoms = new Randoms();