/*
# Problem
https://leetcode.com/problems/greatest-common-divisor-of-strings/description/

# Method
Math + Prefix of String (Brute Force)

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
1. Determine which string is shorter and longer.
2. From that, loop the length of shorter string, but in reverse order.
    a. With each iteration, create a copy of the shorter string but with one
    less character. This will be the prefix substring of the shorter string.
    b. Calculate the number of times the prefix substring needs to be pushed
    to a temp array to have the same length as the short and long input arrays.
    c. Join both short and long temp arrays, and if both equal the short and
    long input strings, then we have found the gcd.

# Complexity
- Time:
O(min(n, m) x (m + n)).
We loop the length of the shorter string.
Within the loop, we are looping at worst case, the length of the short and long
strings.

- Space:
O(m + n + min(m, n)).
Worst case is we slice and store entire length of short string.
We also have two subarrays, where each can store at most the length of the
short and long input strings.
*/

var gcdOfStrings = function(str1, str2) {
    // determine which string is shorter and longer.
    let [short, long] = [str1, str2];
    if (str2.length < str1.length) {
        [long, short] = [str1, str2];
    }

    // define short and long lengths
    const shortLen = short.length,
        longLen = long.length;

    // loop length of shorter string, in reverse order.
    // We are starting with the entire string as the gcd,
    // and working our way down to fewer characters.
    for (let i = shortLen; i > 0; i--) {
        // slice a prefix of short string
        const prefixShort = short.slice(0, i),
            prefixLen = prefixShort.length;

        // if both input strings are divisible by prefix length,
        // then create copies of the prefix short string until the
        // length matches the length of the short and long string.
        if (shortLen % prefixLen === 0 && longLen % prefixLen === 0) {
            const shortSub = [],
                longSub = [],
                repeatShort = shortLen / prefixLen,
                repeatLong = longLen / prefixLen;

            for (let j = 0; j < repeatShort; j++) {
                shortSub.push(prefixShort);
            }

            for (let j = 0; j < repeatLong; j++) {
                longSub.push(prefixShort);
            }

            // join short and long arrays to form substrings, and
            // if the substrings equal the input strings, then
            // we have the gcd.
            if (shortSub.join('') === short && longSub.join('') === long) {
                return prefixShort;
            }
        }
    }

    return '';
};