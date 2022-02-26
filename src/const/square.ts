const square = {
    O: [[1, 1], [1, 1]],
    I: [[1], [1], [1], [1]],
    S: [[0, 1, 1], [1, 1, 0]],
    Z: [[1, 1, 0], [0, 1, 1]],
    L: [[1, 0], [1, 0], [1, 1]],
    J: [[0, 1], [0, 1], [1, 1]],
    T: [[1, 1, 1], [0, 1, 0]]
};

const blockTypes = ["O", "I", "S", "Z", "L", "J", "T"];
const row = 20;
const column = 10;
let matrix: number[][] = [];
for (let i = 0; i < row; i++) {
    let initLine = [];
    for (let i = 0; i < column; i++) {
        initLine.push(0);
    }
    matrix.push(initLine);
}
export {matrix, square, blockTypes};
