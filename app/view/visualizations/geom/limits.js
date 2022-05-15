export class Limits {

    static mod(value, div) {
        const rest = value % div;
        return (rest + div) % div;
    }

    static extendedMod(value, low, high) {
        return low + this.mod(value, (high - low));
    }
}


//       0  1   2  3   4   5   6
//       -7 -6 -5 -4  -3  -2  -1
//       0  1   2  3   4   5   6
//       7  8   9  10  11 12   13