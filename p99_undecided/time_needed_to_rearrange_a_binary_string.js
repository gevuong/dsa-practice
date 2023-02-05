/*
# Problem
https://leetcode.com/problems/time-needed-to-rearrange-a-binary-string/description/

You are given a binary string s. In one second, all occurrences of "01" are
simultaneously replaced with "10". This process repeats until no occurrences
of "01" exist.

Return the number of seconds needed to complete this process.

# Method
Brute Force (via Double While Loop)

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(n^2). We process n characters in the string, up to n times in the worst case
(ie. "0111111..")

- Space:
O(n).
Create a string array for ease in swapping values since strings are immutable in JS.
*/

var secondsToRemoveOccurrences = function(s) {
    // define num seconds, isRearranged boolean,
    // string array
    const sArr = s.split(''),
        sLen = s.length;
    let numSeconds = 0,
        isRearranged = true;

    // loop while string has rearranged
    while (isRearranged) {
        // set is rearranged to false, and reset index
        isRearranged = false;
        let i = 1;

        // loop s, start at 1
        while (i < sLen) {    
            // if prev and curr vals equal '0' and '1' respectively,
            // swap values
            if (sArr[i] === '1' && sArr[i-1] === '0') {
                // swap values
                [sArr[i], sArr[i-1]] = [sArr[i-1], sArr[i]];

                // increment index by 2 to skip rearranged values.
                i += 2;

                // set is rearranged to true to continue rearranging
                // in next iteration.
                isRearranged = true;
            
            // otherwise, move to next index.
            } else i++;
        }

        // increment num seconds
        numSeconds++;
    }

    // subtract 1 to exclude last rearrangement.
    // If input is already arranged, we still enter while loop, and
    // num seconds will be incremented.
    return numSeconds - 1;
};