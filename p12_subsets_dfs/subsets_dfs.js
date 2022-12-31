/*
Problem: https://leetcode.com/problems/subsets/

Runtime: 96 ms, faster than 67.84% of JavaScript online submissions for Subsets.
Memory Usage: 43.4 MB, less than 63.37% of JavaScript online submissions for Subsets.

For each element in nums, the number of subsets double, which results in 2^n time and space, where n is length of nums.
If nums = [1], then number of subsets is 2. If nums = [1,2], number of subsets is 4, etc.

Since we create a new subset for each existing subset, the time and space it takes is O(n).

TC O(n x 2^n), there are 2^n subsets, and creating a copy of a subset can take at most O(n) time
because a subset can contain at most n elements.
SC O(n x 2^n), there are 2^n subsets, and a subset can contain at most n elements.

Decision Tree
        []
       /  \
    [1]    []
   /  \    / \
[1,2] [1] [2] []
...
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