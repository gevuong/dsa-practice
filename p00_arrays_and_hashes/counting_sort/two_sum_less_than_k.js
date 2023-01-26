/*
# Problem
https://leetcode.com/problems/two-sum-less-than-k/description/

# Method
Counting Sort (via Array) + Two Pointers (Opposite Directions)

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(n + n + m) => O(n+m), where n is length of nums, and m is the range between
min and max num.

- Space:
O(m), where m is max element in nums.
*/

var twoSumLessThanK = function(nums, k) {
    // define max num
    let max = Math.max(...nums);
    
    // define and populate nums count array
    const numsCount = Array(max+1).fill(0);
    for (const n of nums) numsCount[n]++;

    // define min num, and max closest to sum
    let min = Math.min(...nums),
        maxClosest = -1;

    // loop from min to max
    while (min < max) {
        // if min count > 0 && max count > 0, then we can
        // add min and max and compare with k.
        if (numsCount[min] > 0 && numsCount[max] > 0) {
            // calc sum
            const sum = min + max;

            // if sum equals k - 1, then we have the closest possible sum
            // thats less than k.
            if (sum === k - 1) return sum;

            // if sum < k
            if (sum < k) {
                // calc max sum, and increment min
                maxClosest = Math.max(sum, maxClosest);
                min++;
            // else decrement max
            } else max--;
        } 
        else if (numsCount[min] === 0) min++;
        else max--;
    }

    // if we reach here, that means min and max are equal.
    // So if count > 1, we know that the same element exists 
    // but at different indices. 
    // Therefore, min and max can be a valid two sum that is potentially
    // less than k.
    if (numsCount[min] > 1) {
        const sum = min + max;
        if (sum < k) {
            maxClosest = Math.max(maxClosest, sum);
        }
    }

    return maxClosest;
};