/*
# Problem
https://leetcode.com/problems/repeated-dna-sequences/description/

Given a string s that represents a DNA sequence, return all the 10-letter-long
sequences (substrings) that occur more than once in a DNA molecule. You may
return the answer in any order.

# Method
Sliding Window + Visited/Seen (via Hashset)

# Intuition
Slice string (n - 10) times, and check if substring was seen before, if so,
push substring to output hashset. If not, add substring to seen hashset.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O((n - 10) x 10) => O(n), where n is length of input string.
- We have to create a new substring of length 10, (n-10) times.
- Accessing and adding sequences to a hashset takes O(1) time.
- Converting output hashset to an array can take up to (n-10) time?

- Space:
O((n - 10) x 10) => O(n).
We have to create a new substring of length 10, for (n-10) times.
- The seen hashset can store up to n - 10 unique sequences.
- If out of n - 10 sequences, they each had a matching pair, then the output
    hashset would have at most (n - 10) / 2 duplicated sequences.
- That means the output array can have at most (n - 10) / 2 => O(n) 
    repeated sequences.
*/

var findRepeatedDnaSequences = function(s) {
    // define s length, and handle edge case.
    const sLen = s.length;
    if (sLen < 10) return [];

    // define seen and output hash sets, and start window.
    const seen = new Set(),
        res = new Set();
    let start = 0;

    // slice string of length 10
    for (let end = 9; end < sLen; end++) {
        // slice string of length 10
        const seqStr = s.slice(start, end + 1);
        // if sequence has been seen, add sequence to result hashset
        if (seen.has(seqStr)) res.add(seqStr);
        // otherwise, add sequence to seen hashset
        else seen.add(seqStr);
        // shrink window
        start++;
    }

    // convert hashset to array
    return Array.from(res);
};