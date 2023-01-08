/*
# Problem
https://leetcode.com/problems/minimum-rounds-to-complete-all-tasks/description/

# Method
Counting Sort (via Hashmap) + Greedy + Math

# Intuition
- Initially thought this may be a DP problem, similar to Climbing Stairs.
- But realized this can be solved via greedy approach, broke the problem down
    with example frequencies to see how to handle different remainders if
    divided by 3.

# Approach
1. Count number of times a level appears via hashmap.
2. Loop hashmap values.
    a. Calc remainder if value is divided by 3.
    b. If count equals 1, return -1.
    b. If remainder equals 0, add result of value / 3 to min rounds.
    c. If remainder is not 0, add result of value / 3, rounded down, + 1 to min rounds.
3. Return min rounds.

# Complexity
- Time complexity:
O(n + n) => O(n).
Worst case is when there are n unique levels in tasks. This means we iterate
n elements twice, one to populate hashmap, and another to access the count of
each level.

- Space complexity:
O(n). Worst case is if there are n unique levels in tasks.
*/

var minimumRounds = function(tasks) {
    // define frequency count, tasks length, min count
    const levelCount = {};

    // count number of times a level occurs in tasks.
    for (const level of tasks) {
        levelCount[level] ? levelCount[level]++ : levelCount[level] = 1;
    }

    // init min rounds
    let minRounds = 0;
    // loop frequency values in hashmap
    for (const k in levelCount) {
        // calc remainder of val / 3
        const remainder = levelCount[k] % 3;
        let count = levelCount[k];

        // if count equals 1, then we cannot complete all tasks.
        if (count === 1) return -1;

        // if remainder is 0, divide count by 3 and add result to min rounds
        if (remainder === 0) minRounds += count / 3;
        // otherwise, divide count by 3, round down, and add 1 to result.
        // This is because regardless if remainder is 1 or 2, 
        // we know that all it takes is one additional round to complete
        // all tasks.
        // For example: if counts are the following:
        // 5 = 3 x 1 + 2 => requires 2 min rounds (1 round of 2 tasks, 1 round of 3 tasks)
        // 7 = 3 x 1 + 2 + 2 => requires 3 min rounds (2 rounds of 2 tasks, 1 round of 3 tasks)
        else minRounds += Math.floor(count / 3) + 1;
    }

    return minRounds;
};

/*
My Initial Solution:

# Method
Counting Sort (via Hashmap) + Greedy + Math
*/
var minimumRounds = function(tasks) {
    // define frequency count, tasks length, min count
    const levelCount = {};

    // populate frequency count via for loop
    for (const level of tasks) {
        levelCount[level] ? levelCount[level]++ : levelCount[level] = 1;
    }

    // init min rounds
    let minRounds = 0;
    // loop frequency values in hashmap
    for (const k in levelCount) {
        // calc remainder of val / 3
        const remainder = levelCount[k] % 3;
        let count = levelCount[k];

        // if count equals 1, then we cannot complete all tasks.
        if (count === 1) return -1;

        // if remainder is 0, divide count by 3 and add result to min rounds
        if (remainder === 0) minRounds += count / 3;

        // else if remainder 1, it takes 2 sets of level 2 to complete
        else if (remainder === 1) {
            // subtract 2 sets of level 2, which is 4, from count.
            // this will make remaining value divisible by 3, and we add
            // 2 rounds to account for the value we subtracted by.
            minRounds += ((count - 4) / 3) + 2;
        
        // else if remainder 2, it takes 1 set of level 2 to complete.
        } else minRounds += ((count - 2) / 3) + 1;
    }

    return minRounds;
};
