/*
https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/description/

# Method: Sliding Window + Hashmap (Count)

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(2n) => O(n). We visit each char at most twice.

- Space complexity:
O(k). Space is used to store k distinct chars. 
Worst case is k equals string length.
*/

var lengthOfLongestSubstringKDistinct = function(s, k) {
    // handle edge case
    if (k === 0) return 0;

    // define s length, longest substring length, char count,
    // window start, distinct count
    const sLen = s.length,
        charCount = {};
    let start = 0,
        distinctCount = 0,
        maxSubLen = 0;

    // loop s
    for (let end = 0; end < sLen; end++) {
        // increment char count.
        // if char does not exist in hash, increment distinct count.
        if (!(s[end] in charCount)) {
            charCount[s[end]] = 1;
            distinctCount++;
        } else charCount[s[end]]++;

        // while distinct count > k, we need to shrink window by
        // removing chars until the distinct count = k
        while (distinctCount > k) {
            // decrement count of char at start index
            charCount[s[start]]--;
            // if char count equals 0, decrement distinct count
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