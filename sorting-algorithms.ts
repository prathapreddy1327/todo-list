/**
 * Linear Time Sorting Algorithms (O(n))
 */

/**
 * Counting Sort for non-negative integers.
 * Time Complexity: O(n + k) where k is the max value in the array.
 * Space Complexity: O(k)
 */
export function countingSort(arr: number[]): number[] {
  if (arr.length <= 1) return [...arr];

  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);

  for (const num of arr) {
    if (num < 0 || !Number.isInteger(num)) {
      throw new Error('countingSort only supports non-negative integers');
    }
    count[num]++;
  }

  const result: number[] = [];
  for (let num = 0; num <= max; num++) {
    while (count[num] > 0) {
      result.push(num);
      count[num]--;
    }
  }

  return result;
}

/**
 * Radix Sort (LSD - Least Significant Digit) for non-negative integers.
 * Time Complexity: O(d * (n + b)) where d is the number of digits and b is base 10.
 * Space Complexity: O(n + b)
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length <= 1) return [...arr];

  for (const num of arr) {
    if (num < 0 || !Number.isInteger(num)) {
      throw new Error('radixSort only supports non-negative integers');
    }
  }

  const max = Math.max(...arr);
  let copy = [...arr];

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const output = new Array(copy.length).fill(0);
    const count = new Array(10).fill(0);

    for (let i = 0; i < copy.length; i++) {
      const digit = Math.floor(copy[i] / exp) % 10;
      count[digit]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = copy.length - 1; i >= 0; i--) {
      const digit = Math.floor(copy[i] / exp) % 10;
      output[count[digit] - 1] = copy[i];
      count[digit]--;
    }

    copy = output;
  }

  return copy;
}

/**
 * Bucket Sort for numbers uniformly distributed in the interval [0, 1).
 * Time Complexity: Average O(n), Worst O(n^2)
 * Space Complexity: O(n)
 */
export function bucketSort(arr: number[], bucketCount = 10): number[] {
  if (arr.length <= 1) return [...arr];

  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  for (const num of arr) {
    if (num < 0 || num >= 1) {
      throw new Error('bucketSort expects numbers in the range [0, 1)');
    }
    const index = Math.floor(num * bucketCount);
    buckets[index].push(num);
  }

  const result: number[] = [];
  for (const bucket of buckets) {
    // Simple insertion sort for each individual bucket
    for (let i = 1; i < bucket.length; i++) {
      const key = bucket[i];
      let j = i - 1;
      while (j >= 0 && bucket[j] > key) {
        bucket[j + 1] = bucket[j];
        j--;
      }
      bucket[j + 1] = key;
    }
    result.push(...bucket);
  }

  return result;
}
