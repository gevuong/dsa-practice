/*
https://leetcode.com/problems/binary-search/

Runtime: 91 ms, faster than 72.28% of JavaScript online submissions for Binary Search.
Memory Usage: 45.3 MB, less than 20.75% of JavaScript online submissions for Binary Search.

Method
Two Pointers (Opposite Direction)

TC O(logn) | SC O(1)
*/

var search = function(nums, target) {
    // define left and right pointers, nums length
    let [left, right] = [0, nums.length - 1];
    
    // while pointers are less than or equal
    while (left <= right) {
        // calc midpoint
        const midIdx = Math.floor((right + left) / 2);
        
        // if mid value equals target, return its index
        if (nums[midIdx] === target) return midIdx;
        
        // if value < target, move left pointer to mid + 1
        if (nums[midIdx] < target) left = midIdx + 1; 
        // else move right pointer to mid - 1
        else right = midIdx - 1;
    }
    
    return -1
};