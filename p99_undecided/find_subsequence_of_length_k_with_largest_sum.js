/*
https://leetcode.com/problems/find-subsequence-of-length-k-with-the-largest-sum/description/

# Method
Sort (by Number) + Sort (by Indices)

# Intuition
Sort by numbers, then sort k largest numbers by its indices, and return those
numbers.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(nlogn + n + k) => O(nlogn). Worst case is if k equals n.

- Space complexity:
O(n + k). Use O(n) space to store array of numbers and its indices.
Worst case is if k is equals. This means the output array would be of length n.
*/

var maxSubsequence = function(nums, k) {
    // define array to store sub-arrays of an element and its index.
    // (ie. [[num1, idx1], [num2, idx2]]).
    const numsLen = nums.length,
        numIndices = [];

    // loop nums and push current element and its index to array
    for (let i = 0; i < numsLen; i++) {
        numIndices.push([nums[i], i]);
    }
    
    // sort by element in 0th index, in descending order.
    // this means the first k elements are the largest numbers in array.
    numIndices.sort((a, b) => b[0] - a[0]);
    const largestKNums = numIndices.slice(0, k);

    // sort k elements by index, in ascending order.
    largestKNums.sort((a, b) => a[1] - b[1]);

    // push element to output
    const res = [];
    for (const n of largestKNums) res.push(n[0]);

    return res;
};
