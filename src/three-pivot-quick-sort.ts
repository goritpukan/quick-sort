export class ThreePivotQuickSort {
    compares: number = 0;

    private partition3(A: number[], left: number, right: number): [number, number, number, number] {
        if (right - left < 2) {
            if (left < right) {
                this.compares++;
                if (A[left] > A[right]) {
                    [A[left], A[right]] = [A[right], A[left]];
                }
            }
            return [left, left, right, right];
        }

        let pivots = [A[left], A[left + 1], A[right]];
        pivots.sort((a, b) => {
            this.compares++;
            return a - b;
        });
        const [p, q, r] = pivots;

        A[left] = p;
        A[left + 1] = q;
        A[right] = r;

        let a = left + 2;
        let b = left + 2;
        let c = right - 1;
        let d = right - 1;

        while (b <= c) {
            while (b <= c && A[b] < q) {
                this.compares++;
                if (A[b] < p) {
                    [A[a], A[b]] = [A[b], A[a]];
                    a++;
                }
                b++;
            }

            while (b <= c && A[c] > q) {
                this.compares++;
                if (A[c] > r) {
                    [A[c], A[d]] = [A[d], A[c]];
                    d--;
                }
                c--;
            }

            if (b <= c) {
                this.compares++;
                if (A[b] > r) {
                    if (A[c] < p) {
                        [A[b], A[a]] = [A[a], A[b]];
                        [A[a], A[c]] = [A[c], A[a]];
                        a++;
                    } else {
                        [A[b], A[c]] = [A[c], A[b]];
                    }
                    [A[c], A[d]] = [A[d], A[c]];
                    d--;
                } else if (A[c] < p) {
                    [A[b], A[a]] = [A[a], A[b]];
                    [A[a], A[c]] = [A[c], A[a]];
                    a++;
                    c--;
                } else {
                    [A[b], A[c]] = [A[c], A[b]];
                    c--;
                }
                b++;
            }
        }

        a--;
        b--;
        c++;
        d++;

        [A[left], A[a]] = [A[a], A[left]];
        [A[left + 1], A[b]] = [A[b], A[left + 1]];
        [A[right], A[d]] = [A[d], A[right]];

        return [a, a, d, d + 1];
    }

    sort(A: number[], left: number = 0, right: number = A.length - 1): void {
        if (right <= left) {
            return;
        }

        const [p1, p2, p3, p4] = this.partition3(A, left, right);

        this.sort(A, left, p1 - 1);
        this.sort(A, p1 + 1, p2 - 1);
        this.sort(A, p2 + 1, p3 - 1);
        this.sort(A, p4 + 1, right);
    }
}