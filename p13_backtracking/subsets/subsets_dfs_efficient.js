/*
# Problem
https://leetcode.com/problems/subsets/description/

# Method
Backtracking (via Recursive DFS)

# Intuition
- This problem is very unique, because every decision made in binary decision tree
    (to include or not to include an element), is a valid subset.
- This means that some of the leaf nodes are also in other parts of the 
    binary decision tree.
- Therefore, we can potentially end the search earlier.
- In other words, we don't have to wait until we reach the leaf node to add to
    the list of subsets. We can add to the subsets at each step.

For more info: https://algo.monster/problems/subsets_backtracking

Decision Tree
        []
       /  \
    [1]    []
   /  \    / \
[1,2] [1] [2] []

# Approach
1. Define backtrack method with the current subset and initial nums index 
    as state variables.
2. Don't need a base case. Instead, push a copied subset to the results array.
3. Next, within backtrack method, loop all possible nums, and within each
    iteration, push current element to current subset, call backtrack with
    updated current subset and incremented nums index.
4. Pop from current subset

# Complexity
- Time complexity:
TC O(n x 2^n).

- Space complexity:
TC O(n x 2^n).
*/

var subsets = function(nums) {
    // define subsets, backtrack method with starting nums index and current subset
    const subsets = [],
        numsIdx = nums.length,
        backtrack = (sub, start) => {
            // define base case? 
            // No need for base case because
            // 1. every subset passed to backtrack method is a valid subset,
            // 2. recursive calls will end once all nums are processed.
            
            // push current subset to subsets
            subsets.push([...sub]);

            // loop all possible candidates
            for (let i = start; i < numsIdx; i++) {
                // Note: Don't need to check if current element is valid.
                // push current element to sub
                sub.push(nums[i]);
                // call backtrack with next index to explore further.
                backtrack(sub, i+1);
                // pop from subset
                sub.pop();
            }
        };

    // call backtrack with empty subset and starting nums index as state variables.
    backtrack([], 0);
    return subsets;
};