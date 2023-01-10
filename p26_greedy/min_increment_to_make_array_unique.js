/*
# Problem
https://leetcode.com/problems/minimum-increment-to-make-array-unique/description/

# Method
Sort + Greedy

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
1. Sort array in ascending order.
2. Because we are only allowed to increment a number by 1, we should create
    a variable to keep track of the min unique number.
3. Loop nums.
    3a. if current num is less than or equal to min unique number, 
        the next min unique number will be min unique number + 1.
        There's a possibility that the current num can be less than the min
        unique number, so we want to account for that.
    3b. Subtract the new min unique number by current number to determine the
        number of moves to make current number unique.
    3c. If current num is greater than min unique number, set min unique number
        to current num. Because numbers are sorted, and it's not possible
        to decrement current num to make number unique, it makes sense to
        assign min unique number to the current num.

# Complexity
- Time complexity:
O(nlogn + n).

- Space complexity:
O(logn) to O(n), depending on how sort algorithm was implemented by language.
*/

var minIncrementForUnique = function(nums) {
    // sort nums
    nums.sort((a, b) => a - b);

    // define min moves, and next unique num
    let minMoves = 0,
        minUniqNum = nums[0];

    // loop sorted nums
    for (let i = 1; i < nums.length; i++) {
        // if current num <= next unique num, increment next
        // unique num, and subtract current num from the next
        // unique num to calc min number of moves to make
        // current num unique.

        if (nums[i] <= minUniqNum) {
            minUniqNum++;
            minMoves += minUniqNum - nums[i];

        // if current num > next unique num, update the
        // next unique num to current num.
        } else minUniqNum = nums[i];
    }

    return minMoves;
};