/*
# Problem
https://leetcode.com/problems/gas-station/description/

# Method
Two Pointers (Fast and Slow, Same Direction) + Greedy (One Pass)
For more info: https://www.youtube.com/watch?v=wDgKaNrSOEI

# Intuition
- Reminded me of circular array loop, where we track which gas stations were
visited for each starting gas index.
- I originally solved it using a visited array, which is more intuitive to me.

- However, this can actually be solved without a visited array.
- We can find the starting index in one pass. Whenever the tank < 0,
that means all previous gas stations are not valid solutions.
- Therefore, reset tank to 0, and update starting index to the next index in
loop.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(n).

- Space complexity:
O(1).
*/

var canCompleteCircuit = function(gas, cost) {
    // define gas length
    const gasLen = gas.length;
    
    // calc sum of difference. if the sum of gas at all stations
    // is greater than the sum of all costs, then there must be a
    // valid starting gas station index.
    let diffSum = 0;
    for (let i = 0; i < gasLen; i++) {
        diffSum += (gas[i] - cost[i]);
    }
    // if sum of difference is less than 0, then there is no solution.
    if (diffSum < 0) return -1;

    // define start index, and gas tank
    let start = 0,
        tank = 0;

    // loop gas stations. Because start is i + 1, we don't want
    // start index to exceed gas length.
    for (let i = 0; i < gasLen - 1; i++) {
        // fill tank at current gas station
        tank += gas[i];
        // subtract cost to get to next station from tank
        tank -= cost[i];

        // if tank < 0, update start to the next index,
        // and reset tank.
        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }
    // return start index
    return start;
};
