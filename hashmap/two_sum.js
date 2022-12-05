/*
https://leetcode.com/problems/two-sum/

Runtime: 70 ms, faster than 95.99% of JavaScript online submissions for Two Sum.
Memory Usage: 42.7 MB, less than 49.12% of JavaScript online submissions for Two Sum.

Method: One-pass Hash Table
TC O(n) | SC O(n)
*/

var twoSum = function(nums, target) {
    // create hash, mapping value to its index
    const numsLen = nums.length,
          numIdxObj = {};
    
    // loop nums
    for (let i = 0; i < numsLen; i++) {
        // calc difference between target and el
        const diff = target - nums[i];
        
        // if difference exists in map, return indices
        if (numIdxObj.hasOwnProperty(diff)) return [i, numIdxObj[diff]];
    
        // add el and index to map
        numIdxObj[nums[i]] = i;
    }
};
