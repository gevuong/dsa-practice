/*
# Problem
https://leetcode.com/problems/longest-increasing-subsequence/description/

Given an integer array nums, return the length of the longest strictly increasing 
subsequence.

# Method
DP - LCS (Bottom Up via 1D Array)
Note: Can be solved in O(nlogn) using binary search.

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
- Initialize dp array with 1s because every number on its own will be an LIS
    of length 1, which also handles our base case.
- Loop all previous values, up to i exclusive. We need to find all increasing
    subsequences up to i, from all the values before it (every num till i-1).
- If current num > previous num, then we know we have an increasing subsequence.
    So, we want to calc max between the current LIS at dp[i], and the LIS at
    dp[j] + 1 (which is the current num).

# Complexity
- Time:
O(n^2).

- Space:
O(n).
*/

var lengthOfLIS = function(nums) {
    // define nums length, LIS length,
    // and dp array to store solution at each unique state.
    // initialize dp array with 1s because every number on its own
    // will be an LIS of length 1, which also handles our base case.
    const numsLen = nums.length,
        dp = Array(numsLen).fill(1);
    let lisLen = 1;
    // loop nums
    for (let i = 1; i < numsLen; i++) {
        const currNum = nums[i];
        // loop all previous values, up to i exclusive.
        // We need to find all increasing subsequences up to i,
        // from all the values before it (every num till i-1).
        for (let j = 0; j < i; j++) {
            const [prevNum, prevLis] = [nums[j], dp[j]];

            // define recurrence relation.
            // if current num > previous num, then we know we have
            // an increasing subsequence.
            // So, we want to calc max between the current LIS at dp[i],
            // and the LIS at dp[j] + 1 (which is the current num).
            if (currNum > prevNum) {

                // dp[i] represents the length of the LIS that ENDS
                // with the ith element.
                // For example: if nums = [1,6,9,4,10,5],
                // dp[4] = 4, (from [1,6,9,10]), and
                // dp[5] = 3 (from [1,4,5]).
                dp[i] = Math.max(dp[i], prevLis + 1);

                // calc LIS, since dp array is not in ascending order
                // based on above explanation.
                lisLen = Math.max(lisLen, dp[i]);
            }
        }
    }

    return lisLen;
};