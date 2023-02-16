/*
# Problem
https://leetcode.com/problems/jump-game/

You are given an integer array nums. You are initially positioned at the array's
first index, and each element in the array represents your maximum jump length
at that position.

Return true if you can reach the last index, or false otherwise.

# Method
Greedy + Two Pointers (Fast and Slow Pointers in Reverse Direction)

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
- Define a fast pointer that points to the index we want to reach, which in
    this case is the last index.
- Traverse array in reverse order, starting at the second to last index.
- If the second to last element can jump to the last element, then we can
    update the goal pointer, and shift it to the current index.
- This will be the new index that we want to reach as we continue to traverse
    the array in reverse order.
- After loop array, if the goal pointer equals 0th index, then we know that
    we can reach the last index, starting at the array's 0th index.

# Complexity
- Time:
O(n)

- Space:
O(1)
*/

var canJump = function(nums) {
    // define index we want to reach
    let goal = nums.length - 1;

    // loop in reverse order, starting at the second to last
    // element.
    for (let i = nums.length - 2; i >= 0; i--) {
        // if the current index + max jump length at current index
        // is greater than or equal to the goal, then we can shift
        // the goal to the current index.
        if (i + nums[i] >= goal) goal = i;
    }

    // if goal is located at the 0th index, then we know
    // that we can reach the last index
    return goal === 0;
};