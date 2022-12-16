/*
https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/description/

# Method: Sliding Window + Hashmap

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(2n) => O(n). Each element will be visited at most twice. If last two elements
are the longest substring, then both the start and end indices will visit all
elements (except the last 2) twice.

- Space complexity:
O(2) => O(1). Hashmap will store at most 2 distinct chars.
*/

var lengthOfLongestSubstringTwoDistinct = function(s) {
    // define distinct char count, string length, window start,
    //  max substring length, obj mapping char to idx
    const sLen = s.length,
        charCount = {};
    let distinctCount = 0,
        start = 0,
        maxSubLen = 0;
    
    // loop nums
    for (let end = 0; end < sLen; end++) {
        // increment distinct count if char does not exist in map
        if (!charCount.hasOwnProperty(s[end])) {
            charCount[s[end]] = 1;
            distinctCount++;
        } else charCount[s[end]]++; 

        // we have to bring distinct count down to at most 2
        while (distinctCount > 2) {
            // decrement charCount of value at start index
            charCount[s[start]]--;
            // if charCount equals 0,
            // delete key value from charCount and decrement distinct count
            if (charCount[s[start]] === 0) {
                delete charCount[s[start]];
                distinctCount--;
            }
            // increment start index
            start++;
        }
        // calc max substring length
        maxSubLen = Math.max(maxSubLen, end - start + 1);
    }

    return maxSubLen;
};
