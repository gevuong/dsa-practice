/*
https://leetcode.com/problems/two-sum-less-than-k/

Method: Binary Search (less efficient than two pointers)

TC O(nlogn) | SC O(logn) to O(n) depending on search algorithm.
*/

var twoSumLessThanK = function(nums, k) {
    // sort nums
    nums.sort((a, b) => a - b);

    // define nums length
    const numsLen = nums.length;
    let maxSum = -1;

    // handle edge case
    if (numsLen < 2) return -1;

    // loops nums
    for (let i = 0; i < numsLen; i++) {
        // calc remaining target
        const remaining = k - 1 - nums[i];
        // call bsearch on remaining array
        const closest = bSearch(nums, i+1, numsLen-1, remaining);
        // we don't want to calculate max sum if the closest value to
        // remaining is -1.
        if (closest === -1) continue;

        maxSum = Math.max(maxSum, nums[i] + closest);  
    }

    return maxSum; 
};

const bSearch = (arr, start, end, remaining) => {
    // define min difference and closest to remaining.
    let minDiff = Infinity,
        closestToRemaining = -1;

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        // if mid value equals remaining, then we can immediately return value.
        if (arr[mid] === remaining) return arr[mid];
        // if mid value is less than remaining, we want to calculate
        // how close the value is to remaining. If it's closer, then
        // we can update min difference and closest to remaining value.
        if (arr[mid] < remaining) {
            const diff = remaining - arr[mid];
            if (diff < minDiff) {
                minDiff = diff;
                closestToRemaining = arr[mid];
            }
            start++;   
        }
        else end--;
    }
    
    return closestToRemaining;
}