/*
# Problem
https://leetcode.com/problems/maximum-subarray/description/

# Method
DP Fibonacci Numbers (via Bottom Up 1D DP Array) + Kadane's Algorithm (greedy-like)

# Intuition
- The difficult part is figuring out when a negative number is "worth" keeping in
a subarray.
- Kadane's algorithm has very a greedy-like approach to it.
- For example input = [-2,1,-3]. Our DP array would be [-2,1,1].

# Approach
1. Define 1d dp array of length input.
2. Define base case and current sum. We know that the max subarray sum
    at index 0 is nums[0].
3. Loop nums
    3a. We want to eliminate the possibility of a negative current sum. So
        calculate the max between current sum and 0. Then add current number
        to the max value to calculate new current max subarray sum.
    3b. We want to store the max subarray sum at the current index. So we
        have to calculate max between the previous max subarray sum, and the
        current max subarray sum
4. Return the last element in the dp array. This will be the max subarray sum
    up to the last index of the input array.

# Complexity
- Time:
O(n).

- Space:
O(n).
*/

var maxSubArray = function(nums) {
    // define nums length, and 1d dp array
    const numsLen = nums.length,
        dp = Array(numsLen).fill(-Infinity);

    // define base case, and current sum
    dp[0] = nums[0];
    let currSum = nums[0];

    // loop nums starting at index 1
    for (let i = 1; i < numsLen; i++) {
        // define recurrence relation.
        // Step 1:
        // I want to make sure I have the larger value between the
        // current sum (positive or negative), and 0.
        // This helps eliminate any negative current sums.
        // Whatever the max is, simply add current num to it to get
        // the current sum.
        currSum = Math.max(currSum, 0) + nums[i];
        
        // Step 2:
        // I want to store the max value between the current sum
        // and the previous max sum.
        dp[i] = Math.max(dp[i-1], currSum);
    }

    // return the last element in dp array
    return dp[numsLen - 1];
};

/*
Method
Kadane's Algorithm (greedy-like)
No DP Array.

# Complexity
- Time:
O(n).

- Space:
O(1).
*/

var maxSubArray = function(nums) {
    // define current and max sum
    let currSum = nums[0],
        maxSum = nums[0];

    // loop nums starting at index 1
    for (let i = 1; i < nums.length; i++) {
        // define recurrence relation.
        // Step 1:
        // I want to make sure I have the larger value between the
        // current sum (positive or negative), and 0.
        // This helps eliminate any negative current sums.
        // Whatever the max is, simply add current num to it to get
        // the current sum.
        currSum = Math.max(currSum, 0) + nums[i];
        
        // Step 2:
        // I want to store the max value between the current sum
        // and the previous max sum.
        maxSum = Math.max(maxSum, currSum);
    }

    // return max sum
    return maxSum;
};