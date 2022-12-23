/*
# Problem
https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/

# Method
Two Pointers (Same Direction)

# Intuition
As we visit each price, we want to track the min stock price we visited so far.
This min stock price will be the price we buy the stock.
As far as when we sell the stock, we can sell the stock at each subsequent price
we visit. We then compare the current profit with the max profit and update
max profit, if necessary.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(n)

- Space complexity:
O(1)
*/

var maxProfit = function(prices) {
    // define prices length, max profit, lowest stock price
    const pricesLen = prices.length;
    let maxProfit = 0, 
        lowest = prices[0];

    // loop prices
    for (let i = 1; i < pricesLen; i++) {
        const currProfit = prices[i] - lowest;
        if (currProfit > maxProfit) maxProfit = currProfit;
        if (lowest > prices[i]) lowest = prices[i];
    }

    return maxProfit;
};