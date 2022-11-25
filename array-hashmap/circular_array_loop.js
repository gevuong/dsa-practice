/*
https://leetcode.com/problems/circular-array-loop/

Runtime: 62 ms, faster than 99.20% of JavaScript online submissions for Circular Array Loop.
Memory Usage: 42.2 MB, less than 39.20% of JavaScript online submissions for Circular Array Loop.

TC O(n), we only evaluate for a cycle once for each number.
TC O(n), the visited array is of size n.

Hints:
1. We want to check (or evaluate) each index in nums to see if it produces a cycle.
    This means that for each index, we follow its movement forward or backward
    to detect if a cycle exists.

2. If we discover that the direction of movement is inconsistent 
    (ie. not all numbers are positive or negative), we know immediately
    that the index we started our cycle check, AND the indices traversed, does not produce a cycle.
    
3. Also, if we calc the next index, and it's equal to the current index, then
    we know the index we started our cycle check does not produce a cycle.
    This is because the sequence is of length 1.

4. Kicker: As we evaluate a particular index and traverse its movement
    across the array, we can actually mark those indices as visited.
    This is because once we revisit those indices to evaluate a cycle, the same
    result will be produced.
    By doing this, we only evaluate for cycles once for each number!
*/

var circularArrayLoop = function(nums) {
    // cannot be a cycle if there are less than 2 elements
    const numsLen = nums.length;
    if (numsLen < 2) return false;

    // init visited array
    const visited = Array(numsLen).fill(false);

    // check each index to see if a cycle can be produced
    for (let i = 0; i < numsLen; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        // determine initial direction
        const isPositive = nums[i] > 0;
        
        // reset which indices were visited after each iteration
        const visitedPerIdx = Array(numsLen).fill(false);
        
        // reset cycle length and current index after each iteration
        let cycleLen = 0,
            currIdx = i;
        
        // loop while cycle is valid
        while (true) {
            // break if current index moves cycle in opposite direction
            if (isPositive !== nums[currIdx] > 0) break;
			
            // calc next valid index
            let nextIdx = (currIdx + nums[currIdx]) % numsLen;
            // map negative index to a positive index
            if (nextIdx < 0) nextIdx += numsLen; 
          
            // break if cycle points to same index
            if (currIdx === nextIdx) break;
            
            cycleLen++; 
			// a cycle is found when the index has already been visited in the current outer iteration, 
            // and the cycle length is greater than 1.
            if (visitedPerIdx[nextIdx] && cycleLen > 1) return true;
			
            visitedPerIdx[nextIdx] = true;
            visited[nextIdx] = true;
            // set curr index to new index
            currIdx = nextIdx;
        }
    }

    return false;
};