/*
# Problem
https://leetcode.com/problems/longest-common-subsequence/description/

# Method
2D DP Bottom Up

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
1. Define a 2D DP array to store solution at each unique state.
2. Define base cases.
    - Because we rely on the previous row and col to determine lcs, we can 
        define the initial row and col to be zeroes.
    
3. Define recurrence relation.
    - If the characters are equal, we add 1 to the top left of current cell
        (ie. [row-1][col-1]) to determine lcs at dp current cell.
    - However, if chars are not equal, we simply take the max between the top
        (ie. [row-1][col]) or left (ie. [row][col-1]) of current cell as the
        lcs of current cell.

4. The bottom right value of dp array should contain the lcs.

# Complexity
- Time complexity:
O(n x m)

- Space complexity:
O(n x m)
*/

var longestCommonSubsequence = function(text1, text2) {
    // define 2d dp array to store solution at each unique state.
    // base cases 
    const t1Len = text1.length,
        t2Len = text2.length,
        dp = Array(t1Len + 1).fill(null).map(() => Array(t2Len + 1).fill(0));

    // loop each row, starting at row = 1
    for (let row = 1; row <= t1Len; row++) {
        // loop each col starting at col = 1
        for (let col = 1; col <= t2Len; col++) {
            // define recurrence relation.
            // if current chars are not equal, we calculate max between the
            // left (ie. [row][col-1]) and top (ie. [row-1][col]) of current cell,
            // and assign value to current cell in dp array.
            let currMax = Math.max(dp[row-1][col], dp[row][col-1]);

            // however, if current chars are equal, we add 1 to the current max
            // at the top left of current cell (ie. [row-1][col-1]), and assign
            // value to current cell in dp array.
            if (text1[row-1] === text2[col-1]) currMax = dp[row-1][col-1] + 1;
            dp[row][col] = currMax;
        }
    }

    // return bottom right value in dp array
    return dp[t1Len][t2Len];
};