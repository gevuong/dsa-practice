/*
# Problem
https://leetcode.com/problems/subsets/description/

# Method
BFS (via Subsets)

# Intuition
For each existing subset, we add a new element to it, and add the updated
subset to the array of subsets.

# Approach
1. Start with an empty set in subsets array.
2. Loop numbers.
3. Within loop, loop up to current length of subset.
4. Within subsets loop, create a copy of each subset, push current number to
    the copied subset, and push copied subset to subsets array.
5. Return subsets.

# Complexity
- Time complexity:
O(n x 2^n). 
In each step, the number of subsets doubles as we add each element to all the
existing subsets. Therefore we have 2^n subsets, where n is the number of
elements in the input. Constructing a new subset from an existing subset takes 
O(n) time.

- Space complexity:
O(n x 2^n). There are 2^n subsets, and each subset can take up to O(n) space.
*/

var subsets = function(nums) {
    // define output with empty subset
    const subsets = [[]];
    
    // loop nums
    for (const n of nums) {
        // loop subsets length
        const subsetsLen = subsets.length;
        for (let j = 0; j < subsetsLen; j++) {
            // make copy of subset          
            const sub = subsets[j].slice();
            // push num to subset
            sub.push(n);
            // push copy to subsets
            subsets.push(sub);
        }
    }
    
    return subsets;
};