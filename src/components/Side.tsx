import React, {useState} from "react";
import '../App.scss';

export function Side() {
    let row = 30;
    let column = 20;
    let matrix = [];

    let square = [[1, 1], [1, 1]];

    for (let i = 0; i < row; i++) {
        let initLine = [];
        for (let i = 0; i < column; i++) {
            initLine.push(0);
        }
        matrix.push(initLine);
    }
    const [initmatrix, setInitmatrix] = useState(matrix);

    function createSquare() {

        square.map((item, index) => {
            for(let i =0;i<item.length;i++){
                initmatrix[index][i] = 1
                }

        });
        return initmatrix;
    }
    createSquare()

    return (
        <div className="Side">
            <h1>俄罗斯方块</h1>
            <button>开始游戏</button>
            <div className="blank">
                {

                    initmatrix.map((item) => {

                            return <div className="row">{item.map(item => {
                                if(item === 0){
                                    return <div className="col"/>;
                                }
                                if(item === 1){
                                    return <div className="col active"/>;
                                }
                            })}</div>;
                        }
                    )
                }
            </div>


        </div>
    );
}