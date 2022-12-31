/*
# Problem
https://leetcode.com/problems/subsets-ii/description/

# Method
BFS (via Subsets) + Sliding Window (Start Index)

# Intuition
1. To prevent duplicates, sort input array, and if current and previous numbers
    are equal, we want to add current number ONLY to the previous set of subsets.

# Approach
1. Define subsets array with an empty subset, and a starting window index.
2. Sort input array in ascending order.
2. If current element equals previous element, we want to update the starting
    subsets window to when the previous subsets length.
4. Update to new subsets length.
5. Loop subsets starting window and subsets length, make a copy of each subset,
    push current number to copy, and push copy to subsets.

# Complexity
- Time complexity:
O(n x 2^n + nlogn). 
Worst case is if there are no duplicates and all elements are unique.
That means there will be 2^n subsets, and it takes O(n) to create a copy of a
subset.
Also, sorting takes O(nlogn) time.

- Space complexity:
O(n x 2^n) + O(logn) or O(n).
\Worst case is if all elements are unique. This means there will be
2^n subsets, and each subset can take up to O(n) space.
Also, sorting takes O(logn) to O(n) space, depending on language.
*/

var subsetsWithDup = function(nums) {
    // define nums length, subsets, start window
    const numsLen = nums.length,
        subsets = [[]];
    let start = 0;

    // sort nums, in place, ascending order
    nums.sort((a, b) => a - b);

    // loop nums
    for (let i = 0; i < numsLen; i++) {
        // reset start index
        start = 0;

        // if prev num equals current num, update start index
        // to previous end index (or when index last ended).
        // To prevent dups, we want to add current num ONLY to
        // the prev set of subsets.
        if (i > 0 && nums[i-1] === nums[i]) start = subsLen;

        // calc and loop subsets length
        subsLen = subsets.length;
        for (let j = start; j < subsLen; j++) {
            // copy subset, push num to copy, 
            // and push copy to subset
            const copy = subsets[j].slice();
            copy.push(nums[i]);
            subsets.push(copy);
        }
    }

    return subsets;
};