/*
https://leetcode.com/problems/two-sum-less-than-k/

Runtime: 77 ms, faster than 77.98% of JavaScript online submissions for Two Sum Less Than K.
Memory Usage: 42.2 MB, less than 65.18% of JavaScript online submissions for Two Sum Less Than K.

Method: Two Pointers

TC O(nlogn) | SC O(logn) to O(n) depending on sort algorithm.
*/

var twoSumLessThanK = function(nums, k) {
    // sort nums in ascending order, in place
    nums.sort((a, b) => a - b);
    
    // define left and right pointers, and max sum
    let [l, r] = [0, nums.length - 1],
        maxSum = -1;
    
    // loop while left <= right
    while (l < r) {
        // sum left and right pointer values
        const currSum = nums[l] + nums[r];
        
        // if sum < k, update max sum, 
        // and increment left pointer.
        if (currSum < k) {
            // calc max sum
            maxSum = Math.max(maxSum, currSum);
            l++;
        } else r--; // otherwise, current sum is too large, decrement right pointer.
    }

    return maxSum;
};