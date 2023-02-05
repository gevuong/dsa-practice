/*
# Problem
https://leetcode.com/problems/find-all-anagrams-in-a-string/description/

Given two strings s and p, return an array of all the start indices of p's 
anagrams in s. You may return the answer in any order.

# Method
Sliding Window + Count (via Hashmap)

# Intuition
- Only increment and decrement characters that exist in the p string.
- Keep a unique char count or number of matches to find if a substring is an
    anagram.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(p + s), where p and s are lengths of p and s strings, respectively.

- Space:
O(p).
Worst case is char count hashmap stores up to p key-value pairs, where p is 
length of p string.
*/

var findAnagrams = function(s, p) {
    // define input lengths, handle edge case
    const sLen = s.length,
        pLen = p.length;
    if (pLen > sLen) return [];

    // define and populate char count, and
    // count number of unique chars in p string.
    let uniqCount = 0;
    const pCharCount = {};
    for (const ch of p) {
        if (ch in pCharCount) pCharCount[ch]++;
        else {
            uniqCount++;
            pCharCount[ch] = 1;
        }
    }
    
    // define output array and start window pointer
    const startIndices = [];
    let start = 0;

    // visit every char in s string
    for (let end = 0; end < sLen; end++) {
        // we only consider chars that exist in p string,
        // and decrement count we encounter them, and if
        // decrementing results in a count of 0, that means
        // we have satisfied the number of chars needed to match
        // the char count in p string.
        if (s[end] in pCharCount) {
            pCharCount[s[end]]--;
            if (pCharCount[s[end]] === 0) uniqCount--;
        }

        // if all char counts match, we have found an anagram of p string.
        if (uniqCount === 0) startIndices.push(start);

        // when window size equals length of p string,
        // we have to begin shrinking window by shifting left window pointer
        // to the right.
        if (end >= pLen - 1) {
            // again, we only consider chars that exist in p string.
            // Increment count since we are no longer including char
            // in window.
            if (s[start] in pCharCount) {
                pCharCount[s[start]]++;

                // If count results to 1, that means we no longer
                // have a matching char count to the char count in p string.
                if (pCharCount[s[start]] === 1) uniqCount++;
            }

            start++;
        }
    }

    return startIndices;
};