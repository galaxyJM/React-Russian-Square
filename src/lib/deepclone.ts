export function deepClone(aim: number[][]) {
    let res = [];
    for (let i = 0; i < aim.length; i++) {
        res.push([...aim[i]]);
    }
    return res;
}