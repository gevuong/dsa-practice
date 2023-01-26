/*
https://leetcode.com/problems/minimum-size-subarray-sum/description/

# Method
Sliding Window

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(2n) => O(n). Worst case is the min size subarray sum is the last element
of input array. This means that after the window end pointer visits each element
and finally reaches the last element, the window start pointer will have to do
the same, visit each element again, to reach the last element.

In short, each element can be visited at most twice. Once by window end pointer, 
and at most, once by window start pointer.
- Space complexity:
O(1)

# Code
*/


var minSubArrayLen = function(target, nums) {
    // define min length, nums length, window start, curr sum
    const numsLen = nums.length;
    let minLen = numsLen + 1, // max length is nums length
        start = 0,
        currSum = 0;

    // loop nums
    for (let end = 0; end < numsLen; end++) {
        // add el to current sum
        currSum += nums[end];

        // while current sum >= target, we can begin to shrink window
        while (currSum >= target && start <= end) {
            // calc min length via difference of window end and start
            minLen = Math.min(minLen, end - start + 1);
            // subtract value at window start from current sum
            currSum -= nums[start];
            // increment start
            start++;
        }
    }

    if (minLen === numsLen + 1) return 0;
    return minLen;
};