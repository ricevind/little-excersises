export function calculate(expression: string): number | string {
    const operands = {
        '+': sum,
        '-': sub,
        '*': multi,
        '$': div,
    };
    const regexp = /([\d.]+)([$*+-])?/g;
    const matchIterator = matchAll(expression, regexp);
    const commands = Array.from(matchIterator)
        .reduce(
            (commands, match) => [...commands, match[1], match[2]],
            [] as string[]
        )
        .filter(Boolean);

    const v =  Number.parseFloat(doCalc(commands));

    return Number.isNaN(v) ? '400: Bad request' : v;

    function doCalc(commands: string[]): string {
        if (commands.length === 1) {
            return commands[0];
        }

        const indexOfDiv = commands.findIndex(el => el === '$');
        const indexOfMul = commands.findIndex(el => el === '*');
        const indexOfSub = commands.findIndex(el => el === '-');
        const indexOfAdd = commands.findIndex(el => el === '+');

        if (indexOfDiv !== -1) {
            const div = operands['$'](
                Number.parseFloat(commands[indexOfDiv - 1]),
                Number.parseFloat(commands[indexOfDiv + 1])
            );

            commands.splice(indexOfDiv - 1, 3, div.toString());
            return doCalc(commands);
        }

        if (indexOfMul !== -1) {
            const mul = operands['*'](
                Number.parseFloat(commands[indexOfMul - 1]),
                Number.parseFloat(commands[indexOfMul + 1])
            );

            commands.splice(indexOfMul - 1, 3, mul.toString());
            return doCalc(commands);
        }

        if (indexOfSub !== -1) {
            const sub = operands['-'](
                Number.parseFloat(commands[indexOfSub - 1]),
                Number.parseFloat(commands[indexOfSub + 1])
            );

            commands.splice(indexOfSub - 1, 3, sub.toString());
            return doCalc(commands);
        } else {
            const add = operands['+'](
                Number.parseFloat(commands[indexOfAdd - 1]),
                Number.parseFloat(commands[indexOfAdd + 1])
            );

            commands.splice(indexOfAdd - 1, 3, add.toString());
            return doCalc(commands);
        }
    }

    function sum(a: number, b: number) {
        return a + b;
    }

    function sub(a: number, b: number) {
        return a - b;
    }

    function multi(a: number, b: number) {
        return a * b;
    }

    function div(a: number, b: number) {
        return a / b;
    }

    function* matchAll(
        str: string,
        reg: RegExp
    ): IterableIterator<RegExpExecArray> {
        while (true) {
            const match = reg.exec(str);
            if (match === null) {
                return;
            }

            yield match;
        }
    }
}
