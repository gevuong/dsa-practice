/*
# Problem
https://leetcode.com/problems/missing-ranges/description/

# Method
Two Pointers (Same Direction) + Math (Very Little)

# Intuition
- Create two pointers, have one pointer track the previous lower value, and 
    another as the current value to compare with.
- If difference between current value and previous lower value is greater than
    1, then we have a missing range.
- Before comparing current value with the lower and upper inputs,
    add 1 to upper, and subtract 1 from lower inputs. This is because the lower
    and upper inputs are inclusive, meaning they can be part of missing ranges.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(n + 1) => O(n).

- Space:
O(1).
*/


var findMissingRanges = function(nums, lower, upper) {
    // define current lower, output array
    let prev = lower - 1,
        missingRanges = [];
    
    // loop nums
    nums.push(upper + 1);
    for (const curr of nums) {
        // subtract current lower from current num
        const diff = curr - prev;

        // if difference is greater than 1, then there is a missing range.
        if (diff > 1) {
            // calc lowerRange and upperRange via current lower and num.
            const [lowRange, highRange] = [prev + 1, curr - 1];

            // if lowerRange equals upperRange, then push stringified
            // num to output
            if (lowRange === highRange) missingRanges.push(lowRange.toString());
            // else store lower and upper range in array and join with '->
            else missingRanges.push([lowRange, highRange].join('->'));
        }
        
        // reassign previous to current
        prev = curr;
    }
    
    return missingRanges;
};