/*
https://leetcode.com/problems/third-maximum-number/description/

# Intuition
1. The algorithm is similar to how we update linked list pointers. If a number is
    larger than the current max, we move the current max down to the second max,
    and the second max to the third max number.
2. Since we only want distinct max numbers, when we encounter a value that's 
    equal to the first, second, or third maximum, we can skip it.
3. It's important to compare the current el to either the first max, 
    second max, or third max. For example, if the current el is less than 
    first max, we want to compare it to the second max. If the current el is 
    less than second max, compare it to third max.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
<!-- Add your time complexity here, e.g. $$O(n)$$ -->

- Space complexity:
<!-- Add your space complexity here, e.g. $$O(n)$$ -->
*/

var thirdMax = function(nums) {
    // define three variables
    let first, second, third;
    first = second = third = -Infinity;

    // loops nums
    for (const el of nums) {
        // if el is greater than first, 
        // move current max down to 2nd max, 2nd max to 3rd max,
        // and new max to first max.
        if (el !== first && el > first) {
            third = second;
            second = first;
            first = el;
        } else if (el < first && el > second) {
            // if el is less than first max and greater than current
            // second max, move second max to third max.
            third = second;
            second = el;
        } else if (el < second && el > third) third = el;
        // and if el is less than second max and greater than third
        // max, update third max.
    }
    
    // if third max doesn't exist, return the max number,
    // otherwise, return third.
    return third === -Infinity ? first : third;
};


