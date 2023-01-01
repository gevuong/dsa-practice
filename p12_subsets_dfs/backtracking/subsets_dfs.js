/*
# Problem
https://leetcode.com/problems/subsets/description/

# Method
Backtracking (via Recursive DFS)

# Intuition
Traverse binary decision tree until we reach leaf node, only push subset to
output array when leaf node is reached.

Decision Tree
        []
       /  \
    [1]    []
   /  \    / \
[1,2] [1] [2] []

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(n x 2^n). 
There are 2^n subsets, because for each element in nums, the number
of subsets double, where n is length of nums. 
Also, creating a copy of a subset can take at most O(n) time because a subset 
can contain at most n elements.

- Space complexity:
O(n x 2^n).
Recursive call stack is at most O(n) space. Each level of binary decision tree
represents an element in nums. Also, we are copying a subset of at most n elements,
2^n times.
*/

var subsets = function(nums) {
    // define subsets, nums length
    const subsets = [],
          numsLen = nums.length;
    let sub = [];
    
    // define backtracking method with a single state, nums index.
    const dfs = (i) => { 
        // define base case.
        // if nums index >= nums length, push copy of subset to output.
        if (i >= numsLen) {
            subsets.push([...sub]);
            return;
        }
    
        // include current value to current subset.
        // call dfs with incremented index
        sub.push(nums[i]);
        dfs(i+1);
    
        // or not include current value to current subset.
        // call dfs with incremented index.
        sub.pop();
        dfs(i+1);
    }
    
    // call backtrack
    dfs(0);
    return subsets;
};