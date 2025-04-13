export function generateRandomArray(size: number): number[] {
    let arr: number[] = [];
    for(let i = 0; i < size; i++){
        arr[i] = Math.floor(Math.random() * 1000);
    }
    return arr;
}