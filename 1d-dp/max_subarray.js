/*
https://leetcode.com/problems/maximum-subarray/

Runtime: 139 ms, faster than 43.46% of JavaScript online submissions for Maximum Subarray.
Memory Usage: 53.9 MB, less than 7.50% of JavaScript online submissions for Maximum Subarray.

TC O(n) | SC O(1)

Hints:
1. Follow bottom up DP pattern. Define an array of size equal to input length.
    Track current subarray sum as separate variable.

2. Define base case and recurrence relation. Base case is when there is only
    a single element in input. The recurrence relation involves first finding
    whether the current num or the current subarray sum + current num were greater.

3. 
*/

var maxSubArray = function(nums) {
    // define nums length, current subarray sum,
    // and array of size nums length to store max subarray sum 
    // up to each index in nums.
    const numsLen = nums.length,
          maxSums = Array(numsLen).fill(-Infinity);
    let currSubSum = nums[0];
    
    // define base case
    maxSums[0] = nums[0];

    // loop nums
    for (let i = 1; i < numsLen; i++) {
        // define recurrence relation.
        // find max between current num and current sum + num.
        // if current subarray sum is negative, throw it away.
        // Otherwise, keep adding current num to it.
        currSubSum = Math.max(nums[i], currSubSum + nums[i]);
        // find max between current subarray sum and previous max subarray sum
        maxSums[i] = Math.max(currSubSum, maxSums[i-1]);
        
    }
    
    // return last element of maxSums
    return maxSums[numsLen - 1];
};