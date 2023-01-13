/*
# Problem
https://leetcode.com/problems/minimum-increment-to-make-array-unique/description/

# Method
Counting Sort (via Array) + Greedy

Learn more: https://leetcode.com/problems/minimum-increment-to-make-array-unique/solutions/431873/simple-o-n-java-solution-for-slow-learners-like-myself/

# Intuition
There are 2 tricks to this problem.
1. The counting sort array must be of length (nums length + max num).
    Consider an array of all the same value. The largest number in the final 
    array will be the original value plus the length of the array. 
    For example, [10, 10, 10, 10] will become [10, 11, 12, 13].
2. Per iteration, if there are duplicate numbers, we must add the number of
    duplicates to only the min number of moves, but also to the next value in
    the counting sort array. This is because we have to find a unique value
    for the remaining duplicates. So we're moving the duplicates to the next
    value.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(3n + m) => O(n + m). Where n is length of nums, and m is range from min to max num.
Worst case is if min num is 1, then we iterate n+m times.

- Space complexity:
O(n + m) to store nums count array.
*/

var minIncrementForUnique = function(nums) {
    // calc min and max num, nums length
    const maxNum = Math.max(...nums),
        minNum = Math.min(...nums)
        numsLen = nums.length;

    // define and populate num count array.
    // we want to add nums length to max num because for example,
    // if we have nums = [3,3,3,3], the largest unique value will
    // be 6 (ie. [3,4,5,6]).
    //
    // This is calculated by nums length + max num.
    // (ie. 3 + 4 = 7).
    //
    // Therefore, given nums = [3,3,3,3], 
    // numsCount = [0,0,0,4,0,0,0].
    const numsCount = Array(numsLen + maxNum).fill(0);
    for (let n of nums) numsCount[n]++;

    let minMoves = 0;
    // loop from 3 to 7 exclusive
    for (let n = minNum; n < numsLen + maxNum; n++) {
        // ignore counts that are less than 2
        if (numsCount[n] <= 1) continue;

        // calc number of duplicates we still need to find a unique
        // value for (ie. 4 - 1 = 3 dups).
        const numDups = numsCount[n] - 1;

        // add 3 dups to the next value in nums count. In other words,
        // numsCount of value 4, which was originally 0, becomes 3.
        // (ie. numsCount = [0,0,0,4,3,2,1])
        numsCount[n+1] += numDups;

        // to account for adding 3 to value 4 in numsCount,
        // we add the number of dups to min moves, because we
        // essentially incremented the 3 dups by 1, to get to 4.
        minMoves += numDups;
    }

    return minMoves;
};