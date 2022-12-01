/*
https://leetcode.com/problems/coin-change/

Runtime: 162 ms, faster than 67.07% of JavaScript online submissions for Coin Change.
Memory Usage: 48.1 MB, less than 42.37% of JavaScript online submissions for Coin Change.

TC O(n x m)
SC O(n x m), store 2D dp array.
where m is length of coins, and n is amount.

Note: This can be solved with O(n) space, a 1D dp array. We can eliminate one
    of the states because we can have as many of a particular coin as we need.
    If on the other hand, we were limited to 'k' uses of a coin, we would need
    to track the number of limited uses.
*/

var coinChange = function(coins, amount) {
    // define 2d array to store solution at each state.
    // dp[i][j] represents the min number of coins (which includes up to the
    // ith index in coins), 
    // needed to make jth amount.
    const coinsLen = coins.length,
          dp = Array(coinsLen).fill(Infinity).map(() => Array(amount+1).fill(Infinity));
    
    // define base case.
    // first column, min number of coins needed to make amount 0, is 0.
    for (let i = 0; i < coinsLen; i++) dp[i][0] = 0;

    // loop each coins index
    for (let i = 0; i < coinsLen; i++) {
        // loop amount, start at 1, end at amount inclusive.
        for (let j = 1; j <= amount; j++) {
            
            // define recurrence relation.
            // Two options:
            // 1. don't include current coin,
            // so we refer to previous coin index. This means index
            // must be greater than 0 to reference a previous coin index.
            let withoutCoinCount = Infinity;
            if (i > 0) withoutCoinCount = dp[i-1][j];
        
            // 2. include current coin in calculating the amount,
            // subtract coin from amount, 
            // and add 1 to count to include current coin.
            let withCoinCount = Infinity;
            if (coins[i] <= j) withCoinCount = dp[i][j-coins[i]] + 1;
            
            // take the min between both options.
            dp[i][j] = Math.min(withoutCoinCount, withCoinCount);
        }
    }
    // return bottom right value in dp array.
    return dp[coinsLen-1][amount] === Infinity ? -1 : dp[coinsLen-1][amount];
};



