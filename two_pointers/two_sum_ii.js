/*
https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/

Runtime: 94 ms, faster than 65.28% of JavaScript online submissions for Two Sum II - Input Array Is Sorted.
Memory Usage: 43 MB, less than 61.29% of JavaScript online submissions for Two Sum II - Input Array Is Sorted.

Method: Two Pointers
TC O(n) | SC O(1)
*/

var twoSum = function(numbers, target) {
    // define left and right pointers
    let [l, r] = [0, numbers.length - 1];
    
    // while left <= right
    while (l <= r) {
        // sum left and right values
        const sum = numbers[l] + numbers[r];
        // if sum equals target, return indices + 1
        if (sum === target) return [l+1, r+1];
        // if sum < target, increment left pointer
        if (sum < target) l++;
        // else decrement right pointer
        else r--;
    }
};