function canWeMove(square: TsSquare, matrix: number[][], {x: wantMoveX, y: wantMoveY}: Offset) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 1) {
                if (!matrix[i + wantMoveY] || matrix[i + wantMoveY][j] === 2 || matrix[i][j + wantMoveX] === 2 ||
                    matrix[i][j + wantMoveX] === undefined) {
                    return false;
                }
            }
        }
    }
    return true;
}

export default canWeMove;