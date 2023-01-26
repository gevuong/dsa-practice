/*
# Problem
https://leetcode.com/problems/break-a-palindrome/description/

Return the resulting string. If there is no way to replace a character to make
it not a palindrome, return an empty string.

# Method
Greedy + Array + One Pass

# Intuition
1. If palindrome length equals 1, return empty string.
2. We only need to traverse half of the palindrome because the second half will
    be the same.
3. The first non-'a' character we encounter, swap the character with 'a',
    and return the string.
4. If after traversing first half of palindrome, and they're all 'a's, the
    next lexicographically smallest string is swapping the last character
    to 'b' and returning the string.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(n + n/2 + n) => O(n).
It takes linear time to split palindrome to an string array.
We are traversing only half of the palindrome.
Joining string array to a string takes linear time (I think).

- Space:
O(n).
String array stores n characters.
*/

var breakPalindrome = function(palindrome) {
    // define palindrome length, palindrome array
    const paliLen = palindrome.length;
    
    // handle edge case. There is no way to replace a single
    // char to make string not a palindrome, so return empty
    // string.
    if (paliLen === 1) return '';

    // loop palindrome.
    // Only first half of palindroem length needs to be traversed
    // because the second half is basically the same.
    const paliArr = palindrome.split('');
    for (let i = 0; i < Math.floor(paliLen / 2); i++) {
        // if char does not equal a, swap char with the lexicographically
        // smallest value, which is 'a', and return updated string.
        //
        // Doing this will break a palindrome.
        if (paliArr[i] !== 'a') {
            paliArr[i] = 'a';
            return paliArr.join('');
        }
    }
    
    // If we traversed first half of palindrome, and they're all
    // 'a's, we simply replace the last char with 'b', and return
    // value.
    // According to these testcases,
    // 'aaa' => 'aab' is the lexicographically smallest that would
    // break the palindrome, and 'aazaa' => 'aazab'.
    paliArr[paliLen - 1] = 'b';
    return paliArr.join('');
};