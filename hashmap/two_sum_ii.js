/*
https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/

Runtime: 81 ms, faster than 77.55% of JavaScript online submissions for Two Sum II - Input Array Is Sorted.
Memory Usage: 42.5 MB, less than 96.11% of JavaScript online submissions for Two Sum II - Input Array Is Sorted.

TC O(n) | SC O(n)

Method: One-pass Hash Table - Not space efficient.

Because input array is sorted, we can use left and right pointers
to reduce space to O(1). View this problem in the /two_pointers.
*/

var twoSum = function(numbers, target) {
    // define nums length, and hashmap, mapping number to its index
    const numsLen = numbers.length,
          numIdxObj = {};
    
    // loop nums
    for (let i = 0; i < numsLen; i++) {
        // calc diff
        const diff = target - numbers[i];
        // return indices if diff exists in hashmap
        if (numIdxObj.hasOwnProperty(diff)) return [numIdxObj[diff]+1, i+1];
        // add num and index to hashmap
        numIdxObj[numbers[i]] = i;
    }
    
};