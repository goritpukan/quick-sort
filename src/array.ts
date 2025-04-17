import { promises as fs } from 'fs';

export function generateRandomArray(size: number): number[] {
    let arr: number[] = [];
    for (let i = 0; i < size; i++) {
        arr[i] = Math.floor(Math.random() * 1000);
    }
    return arr;
}

export function generateSortedArray(size: number): number[] {
    let arr: number[] = [];
    for (let i = 0; i < size; i++) {
        arr[i] = i;
    }
    return arr;
}
export function generateReversedArray(size: number): number[] {
    let arr: number[] = [];
    for (let i = 0; i < size; i++) {
        arr[i] = size - i - 1;
    }
    return arr;
}

export async function getArrayFromFile<T>(fileName: string): Promise<T[]> {
    try {
        const data: string = await fs.readFile(fileName, 'utf8');
        return JSON.parse(data) as T[];
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function writeArrayToFile<T>(array: T[], fileName: string): Promise<void> {
    try {
        await fs.writeFile(fileName, JSON.stringify(array), 'utf8');
    } catch (err) {
        console.error(err);
    }
}