export class G964 {
    public static exEuler = (n: number) => {
        const range = Array.from(
            { length: n + 1 },
            (_, index) => index * (1 / n)
        );
        const euler = createEulerY(n, dydt);

        // apparently faster but not functional
        // const Y = [1];
        //
        // const Z = range.map(zt);
        // range.forEach((t, index) => {
        //     return Y.push(euler(t, Y[index]));
        // });

        const Z = range.map(zt);
        const Y = range.reduce(
            (yArr, t, index) => {
                return [...yArr, euler(t, yArr[index])];
            },
            [1]
        );

        return meanRelativeError(
            Z.map<[number, number]>((z, index) => [z, Y[index]]).map(
                relativeError
            )
        )
            .toString()
            .slice(0, 8);

        function createEulerY(n: number, dd: (t: number, y: number) => number) {
            const h = 1 / n;
            return function eulerY(t: number, y: number) {
                return y + dd(t, y) * h;
            };
        }

        function zt(t: number) {
            return 1 + 0.5 * Math.exp(-4 * t) - 0.5 * Math.exp(-2 * t);
        }

        function dydt(t: number, y: number) {
            return 2 - Math.exp(-4 * t) - 2 * y;
        }

        function relativeError(values: [number, number]) {
            const [zk, yk] = values;
            return Math.abs(yk - zk) / zk;
        }

        function meanRelativeError(errors: number[]) {
            return errors.reduce((sum, err) => sum + err, 0) / errors.length;
        }
    };
}

console.log(G964.exEuler(10), 0.026314);
