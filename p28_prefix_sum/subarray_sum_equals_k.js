/*
# Problem
https://leetcode.com/problems/subarray-sum-equals-k/description/

Given an array of integers nums and an integer k, return the total number of 
subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

# Method
Prefix Sum + Hashmap (map prefix sum to count)

# Intuition
1. The idea is that for each iteration, we store the prefix sum count in the
    hashmap.
2. During any iteration, if the difference of a prefix sum and k exists as a
    key in the hashmap, that means that in a previous iteration, we encountered a
    prefix sum that equals that difference. This in turn means there is x number of
    subarray sums we encountered, that equals k.
3. What is that number? It would be the value of the key value pair, where the
    key is the difference between the prefix sum and k.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(n). We visit each element in array at most once.

- Space:
O(n). Worst case is the prefix sum at each iteration is unique. This means there
would be n key value pairs in hashmap.
*/

var subarraySum = function(nums, k) {
    // define count, prefix sum, nums length,
    // and difference count hashmap with 0 mapped to 1.
    // This will account for if subarray equals k, then
    // we want to include subarray to our count.
    const numsLen = nums.length,
        diffCount = { 0 : 1 };
    let numSubs = 0,
        prefixSum = 0;

    // loop nums
    for (let i = 0; i < numsLen; i++) {
        // calc prefix sum
        prefixSum += nums[i];
        const diff = prefixSum - k;
        // if prefix sum - k exists in map, then
        // we have a subarray sum that equals k,
        // so add count to number of subs.
        if (diff in diffCount) numSubs += diffCount[diff];
        
        // regardless, we want to increment (prefix sum - k) count
        // in hashmap.
        prefixSum in diffCount ? 
        diffCount[prefixSum]++ : diffCount[prefixSum] = 1;
    }

    return numSubs;
};