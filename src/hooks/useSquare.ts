import {useState} from "react";
import {squareType} from "../const/square";

type Square = {
    O: number[][],
    I: number[][],
    S: number[][],
    Z: number[][],
    L: number[][],
    J: number[][],
    T: number[][]
}
export const useSquare = () => {
    const [square, setSquare] = useState({
        coordinate: {x: 10, y: 0},
        typeShape: getRandomSquareType(),
        isStop: false
    });

    function update(x: number, y: number, isStop: boolean) {
        setSquare((prev) => {
            return {...prev, coordinate: {x: prev.coordinate.x + x, y: prev.coordinate.y + y}, isStop};
        });
    }

    function resetSquare() {
        setSquare({coordinate: {x: 10, y: 0}, typeShape: getRandomSquareType(), isStop: false}
        );
    }

    function getRandomSquareType() {
        return squareType[Object.keys(squareType)[Math.floor(Math.random() * 5)] as keyof Square];
    }

    return [square, update, resetSquare] as const;
};