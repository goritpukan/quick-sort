import { DefaultQuickSort } from './default-quick-sort.js';
import { MedianOfThreeQuickSort } from './median-of-three-quick-sort.js';
import { ThreePivotQuickSort } from './three-pivot-quick-sort.js';
import { getArrayFromFile } from './array.js';

const arr1: number[] = await getArrayFromFile('arrays/random-array-size-1000000.txt')
const arr2: number[] = [...arr1];
const arr3: number[] = [...arr1];
const defaultQuickSort = new DefaultQuickSort();
const medianOfThreeQuickSort = new MedianOfThreeQuickSort();
const threePivotQuickSort = new ThreePivotQuickSort();
defaultQuickSort.sort(arr1);
console.log('default quick sort compares: ', defaultQuickSort.compares);
medianOfThreeQuickSort.sort(arr2)
console.log('median of 3 quick sort compares: ', medianOfThreeQuickSort.compares);
threePivotQuickSort.sort(arr3);
console.log('3 pivot quick sort compares: ', threePivotQuickSort.compares);
