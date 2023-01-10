/*
# Problem
https://leetcode.com/problems/maximum-ice-cream-bars/description/

# Method
Counting Sort (via Array) + Greedy

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(n+m), where n equals length of costs, and m is range from min to max cost.

- Space complexity:
O(n). Worst case is all cost values are unique. This means hashmap will contain
n values.
*/

var maxIceCream = function(costs, coins) {
    // define min and max count
    let minCost = Infinity,
        maxCost = -Infinity;

    for (const c of costs) {
        minCost = Math.min(minCost, c);
        maxCost = Math.max(maxCost, c);
    }

    // define cost count array, min and max count
    const costCount = Array(maxCost + 1).fill(0);
    for (const c of costs) costCount[c]++;
    
    // loop costs, and populate cost count array
    let maxIceCream = 0;
    for (let cost = minCost; cost <= maxCost; cost++) {
        // if cost is greater than coins, then no 
        // coin amount can buy any ice cream.
        if (cost > coins) break;

        while (costCount[cost] > 0 && cost <= coins) {
            coins -= cost;
            costCount[cost]--;
            maxIceCream++;
        }
    }

    return maxIceCream;
};