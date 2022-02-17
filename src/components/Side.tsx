import React, {useState} from "react";
import '../App.css';

export function Side() {
    let row = 3;
    let column = 2;
    let matrix = [];
    let initLine = [];
    let square = [[1, 1], [1, 1]];
    for (let i = 0; i < column; i++) {
        initLine.push(0);
    }
    for (let i = 0; i < row; i++) {
        matrix.push(initLine);
    }
    const [initmatrix, setInitmatrix] = useState(matrix);
    return (
        <div className="Side">
            <h1>俄罗斯方块</h1>
            <button>开始游戏</button>
            <div className="blank">
                {
                    initmatrix.map((item) => {
                            return <div className="row">{item.map(item => {
                                return <div className="col"/>;
                            })}</div>;
                        }
                    )
                }
            </div>

        </div>
    );
}