/*
https://leetcode.com/problems/circular-array-loop/

Runtime: 139 ms, faster than 51.38% of JavaScript online submissions for Circular Array Loop.
Memory Usage: 48 MB, less than 15.60% of JavaScript online submissions for Circular Array Loop.

TC O(n^2), for each element, we are visiting it at least twice.
TC O(n), to store visited indices.
*/

var circularArrayLoop = function(nums) {
    // define two pointers, visited bool array,
    // is positive boolean, cycle length,
    const numsLen = nums.length;
    // handle edge case
    if (numsLen < 2) return false;
    
    // loop nums
    for (let i = 0; i < numsLen; i++) {
        // define whether value is positive or negative.
        let isPositive = nums[i] > 0,
            cycleLen = 0,
            currIdx = i,
            isCycle = true;
        
        // reset visited and cycle length
        const visited = Array(numsLen).fill(false);
        
        // loop while visited index is false
        while (!visited[currIdx]) {
            // if value is not > 0 and orig value was < 0,
            // then break from while loop since current value does not create a cycle.
            if (isPositive !== nums[currIdx] > 0) {
                isCycle = false;
                break;
            }
            
            // calc next index.
            // if index < 0, add nums length to index.
            let nextIdx = (currIdx + nums[currIdx]) % numsLen;
            if (nextIdx < 0) nextIdx += numsLen;
            if (currIdx === nextIdx) {
                isCycle = false;
                break;
            }
            
            // set visited index to true, increment cycle length.
            visited[currIdx] = true;
            cycleLen++;    
            currIdx = nextIdx;
        }
        // cycle length > 1
        if (isCycle && cycleLen > 1) return true;
    }
     
    return false;
};