import { DefaultQuickSort } from './default-quick-sort';
import { MedianOfThreeQuickSort } from './median-of-three-quick-sort';
import { generateRandomArray } from './generate-random-array';

const arr1: number[] = generateRandomArray(1000000);
const arr2: number[] = [...arr1];
const defaultQuickSort = new DefaultQuickSort();
const medianOfThreeQuickSort = new MedianOfThreeQuickSort();
defaultQuickSort.sort(arr1);
console.log('default quick sort compares: ', defaultQuickSort.compares);
medianOfThreeQuickSort.sort(arr2)
console.log('median of 3 quick sort compares: ', medianOfThreeQuickSort.compares);
console.log('difference: ', defaultQuickSort.compares - medianOfThreeQuickSort.compares);
