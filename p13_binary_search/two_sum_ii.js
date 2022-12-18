/*
https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/

Method 3: Binary Search, results in TLE in LC, passed 19/21 test cases.
TC O(nlogn) | SC O(1)

Hints:
1. Since array is sorted, for each number in the array,
we can use binary search to find the second number.
*/

var twoSum = function(numbers, target) {
    const numsLen = numbers.length;
    for (let i = 0; i < numsLen - 1; i++) {
        // calc remaining target
        const remaining = target - numbers[i];

        // call binary search on remaining array
        const j = binarySearch(numbers, i+1, numsLen - 1, remaining);
        if (j >= 0) return [i+1, j+1];
    }
};

const binarySearch = (arr, start, end, target) => {
    while (start <= end) {
        // calc mid index
        const midIdx = Math.floor((start + end) / 2);
        // return mid index if value equals target.
        if (arr[midIdx] === target) return midIdx;
        if (arr[midIdx] < target) start++;
        else end--;
    }
    return -1;
}