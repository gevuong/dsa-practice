/*
# Problem
https://leetcode.com/problems/subarray-sums-divisible-by-k/

Helpful resource: https://youtu.be/u9m-hnlcydk?t=85

There's also a visual diagram in /images in this repo that shows a subarray between
index i+1 and j, which has the same remainder, is a subarray sum that is
divisible by k.

# Method
Prefix Sum + Prefix Mod + Hashmap (map prefix mod to count)

# Intuition
1. The main idea is, we can only have a remainder between 0 and k. So if we 
    encounter the same remainder (or prefix mod) more than once, we know that
    we have encountered a subarray sum divisible by k.
2. But how?
    For example, given nums = [4,5,0], k = 5, the prefix sum = [4,9,9], and
    the prefix remainder (or mod) = [4,4,4].
    
    2a. This means that at index 0, we had a prefixSum[0] = 4, and a prefixMod[0] = 4.
    2b. Now, because at the next index of 1, we got a prefixMod[1] = 4 AGAIN.
    2c. This suggests that we added a value of exactly k (or 5) to the prefix sum,
        which equals prefixSum[1] = 9.
    2d. This means that the value we added, k (or 5), should be divisible by k,
        making it a subarray sum between index [1,1] inclusive.
    
    2e. If later down the line, like at index 4, we stumble on the same remainder
        or prefixMod[4] = 4 AGAIN. Then we know there is a subarray sum between
        the last index we encountered that remainder, and the current index.

3. Make sure that the hashmap only contains positive remainders between 0 to k.
    If there are negative remainders, then count will be inaccurate.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(n).

- Space:
O(k), where k is the max number of unique remainders in the hashmap.
*/

var subarraysDivByK = function(nums, k) {
    // define nums legnth, mod count, number of subarrays,
    // and prefix sum.
    const numsLen = nums.length,
        modCount = { 0: 1 };
    let numSubs = 0,
        prefixSum = 0;

    // loop nums
    for (let i = 0; i < numsLen; i++) {
        // calc prefix sum
        prefixSum += nums[i];

        // calc remainder dividing prefix sum by k
        let remainder = prefixSum % k;

        // make remainder positive by adding k, then calc remainder
        // of positive value.
        // A negative remainder can still be divisible by k, except it
        // won't be accurately represented in the hashmap.
        // We only want to count remainders between 0 and k.
        // A negative remainder will have its own unique key in map.
        if (remainder < 0) remainder = (remainder + k) % k;

        // if remainder exists in mod count, then we know that we have
        // encountered a subarray sum that was divisible by k.
        if (remainder in modCount) numSubs += modCount[remainder];

        // increment remainder count in map
        remainder in modCount ? modCount[remainder]++ : modCount[remainder] = 1;
    }

    return numSubs;
};
