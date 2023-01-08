/*
# Problem
https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/

# Method
Two Pointers (Consecutive Valley Peak Approach)

# Intuition
1. We need to consider every peak immediately following a valley to maximize profit.
2. If we skip a peak following a valley in an attempt to find a higher peak,
    the net profit will always be lesser than the net profit obtained by including
    every consecutive valley peak.
3. Remember, since we can only hold at most one share of the stock at any time,
    we can buy the stock immediately after we sell it on the same day.

Example:
    prices = [1,2,3,4,5]
    maxProfit = (2-1) + (3-2) + (4-3) + (5-4) = 4

# Approach
1. Define a max profit variable.
2. Loop prices, and if the current price is greater than the previous price,
    simply add different to max profit.
3. Return max profit.

# Complexity
- Time complexity:
O(n)

- Space complexity:
O(1)
*/

var maxProfit = function(prices) {
    // define prices length, 1d dp array of size prices length
    const pricesLen = prices.length;
    let maxProfit = 0;

    // loop prices, begin at index 1
    for (let i = 1; i < pricesLen; i++) {
        if (prices[i] > prices[i-1]) {
            maxProfit += prices[i] - prices[i-1];
        }
    }

    return maxProfit;
};