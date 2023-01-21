/*
https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/description/

# Method: Prefix Sum + Hashmap

# Intuition
The idea is that if prefix[end] - prefix[start] equals target, then the 
subarray that sums to target is [start + 1, end].

In other words, if prefix[5] - prefix[1] === target, subarray ranging from
[1+1, 5] will equal target.

nums.slice(2, 6) => sum of [2,3,4,5] => 14.

Prefix Sum Example:
nums = [0,1,2,3,4,5,6,7], target = 14
pSum = [0,1,3,6,10,15,21,28]

pSum[5] - pSum[1] = 15 - 1 = 14. 
So, subarray sum between [2..5] equals 14.
5 - 1 = 4

# Approach
    1. Create a hashmap to map prefix sum to its index.
    2. At each index i, the sum of the prefix is psum[i], so we are searching 
        for the index x where psum[x] = psum[i] - k. 
    3. The subarray [x + 1, i] will be of sum k.
    4. If psum[i] - k exists in hashmap, calculate the max length.

# Complexity
- Time complexity:
O(n). Loop every element in input array.

- Space complexity:
O(n). Space used to store prefix sum in hashmap.
*/

var maxSubArrayLen = function(nums, k) {
    // define maxLen = 0, current sum, prefix sum array
    const numsLen = nums.length,
        prefixSumObj = {};
    let maxLen = 0,
        prefixSum = 0;

    // loop nums
    for (let i = 0; i < numsLen; i++) {
        // add el to prefix sum
        prefixSum += nums[i];
        const diff = prefixSum - k;

        // if prefix sum equals k, set new max length, which is
        // from 0 to current index + 1. 
        if (prefixSum === k) maxLen = i + 1;

        // check if target - prefix sum was previously encountered and
        // stored in object.
        if (prefixSumObj.hasOwnProperty(diff)) {
            // calc max length
            maxLen = Math.max(maxLen, i - prefixSumObj[diff]);
        }

        // store prefix sum and its index
        if (!(prefixSum in prefixSumObj)) prefixSumObj[prefixSum] = i;
    }

    return maxLen;
};
