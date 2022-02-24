import React, {useEffect, useRef, useState} from "react";
import '../App.scss';
import {square} from "../const/square";
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
    const [offset, setOffset] = useState({downOffset: 0, transOffset: 10});
    const offsetRef = useRef<Offset>({...offset})
    const matrixRef = useRef<number[][]>(deepClone(props.matrix))

    useEffect(() => {
        function moveSquare(offset: Offset, squareBlock: keyof Square) {
            let cloneMatrix = deepClone(oldMatrix.current);
            square[squareBlock].map((item, index) => {
                for (let i = 0; i < item.length; i++) {
                    cloneMatrix[index + offset.downOffset][i + offset.transOffset] = item[i];
                }
                return undefined;
            });
            return deepClone(cloneMatrix)
        }
        if(offset.downOffset === 0){
            const timer = setInterval(()=>{
                matrixRef.current = moveSquare(offsetRef.current,"O")
                setMatrix(deepClone(matrixRef.current))
                setOffset((last) => {
                    return {...last,downOffset: last.downOffset + 1}
                })
                if(offsetRef.current.downOffset === matrixRef.current.length - square["O"].length){
                    oldMatrix.current = matrixRef.current
                    setMatrix(deepClone(oldMatrix.current))
                    setOffset((last) => {
                        return {...last,downOffset: 0}
                    })
                    clearInterval(timer)
                }
            },500)
        }
        offsetRef.current = offset
    },[offset]);

    return (
        <div className="Side">
            <h1>俄罗斯方块 {offset.transOffset} {offset.downOffset}</h1>
            <button>开始游戏</button>
            <button>左移</button>
            <button>右移</button>
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