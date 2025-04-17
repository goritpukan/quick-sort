import {Canvas} from 'skia-canvas';
import {DefaultQuickSort} from './default-quick-sort';
import {generateReversedArray, generateSortedArray, getArrayFromFile} from './array'
import fsp from 'node:fs/promises';
import {
    CategoryScale,
    Chart,
    ChartOptions,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import {ThreePivotQuickSort} from './three-pivot-quick-sort';
import {MedianOfThreeQuickSort} from './median-of-three-quick-sort';

const sizes: number[] = [100, 1000, 10000, 20000, 50000];

const defaultQuickSortRandomCompares: number[] = [];
const medianOfThreeQuickSortRandomCompares: number[] = [];
const threePivotQuickSortRandomCompares: number[] = [];

const defaultQuickSortSortedCompares: number[] = [];
const medianOfThreeQuickSortSortedCompares: number[] = [];
const threePivotQuickSortSortedCompares: number[] = [];

const defaultQuickSortReversedCompares: number[] = [];
const medianOfThreeQuickSortReversedCompares: number[] = [];
const threePivotQuickSortReversedCompares: number[] = [];


const defaultQuickSort = new DefaultQuickSort();
const medianOfThreeQuickSort = new MedianOfThreeQuickSort();
const threePivotQuickSort = new ThreePivotQuickSort();
for (let i of sizes) {
    const arr = await getArrayFromFile<number>(`arrays/random-array-size-${i}.txt`);

    defaultQuickSort.compares = 0;
    medianOfThreeQuickSort.compares = 0;
    threePivotQuickSort.compares = 0;

    defaultQuickSort.sort([...arr]);
    medianOfThreeQuickSort.sort([...arr]);
    threePivotQuickSort.sort([...arr]);

    defaultQuickSortRandomCompares.push(defaultQuickSort.compares);
    medianOfThreeQuickSortRandomCompares.push(medianOfThreeQuickSort.compares);
    threePivotQuickSortRandomCompares.push(threePivotQuickSort.compares);
}
for (let i of sizes) {
    const arr = generateSortedArray(i);

    defaultQuickSort.compares = 0;
    medianOfThreeQuickSort.compares = 0;
    threePivotQuickSort.compares = 0;

    defaultQuickSort.sort([...arr]);
    medianOfThreeQuickSort.sort([...arr]);
    threePivotQuickSort.sort([...arr]);


    defaultQuickSortSortedCompares.push(defaultQuickSort.compares);
    medianOfThreeQuickSortSortedCompares.push(medianOfThreeQuickSort.compares);
    threePivotQuickSortSortedCompares.push(threePivotQuickSort.compares);

}

for (let i of sizes) {
    const arr = generateReversedArray(i);

    defaultQuickSort.compares = 0;
    medianOfThreeQuickSort.compares = 0;
    threePivotQuickSort.compares = 0;

    defaultQuickSort.sort([...arr]);
    medianOfThreeQuickSort.sort([...arr]);
    threePivotQuickSort.sort([...arr]);

    defaultQuickSortReversedCompares.push(defaultQuickSort.compares);
    medianOfThreeQuickSortReversedCompares.push(medianOfThreeQuickSort.compares);
    threePivotQuickSortReversedCompares.push(threePivotQuickSort.compares);
}

Chart.register([
    CategoryScale,
    LineController,
    LineElement,
    LinearScale,
    PointElement,
    Legend,
    Title,
    Tooltip
]);

const dataRandom = getData(defaultQuickSortRandomCompares, medianOfThreeQuickSortRandomCompares, threePivotQuickSortRandomCompares);
const dataSorted = getData(defaultQuickSortSortedCompares, medianOfThreeQuickSortSortedCompares, threePivotQuickSortSortedCompares);
const dataReversed = getData(defaultQuickSortReversedCompares, medianOfThreeQuickSortReversedCompares, threePivotQuickSortReversedCompares);

const optionsRandom = getOptions('Random array quick sort comparison');
const optionsSorted = getOptions('Sorted array quick sort comparison');
const optionsReversed = getOptions('Reversed array quick sort comparison');
const canvas = new Canvas(1000, 500);

const chartRandom = new Chart(
    canvas as any,
    {
        type: 'line',
        data: dataRandom,
        options: optionsRandom
    }
);
await fsp.writeFile('random.png', await canvas.toBuffer('png', {matte: 'white'}));
chartRandom.destroy();

const chartSorted = new Chart(
    canvas as any,
    {
        type: 'line',
        data: dataSorted,
        options: optionsSorted
    }
);
await fsp.writeFile('sorted.png', await canvas.toBuffer('png', {matte: 'white'}));
chartSorted.destroy();
const chartReversed = new Chart(
    canvas as any,
    {
        type: 'line',
        data: dataReversed,
        options: optionsReversed
    }
)

await fsp.writeFile('reversed.png', await canvas.toBuffer('png', {matte: 'white'}));
chartReversed.destroy();


function getOptions(title: string): ChartOptions {
    return {
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: 'black',
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: title
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Array Size'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Number of Comparisons'
                }
            }
        }
    }
}

function getData(defaultComparesData: number[], medianOfTheComparesData: number[], threePivotComparesData: number[]) {
    return {
        labels: sizes,
        datasets: [
            {
                data: defaultComparesData,
                borderColor: 'blue',
                label: 'default quick sort',
            },
            {
                data: medianOfTheComparesData,
                label: 'median of three quick sort',
                borderColor: 'red',
            },
            {
                data: threePivotComparesData,
                borderColor: 'green',
                label: 'three pivot quick sort',
            }
        ]
    }
}

