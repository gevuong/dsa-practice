/*
# Problem
https://leetcode.com/problems/n-th-tribonacci-number/description/

The Tribonacci sequence Tn is defined as follows: 
T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.
Given n, return the value of Tn.

# Method
DP - Fibonacci Numbers (Bottom Up via 1D Array)

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
1. Define 1D dp array of size n+1.
2. Define base cases.
3. Loop and define recurrence relation.

# Complexity
- Time:
O(n).

- Space:
O(n).
*/

var tribonacci = function(n) {
    // define dp array of length n
    const dp = Array(n+1).fill(0);
    // define base cases
    dp[1] = 1;
    dp[2] = 1;
    
    // loop n
    for (let i = 3; i <= n; i++) {
        // define recurrence relation
        dp[i] = dp[i-3] + dp[i-2] + dp[i-1];
    }
    // return last element in dp array
    return dp[n];
};