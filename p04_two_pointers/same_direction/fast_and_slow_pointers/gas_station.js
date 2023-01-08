/*
# Problem
https://leetcode.com/problems/gas-station/description/

# Method
Two Pointers (Fast and Slow) + Visited Array
Not the most space efficient. Can be done in greedy one-pass.

# Intuition
- Similar to circular array loop, where for each station, we see if we can visit
remaining stations.
- The main difference is we only increment once to the next gas station.
- If station has been visited, we can skip it because we know from previous
iteration, that at the station, there wasn't enough gas to traverse circuit once.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity
O(n).

- Space complexity
O(n).
*/

var canCompleteCircuit = function(gas, cost) {
    // define gas length, visited count, visited array,
    // current gas amount
    const gasLen = gas.length,
        visited = Array(gasLen).fill(false);

    // loop gas
    for (let i = 0; i < gasLen; i++) {        
        // if station has been visited, skip.
        // otherwise, set visited at current index to true.
        if (visited[i]) continue;
        visited[i] = true;

        // define remaining gas amount, and cost index
        let remainingGas = 0,
            currIdx = i;

        while (true) {
            // add gas at current jth station to current gas.
            remainingGas += gas[currIdx];
            // if remaining gas is not enough to travel to next station,
            // break and move on to next possible starting gas station.
            if (remainingGas < cost[currIdx]) break;

            // otherwise, subtract cost from remaining gas
            remainingGas -= cost[currIdx];
            visited[currIdx] = true;
            
            // calc next index, loop around if we reach end of array.
            const nextIdx = (currIdx + 1) % gasLen;

            // if next index equals the gas station we started at,
            // return starting index.
            if (nextIdx === i) return i;
            currIdx = nextIdx;
        }
    }

    return -1;
};