/*
# Problem
https://leetcode.com/problems/fruit-into-baskets/description/

# Method
Sliding Window + Count (via Hashmap)

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(2n) => O(n). Max number of visits per node is 2, one by end window pointer,
and one by start window pointer.

- Space complexity:
O(3) => O(1). Max number of fruit types in hashmap is 3.
*/

var totalFruit = function(fruits) {
    // define fruits length, fruit count
    const fruitsLen = fruits.length,
        fruitsCount = {};

    // handle edge case
    if (fruitsLen === 0) return 0;

    // define max fruits, start window, type count
    let start = 0,
        maxFruits = 0,
        typeCount = 0;

    // loop fruits
    for (let end = 0; end < fruitsLen; end++) {
        // increment fruit count regardless if fruit existed in map or not.
        // And if fruit never existed in map, increment type count
        if (!(fruits[end] in fruitsCount)) {
            fruitsCount[fruits[end]] = 1;
            typeCount++;
        } else fruitsCount[fruits[end]]++;

        // while type count > 2, shrink window via start pointer
        // until there are no more than 2 types.
        while (typeCount > 2) {
            // decrement count of fruit at starting index
            fruitsCount[fruits[start]]--;

            // if fruit count equals 0, then delete key value,
            // and decrement type count
            if (fruitsCount[fruits[start]] === 0) {
                delete fruitsCount[fruits[start]];
                typeCount--;
            }
            // shrink start window
            start++;
        }
        // calc max number of fruits
        maxFruits = Math.max(maxFruits, end - start + 1);
    }

    return maxFruits;
};