export function clearLine(oldMatrix : number[][]){
    let isClear = oldMatrix.findIndex((item) => {
        return item.every((i) => {
            return i === 1;
        });
    })
    if(isClear !== -1){
        oldMatrix.splice(isClear,1);
        oldMatrix.unshift([0,0,0,0,0,0,0,0,0,0])
    }
}
