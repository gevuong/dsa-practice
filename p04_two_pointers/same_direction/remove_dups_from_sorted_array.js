/*
https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/

Method
Two Pointers (Same Direction)

Intuition:
1. Use a two pointer approach, and traverse input array linearly.
    If values at both pointers are equal, increment fast pointer.
    If values are different, increment slow pointer, and swap with fast pointer.

TC O(n) | SC O(1)
*/

var removeDuplicates = function(nums) {
    // define nums length, and edge case if length < 2
    const numsLen = nums.length;
    if (numsLen < 2) return nums;

    // define left pointer
    let left = 0;

    // loop starting at index 1
    for (let i = 1; i < numsLen; i++) {
        // if el equals value at left pointer, continue
        if (nums[i] === nums[left]) continue;
        // otherwise, increment left pointer and swap with el
        left++;
        [nums[left], nums[i]] = [nums[i], nums[left]];
    }

    return left + 1;
};