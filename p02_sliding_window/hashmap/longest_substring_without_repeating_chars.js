/*
# Problem
https://leetcode.com/problems/longest-substring-without-repeating-characters/description/

# Method
Sliding Window + Hashmap (Char to Index)

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
    When we update the start index, we want to choose the max between the current
    start index, and when the current char was last seen + 1.
    For example:
        (ie. s = 'abba'). When we reach second 'a', the start index would have
        moved to 2 because we encountered a second 'b'.
        Now, when we reach second 'a', we want to set the start index to either
        when 'a' was last seen (ie. 0th index), or the current start index,
        whichever is more recent.
        We don't want the start index to move back to 'a' at 0th index.

# Complexity
- Time complexity:
O(2n) => O(n)

- Space complexity:
O(n). Worst case is all chars in string are unique. So length of hashmap is equal
to n.
*/

var lengthOfLongestSubstring = function(s) {
    // define last seen map, s length, 
    // max substring length, start window
    const sLen = s.length,
        lastSeen = {};
    let maxSubLen = 0,
        start = 0;

    // loop s
    for (let end = 0; end < sLen; end++) {
        // add/update index of when char was last seen.
        // if char exists in map, update start index to when it was last seen + 1,
        // or the current start index, whichever is more recent.
        if (s[end] in lastSeen) start = Math.max(start, lastSeen[s[end]] + 1);
        lastSeen[s[end]] = end;
        
        // calc max length
        maxSubLen = Math.max(maxSubLen, end - start + 1);
    }

    return maxSubLen;
};