/*
https://leetcode.com/problems/subsets-ii/

Runtime: 124 ms, faster than 35.00% of JavaScript online submissions for Subsets II.
Memory Usage: 44.9 MB, less than 45.38% of JavaScript online submissions for Subsets II.

TC O(nlogn + n x 2^n) -> O(n x (logn + 2^n)) -> O(n x 2^n)
SC O(logn) ?
*/
var subsetsWithDup = function(nums) {
    // sort nums in-place in ascending order.
    nums.sort((a, b) => a - b);
    
    // define subsets
    const subsets = [[]],
          numsLen = nums.length;
    let startIdx = 0,
        endIdx = 0;
    
    // loop nums
    for (let i = 0; i < numsLen; i++) {
        // reset start index
        startIdx = 0;
        
        // if previous and current num are equal,
        // update start index to the previous end index.
        if (i > 0 && nums[i] === nums[i-1]) {
            startIdx = endIdx;
        }
        
        // update end index, 
        // and loop between start and end indices.
        endIdx = subsets.length;        
        for (let j = startIdx; j < endIdx; j++) {
            // make copy of current subset
            const subCopy = subsets[j].slice();
            // push num to subset copy
            subCopy.push(nums[i]);
            // push subset copy to subsetes
            subsets.push(subCopy);
        }
    }
    
    return subsets;
};