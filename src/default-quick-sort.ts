export class DefaultQuickSort {
    compares: number = 0;

    private partition(arr: number[], p: number, r: number): number {
        let x: number = arr[r];
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

    public sort(arr: number[], p: number = 0, r: number = arr.length - 1) {
        if (p < r) {
            let q = this.partition(arr, p, r);
            this.sort(arr, p, q - 1);
            this.sort(arr, q + 1, r);
        }
    }
}