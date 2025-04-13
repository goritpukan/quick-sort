export class MedianOfThreeQuickSort {
    compares: number = 0;

    private partition(arr: number[], p: number, r: number): number {
        if (arr.length < 3) return 0;
        let x: number = arr[this.medianOfThree(arr, p, r)];
        let i: number = p - 1;
        for (let j = p; j < r; j++) {
            this.compares++;
            if (arr[j] <= x) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        [arr[i + 1], arr[r]] = [arr[r], arr[i + 1]];
        return i + 1;
    }
    private medianOfThree(arr: number[], p: number, r: number): number {
        const mid: number = Math.floor((p + r) / 2);
        const a: number = arr[p];
        const b: number = arr[mid];
        const c: number = arr[r];
        if ((a - b) * (c - a) >= 0) return p;
        if ((b - a) * (c - b) >= 0) return mid;
        return r;
    }

    public sort(arr: number[], p: number = 0, r: number = arr.length - 1) {
        if (p < r) {
            let q = this.partition(arr, p, r);
            this.sort(arr, p, q - 1);
            this.sort(arr, q + 1, r);
        }
    }
}