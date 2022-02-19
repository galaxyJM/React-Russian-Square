import React, {useState} from "react";
import '../App.scss';
import {square} from "../const/square";

type Props = {
    matrix: number[][]
}

export function Matrix(props:Props) {
    let blankMatrix = props.matrix
    const [matrix, setMatrix] = useState(blankMatrix);
    function createSquare() {
        square["S"].map((item, index) => {
                for (let i = 0; i < item.length; i++) {
                    matrix[index][i] = item[i];
                }
                return undefined
        }
        );
        setMatrix([...matrix])
    }



    return (
        <div className="Side">
            <h1>俄罗斯方块</h1>
            <button onClick={() => createSquare()}>开始游戏</button>
            <div className="blank">
                {
                    matrix.map((item,index) => {

                            return <div className="row" key={index}>{item.map((item,index) => {
                                if (item === 0) {
                                    return <div className="col" key={index}/>;
                                }
                                if (item === 1) {
                                    return <div className="col active" key={index}/>;
                                }else{
                                    return undefined
                                }
                            })}</div>;
                        }
                    )
                }
            </div>
        </div>
    );
}