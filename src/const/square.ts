const squareType = {
    O: [[1, 1], [1, 1]],
    I: [[1], [1], [1], [1]],
    S: [[0, 1, 1], [1, 1, 0]],
    Z: [[1, 1, 0], [0, 1, 1]],
    L: [[1, 0], [1, 0], [1, 1]],
    J: [[0, 1], [0, 1], [1, 1]],
    T: [[1, 1, 1], [0, 1, 0]]
};

const maxLength = {
    O: 2,
    I: 1,
    S: 3,
    Z: 3,
    L: 2,
    J: 2,
    T: 3
};


const BASIC_ROW = 20;
const BASIC_COL = 20;
let matrix: number[][] = [];
for (let i = 0; i < BASIC_ROW; i++) {
    let initLine = [];
    for (let i = 0; i < BASIC_COL; i++) {
        initLine.push(0);
    }
    matrix.push(initLine);
}
export {matrix, squareType, maxLength, BASIC_ROW, BASIC_COL};
