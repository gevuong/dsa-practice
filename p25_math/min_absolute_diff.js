/*
# Problem
https://leetcode.com/problems/minimum-absolute-difference/description/

Return a list of pairs in ascending order(with respect to pairs), each pair
[a, b] follows:

a, b are from arr
a < b
b - a equals to the minimum absolute difference of any two elements in arr

# Method
Sort + Math (Very Little)

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(nlogn + n) => O(nlogn).

- Space:
O(logn) to O(n), depending on sorting algorithm.
Output array does not count as additional space.
*/

var minimumAbsDifference = function(arr) {
    // sort array in ascending order
    arr.sort((a, b) => a - b);

    // define output, curr min abs diff, and total min abs diff
    let res = [];
    let currMin = Infinity,
        minAbsDiff = Infinity;

    // loop arr, start at i = 1
    for (let i = 1; i < arr.length; i++) {
        // calc curr min abs diff
        const sub = [arr[i-1], arr[i]];
        currMin = Math.abs(sub[1] - sub[0]);

        // if curr min abs diff < min abs diff,
        // update min abs diff and reset output with curr subarray.
        if (currMin < minAbsDiff) {
            minAbsDiff = currMin;
            res = [sub];
        // if curr equals min abs diff, push current subarray
        // to output.
        } else if (currMin === minAbsDiff) res.push(sub);
        // if curr min abs diff > min abs diff, do nothing.
    }

    return res;
};