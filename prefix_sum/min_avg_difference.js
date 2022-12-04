/*
https://leetcode.com/problems/minimum-average-difference/

Runtime: 110 ms, faster than 89.66% of JavaScript online submissions for Minimum Average Difference.
Memory Usage: 54.7 MB, less than 65.52% of JavaScript online submissions for Minimum Average Difference.

TC O(n) | SC O(1)

Method: Prefix Sum
*/

var minimumAverageDifference = function(nums) {
    // define min avg difference, nums length, and index to return
    const numsLen = nums.length;
    let minAvgDiff = Infinity, // set to max value
        minIdx = numsLen - 1; // set to max index
    
    // calc sum of input array
    let totalSum = 0;
    for (const n of nums) totalSum += n;
    
    // define left sum, left and right avgs.
    let leftSum = 0,
        leftAvg, rightAvg;
    
    // loop nums
    for (let i = 0; i < numsLen; i++) {
        // for each element, we add to left sum and subtract from total sum.
        leftSum += nums[i];
        totalSum -= nums[i];
        
        // calc avg of first i + 1 elements, rounded down.        
        leftAvg = Math.floor(leftSum / (i+1));
        
        // calc avg of last n - i - 1 elements, rounded down.
        // when we get to last index, the total sum will equal 0, 
        // so the right average is 0. We cannot divide by 0. 
        rightAvg = 0;
        if (i < numsLen - 1) rightAvg = Math.floor(totalSum / (numsLen - i - 1));
    
        // calc abs diff between both avgs
        const absDiff = Math.abs(leftAvg - rightAvg);
        
        // update min index and min avg diff.
        if (absDiff < minAvgDiff) {
            minIdx = i;
            minAvgDiff = absDiff;
        }
    }
    
    return minIdx;
};