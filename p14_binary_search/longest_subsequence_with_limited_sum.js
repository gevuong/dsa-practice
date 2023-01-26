/*
# Problem
https://leetcode.com/problems/longest-subsequence-with-limited-sum/description/

# Method
Sort + Prefix Sum + Binary Search

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(nlogn + mlogn) => O((n+m) x logn), 
where n and m are lengths of nums nad queries, respectively.

- Space complexity:
O(logn) to O(n), depending on language, is required to sort nums in place.
O(n) is used to store prefix sum array.
O(n + logn) ot O(2n) => O(n)
*/

var answerQueries = function(nums, queries) {
    // sort nums in ascending order, in place
    nums.sort((a, b) => a - b);

    // define queries and nums length,
    // output array.
    const queriesLen = queries.length,
        numsLen = nums.length,
        res = Array(queriesLen).fill(0);
    
    // define and calc current and prefix sum
    let currSum = 0;
    const prefixSum = [];
    for (const n of nums) {
        currSum += n;
        prefixSum.push(currSum);
    }

    // loop queries
    for (let i = 0; i < queriesLen; i++) {
        // call bSearch to find index of where query value
        // belongs in sorted nums array
        const maxSub = bSearch(prefixSum, numsLen, queries[i]);

        // assign index to output array
        res[i] = maxSub;
    }

    return res;
};

// define binary search, 
// with prefix sum and target as params
function bSearch(prefixSum, numsLen, target) {
    // define left and right pointers
    let l = 0, r = numsLen - 1;

    // loop while left and right pointers don't intersect
    while (l <= r) {
        // calc mid index
        const midIdx = Math.floor((l + r) / 2);
        // if mid value equals target, return mid index + 1
        if (prefixSum[midIdx] === target) {
            return midIdx + 1;
        }

        // if mid value < target, increment left pointer
        if (prefixSum[midIdx] < target) l++;
        // else decrement right pointer
        else r--;
    }

    return l;
}

/*
# Method
Sort + Count (Passes LC but Less efficient)

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

            // if prefix sum < queries val, increment sub length
            if (prefixSum < queries[i]) {
                j++;
            }
        }

        res[i] = j;
    }

    return res;
};