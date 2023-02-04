/*
# Problem
https://leetcode.com/problems/permutation-in-string/description/

# Method
Counting Sort + Sliding Window

# Intuition
Compare counting sort arrays only when sliding window size equals that of s1.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(l1 + l2 x (26 x (l2 - l1)))?
- Loop s1 to populate s1 counting sort array.
- Loop s2.
- Within s2 loop, the only time we iterate 26 times is when window length >= 
    s1 length, which only occurs l2 - l1 times.

- Space:
O(26 + 26) => O(1).
Space of counting sort arrays do not grow with respect to inputs.
*/

var checkInclusion = function(s1, s2) {
    // define string lengths, and handle edge case
    const s1Len = s1.length,
        s2Len = s2.length;
    if (s2Len < s1Len) return false;

    // define s1 counting sort array
    let s1CharCount = Array(26).fill(0);

    // populate s1 counting sort array
    for (const ch of s1) s1CharCount[ch.charCodeAt(0) - 97]++;

    // define start window pointer, s2 counting sort array
    let start = 0;
    s2CharCount = Array(26).fill(0);

    // loop length of s2
    for (let end = 0; end < s2Len; end++) {
        // increment s2 char count
        s2CharCount[s2[end].charCodeAt(0) - 97]++

        // if window end pointer reaches length of s1,
        // then compare s1 and s2 char count.
        if (end >= s1Len - 1) {
            if (isPerm(s1CharCount, s2CharCount)) return true;

            // decrement char count at start window pointer
            // to shift left side of window, to right.
            s2CharCount[s2[start].charCodeAt(0) - 97]--;
            start++;
        }
    }

    return false;
};

const isPerm = (s1CharCount, s2CharCount) => {
    for (let i = 0; i < 26; i++) {
        if (s1CharCount[i] !== s2CharCount[i]) return false;
    }
    return true;
}