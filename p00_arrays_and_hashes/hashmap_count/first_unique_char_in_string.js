/*
# Problem
https://leetcode.com/problems/first-unique-character-in-a-string/description/

Given a string s, find the first non-repeating character in it and return its
index. If it does not exist, return -1.

# Method
Count (via Hashmap) + Two Pass

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(2n) => O(n).

- Space:
O(26) => O(1).
*/

var firstUniqChar = function(s) {
    // define char count
    const chCount = {};

    // fill char count
    for (const ch of s) {
        if (ch in chCount) chCount[ch]++;
        else chCount[ch] = 1;
    }

    // loop s, and key each char in char count,
    // if count equals 1, then return current index
    for (let i = 0; i < s.length; i++) {
        if (chCount[s[i]] === 1) return i;
    }

    return -1;
};
