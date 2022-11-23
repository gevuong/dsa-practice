/*
https://leetcode.com/problems/subsets-ii/

Runtime: 107 ms, faster than 66.82% of JavaScript online submissions for Subsets II.
Memory Usage: 44.3 MB, less than 79.56% of JavaScript online submissions for Subsets II.

TC O(nlogn + n x 2^n) -> O(n x (logn + 2^n)) -> O(n x 2^n)
SC O(logn + n) to O(n + n) -> O(n) worst case.
Depending on language used to sort, space ranges from O(logn) to O(n).
We are not considering space required to store output, if so it would be we are making a copy of a subset of max length n.

To prevent duplicates, we only want to add a duplicate number to ONLY the previously added subsets.
For example:
nums = [1,2,2,2]

Step 1:
add 1 to subsets: 
[[], [1]]

Step 2:
add first 2 to subsets:
[[], [1], [2], [1,2]]

Step 3:
add second 2 to subsets regardless of duplicates:
[[], [1], [2], [1,2], [2], [1,2], [2,2], [1,2,2]]

There are duplicates in this subset.
Therefore, we only add second 2 to previously added subset of [2] and [1,2].
[[], [1], [2], [1,2], [2,2], [1,2,2]]

Step 4:
Add third 2 to previously added subset of [2,2] and [1,2,2].
[[], [1], [2], [1,2], [2,2], [1,2,2], [2,2,2], [1,2,2,2]]
*/
var subsetsWithDup = function(nums) {
    // sort nums in ascending order.
    nums.sort((a, b) => a - b);
    
    // define subsets array, start and end indices to insert 
    const numsLen = nums.length,
          subsets = [[]];
    let start = 0,
        end = 0;
    
    // loop nums
    for (let i = 0; i < numsLen; i++) {
        // reset start index
        start = 0;
        
        // for each num, check if prev and current nums are equal.
        // if so, update start index to when the end index last ended.
        // This is because we want to add current num ONLY to the prev set of subsets.
        // This will prevent duplicates.
        if (i > 0 && nums[i-1] === nums[i]) start = end;
        
        // update end index to length of subsets,
        // because we want to loop every subset.
        end = subsets.length;
    
        // loop each subset from start to end indices.
        for (let j = start; j < end; j++) {
            // make copy of subset, push num to copy,
            // push copy to subsets.
            const copy = subsets[j].slice();
            copy.push(nums[i]);
            subsets.push(copy);
        }
    }
    return subsets;
};