/*
Problem: https://leetcode.com/problems/subsets/
Runtime: 64 ms, faster than 96.53% of JavaScript online submissions for Subsets.
Memory Usage: 44 MB, less than 41.82% of JavaScript online submissions for Subsets.

For each element in nums, the number of subsets double, which results in 2^n time and space, where n is length of nums.
If nums = [1], then number of subsets is 2. If nums = [1,2], number of subsets is 4, etc.

Since we create a new subset for each existing subset, the time and space it takes is O(n).

TC O(n x 2^n), there are 2^n subsets, and creating a copy of a subset can take at most O(n) time
because a subset can contain at most n elements.
SC O(n x 2^n), there are 2^n subsets, and a subset can contain at most n elements.
*/

var subsets = function(nums) {
    // define output with empty subset
    const subsets = [[]];
    
    // loop nums
    for (const n of nums) {
        // loop subsets length
        const subsetsLen = subsets.length;
        for (let j = 0; j < subsetsLen; j++) {
            // access each subset in subsetsCopy            
            const sub = subsets[j].slice();
            // push num to subset
            sub.push(n);
            // push new subset to subsets
            subsets.push(sub);
        }
    }
    
    return subsets;
};