import React, {useState} from "react";
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
    const [initMatrix, setInitMatrix] = useState(deepClone(props.matrix));
    const [matrix, setMatrix] = useState(deepClone(props.matrix));
    const [offset, setOffset] = useState({downOffset: 0, transOffset: 10});


    function moveSquare(offset: Offset, squareBlock: keyof Square) {
        let cloneMatrix = deepClone(matrix);
        square[squareBlock].map((item, index) => {
            for (let i = 0; i < item.length; i++) {
                cloneMatrix[index + offset.downOffset][i + offset.transOffset] = item[i];
            }
            return undefined
        });
        console.log(cloneMatrix);
        setMatrix(deepClone(cloneMatrix));
    }


    function autoDown(blockType: keyof Square) {
        const timer = setInterval(() => {
            moveSquare(offset, blockType);
            setOffset({...offset, downOffset: offset.downOffset++})

            if (offset.downOffset === initMatrix.length - 1) {
                console.log(1);
                clearInterval(timer);
                setInitMatrix(deepClone(matrix));
                setOffset({downOffset: 0, transOffset: 0});
            }
        }, 1000);
    }

    // useEffect(()=>{
    //     console.log(matrix);},[matrix])
    return (
        <div className="Side">
            <h1>俄罗斯方块</h1>
            <button onClick={() => autoDown("S")}>开始游戏</button>
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