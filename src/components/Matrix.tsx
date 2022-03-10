import React, {useEffect, useRef, useState} from "react";
import '../App.scss';
import {deepClone} from "../lib/deepclone";
import {useSquare} from "../hooks/useSquare";
import canWeMove from "../lib/canWeMove";


type Props = {
    matrix: number[][]
}


export function Matrix(props: Props) {
    const [matrix, setMatrix] = useState(deepClone(props.matrix));
    const matrixRef = useRef<number[][]>(deepClone(props.matrix));
    const [square, update, resetSquare] = useSquare();

    function left() {
        if (canWeMove(square, matrixRef.current, {x: -1, y: 0})) {
            update(-1, 0, false);
        }

    }

    function right() {
        if (canWeMove(square, matrixRef.current, {x: 1, y: 0})) {
            update(1, 0, false);
        }
    }

    useEffect(() => {
        matrixRef.current = matrix;
    }, [matrix]);
    useEffect(() => {
        if (!square.isStop) {
                let timer = setInterval(() => {
                    //先判断能否移动，能移动再移动
                    console.log(canWeMove(square, matrixRef.current, {x: 0, y: 1}));
                    if (canWeMove(square, matrixRef.current, {x: 0, y: 1})) {
                        update(0, 1, false);
                    } else {
                        update(0, 0, true);
                        clearInterval(timer);
                    }
                }, 500);
            }
        }

        , [square.isStop]);
    useEffect(() => {
        function updateMatrix() {
            let cloneMatrix = deepClone(matrixRef.current);
            let newMatrix = cloneMatrix.map((row) => {
                return row.map((col) => {
                    return col === 1 ? 0 : col;
                });
            });
            square.typeShape.map((row, x) => {
                return row.map((col, y) => {
                    if (col === 1) {
                        square.isStop ? newMatrix[x + square.coordinate.y][y + square.coordinate.x] = 2 :
                            newMatrix[x + square.coordinate.y][y + square.coordinate.x] = 1;
                    }
                    return y;
                });
            });
            return deepClone(newMatrix);
        }

        setMatrix(updateMatrix());
        if (square.isStop) {
            resetSquare();
        }
    }, [square.coordinate, square.isStop, square.typeShape]);


    return (
        <div className="Side">
            <h1>俄罗斯方块</h1>
            <button onClick={left}>左移</button>
            <button onClick={right}>右移</button>
            <div className="blank">
                {
                    matrix.map((item, index) => {
                            return <div className="row" key={index}>{item.map((item, index) => {
                                if (item === 0) {
                                    return <div className="col" key={index}/>;
                                }
                                if (item === 1) {
                                    return <div className="col active" key={index}/>;
                                }
                                if (item === 2) {
                                    return <div className="col active" key={index}/>;
                                } else {
                                    return undefined;
                                }
                            })}</div>;
                        }
                    )
                }
            </div>
        </div>
    );
}