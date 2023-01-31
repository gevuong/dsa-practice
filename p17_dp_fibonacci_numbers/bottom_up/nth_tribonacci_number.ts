/*
# Problem
https://leetcode.com/problems/n-th-tribonacci-number/description/

The Tribonacci sequence Tn is defined as follows: 
T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.
Given n, return the value of Tn.

# Method
DP - Fibonacci Numbers (Bottom Up, No Array)

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
O(1).
*/

function tribonacciTS(n: number): number {
    // handle edge cases
    if (n < 3) return n === 0 ? 0 : 1;

    // define base cases
    let [n1, n2, n3] = [0, 1, 1];

    // loop up to n
    for (let i = 3; i <= n; i++) {
        // define recurrence relation
        const tribNum = n1 + n2 + n3;
        [n1, n2, n3] = [n2, n3, tribNum];
    }

    // return last element
    return n3;
};

/*
# Method
DP - Fibonacci Numbers (Bottom Up via 1D Array)

# Complexity
- Time:
O(n).

- Space:
O(n).
*/

function tribonacciTs(n: number): number {
    // define 1D dp array
    const dp: number[] = Array(n+1).fill(0);

    // define base cases
    dp[1] = 1;
    dp[2] = 1;

    // loop up to n
    for (let i = 3; i <= n; i++) {
        // define recurrence relation
        dp[i] = dp[i-3] + dp[i-2] + dp[i-1];
    }

    // return last element in dp array
    return dp[n];
};