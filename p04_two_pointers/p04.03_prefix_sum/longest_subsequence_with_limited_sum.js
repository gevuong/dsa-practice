/*
# Problem
https://leetcode.com/problems/longest-subsequence-with-limited-sum/description/

# Method
Sort and Count (Passes LC but Less efficient)

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(nlogn + m x n), where n and m are lengths of nums nad queries, respectively.

- Space complexity:
O(logn) to O(n), varies based on language. 
Space is required to sort nums in place.
*/

var answerQueries = function(nums, queries) {
    // sort nums, ascending order, in place
    nums.sort((a, b) => a - b);

    // define output array of size queries, sub length,
    // prefix sum, nums pointer, nums length
    const queriesLen = queries.length,
        numsLen = nums.length,
        res = Array(queriesLen).fill(0);
    let prefixSum = 0,
        j = 0;

    // loop queries
    for (let i = 0; i < queriesLen; i++) {
        // loop while nums pointer < nums length 
        // and prefix sum < queries val
        j = prefixSum = 0;
        while (j < numsLen) {
            // add num to prefix sum
            prefixSum += nums[j];

            // if prefix sum equals queries val,
            // set output array to nums pointer, 
            // increment sub length and break
            if (prefixSum === queries[i]) {
                j++
                res[i] = j;
                break;
            }

            // if prefix sum > queries val, we want to update
            // output array, and break from loop
            if (prefixSum > queries[i]) {
                res[i] = j;
                break;
            }

            // if prefix sum < queries val, incement sub length
            if (prefixSum < queries[i]) {
                j++;
            }
        }

        res[i] = j;
    }

    return res;
};