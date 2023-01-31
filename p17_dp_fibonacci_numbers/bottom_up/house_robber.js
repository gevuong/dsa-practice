/*
https://leetcode.com/problems/house-robber/description/

Method
DP - Fibonacci Numbers (Bottom Up via 1D Array)

Approach:
1. A function or data structure that will compute/contain the answer to the problem 
    for every given state.

2. Define a function that computes the solution at each given state.

3. Define recurrence relation.
- At every house, we have 2 options: rob or don't rob the house.
- If we decide not to rob the house, then we do not gain any money. 
    The amount of money we had at the previous house will be the amount we have 
    at this house, which is `dp(i-1)`.
- If we decide to rob the house, then we gain `nums[i]` money. 
    However, this is only possible if we don't rob the previous house. 
    This means that the money we currently have is the amount we had at the 
    previous house without robbing it. In other words, the money we have at the
    current house is the amount we had 2 houses ago, which is `dp(i-2)`.
- After robbing the current house, we would have `dp(i-2) + nums[i]` money.
- From these two amount, we want to pick the largest amount. 
    Therefore, the recurrence relation is `dp(i) = Math.max(dp(i-1), dp(i-2) + nums[i])`.

4. Define base case(s).
    - If there is only 1 house, then the max profit would be from that house, `dp(0) = nums[0]`.
    - If there are 2 houses, the max profit would be the max amount between the 2 houses, 
    which is `dp(1) = Math.max(nums[0], nums[1])`.
*/

var rob = function(nums) {
    // define nums length, dp array of nums length + 1
    const numsLen = nums.length,
        dp = Array(numsLen + 1).fill(0);

    // define base case.
    // if we have 0 homes to rob, then max profit is 0.
    // if we have 1 home to rob, then max profit is robbing the first house.
    dp[1] = nums[0];

    // loop nums starting at i=2
    for (let i = 2; i <= numsLen; i++) {
        // define recurrence relation.
        // calc max between previous max profit (ie. dp[i-1]), 
        // and the max profit two homes back (ie. dp[i-2]), plus the current house we are robbing.
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i-1])
    }

    // return last element in dp array
    return dp[numsLen];
};

/*
Solution without an additional element in dp array.
May be cleaner and less confusing.
*/

var rob = function(nums) {
    // define nums length, dp array of nums length + 1
    const numsLen = nums.length,
        dp = Array(numsLen).fill(0);

    // handle edge cases.
    if (numsLen === 0) return 0;
    if (numsLen === 1) return nums[0];

    // define base cases.
    // at 0th index, max profit is nums[0].
    // at 1st index, calc max between 0th and 1st home.
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    // loop nums starting at i=2
    for (let i = 2; i < numsLen; i++) {
        // define recurrence relation.
        // max between previous max profit, 
        // and the max profit two houses back + profit from current home.
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i])
    }

    // return last element in dp array
    return dp[numsLen-1];
};