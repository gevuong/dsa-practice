/*
# Problem
https://leetcode.com/problems/maximum-ice-cream-bars/description/

# Method
Counting Sort (via Hashmap) + Greedy

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
    // define cost count, min and max cost
    const costCount = {};
    let minCost = Infinity,
        maxCost = -Infinity;

    // populate cost count, min and max cost
    for (const c of costs) {
        c in costCount ? costCount[c]++ : costCount[c] = 1;
        minCost = Math.min(minCost, c);
        maxCost = Math.max(maxCost, c);
    }

    // define min ice cream
    let minIceCream = 0;
    // loop from min to max
    for (let c = minCost; c <= maxCost; c++) {
        // loop while current cost still exists in hashmap,
        // and coins >= current cost.
        while (costCount[c] > 0 && coins >= c) {
            // subtract current cost from coin,
            // decrement cost count, and increment max count
            coins -= c;
            costCount[c]--;
            minIceCream++;
        }
    }

    return minIceCream;
};

