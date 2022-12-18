/* 
Problem: https://leetcode.com/problems/coin-change-ii/

Super helpful resources:
2D DP bottom up concept: https://www.youtube.com/watch?v=DJ4a7cmjZY0
1D DP bottom up approach: https://www.youtube.com/watch?v=jaNZ83Q3QGc

Runtime: 179 ms, faster than 41.12% of JavaScript online submissions for Coin Change II.
Memory Usage: 69.6 MB, less than 37.01% of JavaScript online submissions for Coin Change II.

TC O(n x m)
SC O(n x m)

Note: This can be solved with O(n) space, a 1D dp array. We can eliminate one
    of the states because we can have as many of a particular coin as we need.
    If on the other hand, we were limited to 'k' uses of a coin, we would need
    to track the number of limited uses.
*/
var change = function(amount, coins) {
    // define 2d array to store solution at each state.
    const coinsLen = coins.length,
          dp = Array(coinsLen).fill(0).map(() => Array(amount+1).fill(0));
    
    // define base case.
    // At amount 0 (or 0th column), there can only be 1 combo
    // that makes up that amount, which is [].
    for (let i = 0; i < coinsLen; i++) dp[i][0] = 1; 
    
    // traverse 2d dp array linearly.
    // loop coins indices
    for (let i = 0; i < coinsLen; i++) {
        // loop from 1 to amount inclusive. 
        // Each jth value represents an amount.
        for (let j = 1; j <= amount; j++) {
            // define recurrence relation.
            // Two options:
            // 1. don't include current coin.
            // 1a. if we don't include current coin, we look at the previous row (ie. previous coins index)
            //     for the number of combos since it does not include current coin index.
            // 1b. we ony consider previous row if coins index > 0, otherwise, we cannot access -1 index. 
            if (i > 0) dp[i][j] = dp[i-1][j];
            // 2. include current coin.
            // 2a. if current coin value <= j amount, then we want to add the number of combos
            //     from the subproblem solved at the current row, i, but at column j-coins[i].
            // 2b. if current coin value > j amount, then there's no way current coin can make change of j amount. 
            if (coins[i] <= j) dp[i][j] += dp[i][j-coins[i]];
        }
    }
    
    // return bottom right value in dp array.
    return dp[coinsLen - 1][amount];
};