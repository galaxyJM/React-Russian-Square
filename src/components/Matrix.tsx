import React, {useEffect, useState} from "react";
import '../App.scss';
import {square} from "../const/square";

type Props = {
    matrix: number[][]
}

export function Matrix(props: Props) {
    let blankMatrix:number[][] = deepClone(props.matrix);
    const [matrix, setMatrix] = useState(blankMatrix);
    function deepClone(aim:number[][]){
        let res = []
        for (let i=0;i<aim.length;i++){
            res.push([...aim[i]])
        }
        return res
    }
    function createSquare(offset: number) {
        square["S"].map((item, index) => {

                setMatrix((matrix)=>{
                    for (let i = 0; i < item.length; i++) {
                        matrix[index + offset][i] = item[i];
                    }
                    return deepClone(matrix)
                })
                return undefined;
            }
        );
    }
    function autoDown() {
        let offset = 0;
        createSquare(offset);
        offset++
        const timer = setInterval(() => {
            setMatrix(deepClone(props.matrix))
            createSquare(offset);
            offset++;
            if (offset === blankMatrix.length-1) {
                clearInterval(timer);
            }
        }, 1000);
    }
    useEffect(()=>{
        console.log(matrix);
    })




    return (
        <div className="Side">
            <h1>俄罗斯方块</h1>
            <button onClick={() => autoDown()}>开始游戏</button>
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