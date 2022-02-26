import React, {useEffect, useRef, useState} from "react";
import '../App.scss';
import {blockTypes, square} from "../const/square";
import {deepClone} from "../lib/deepclone";

type Props = {
    matrix: number[][]
}
type Offset = {
    downOffset: number
    transOffset: number
}
type Square = {
    O: number[][],
    I: number[][],
    S: number[][],
    Z: number[][],
    L: number[][],
    J: number[][],
    T: number[][]
}


export function Matrix(props: Props) {
    const oldMatrix = useRef<number[][]>(deepClone(props.matrix));
    const [matrix, setMatrix] = useState(deepClone(props.matrix));
    const [offset, setOffset] = useState({downOffset: 0, transOffset: 5});
    const offsetRef = useRef<Offset>({...offset});
    const matrixRef = useRef<number[][]>(deepClone(props.matrix));
    function left(){
        setOffset((last) => {
            return {...last, transOffset: last.transOffset - 1};
        });
    }
    function right(){
        setOffset((last) => {
            return {...last, transOffset: last.transOffset + 1};
        });
    }
    useEffect(() => {
        let stop = false;
        function moveSquare(offset: Offset, squareBlock: keyof Square) {
            let cloneMatrix = deepClone(oldMatrix.current);
            for (let i = 0; i < square[squareBlock].length; i++) {
                for (let j = 0; j < square[squareBlock][i].length; j++) {
                    let oldSquare = oldMatrix.current[i + offset.downOffset][j + offset.transOffset];
                    if (oldSquare && oldSquare === square[squareBlock][i][j]) {
                        stop = true;
                    }
                    if (oldSquare && oldSquare === 1) {
                        cloneMatrix[i + offset.downOffset][j + offset.transOffset] = 1;
                    } else {
                        cloneMatrix[i + offset.downOffset][j + offset.transOffset] = square[squareBlock][i][j];
                    }
                }
            }
            return deepClone(cloneMatrix);
        }

        if (offset.downOffset === 0) {
            let blockType = blockTypes[Math.floor(Math.random() * 5)] as keyof Square;
            const timer = setInterval(() => {
                let nextPosition = moveSquare(offsetRef.current, blockType);
                if (!stop) {
                    matrixRef.current = nextPosition;
                } else {
                    oldMatrix.current = matrixRef.current;
                    setOffset((last) => {
                        return {...last, downOffset: 0};
                    });
                    clearInterval(timer);
                }
                setMatrix(deepClone(matrixRef.current));
                setOffset((last) => {
                    return {...last, downOffset: last.downOffset + 1};
                });
                if (offsetRef.current.downOffset === matrixRef.current.length - square[blockType].length) {
                    console.log(1);
                    oldMatrix.current = matrixRef.current;
                    setMatrix(deepClone(oldMatrix.current));
                    setOffset((last) => {
                        return {...last, downOffset: 0};
                    });
                    clearInterval(timer);
                }
            }, 300);
        }
        offsetRef.current = offset;
    }, [offset]);

    return (
        <div className="Side">
            <h1>俄罗斯方块</h1>
            <button>开始游戏</button>
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