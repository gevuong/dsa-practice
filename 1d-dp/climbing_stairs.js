/*
https://leetcode.com/problems/climbing-stairs/description/

Method: Bottom up 1D DP (Fibonacci Number pattern)

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
Create a dp array of size n+1. Each index represents ith steps to reach to top.

# Complexity
- Time complexity:
O(n)

- Space complexity:
O(n). Array to store number of distinct ways to climb to top at each n step.
*/

var climbStairs = function(n) {
    // define dp array
    const dp = Array(n+1).fill(0);

    // define base cases
    dp[1] = 1;
    dp[2] = 2;

    // define recurrence relation, which is an equation
    // that relates the transition between states.
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }

    // return last element in array
    return dp[n];
};