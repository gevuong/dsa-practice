/*
# Problem
https://leetcode.com/problems/group-anagrams/description/

Given an array of strings strs, group the anagrams together. You can return the
answer in any order.

# Method
Counting Sort (via Array) + Hashmap

# Intuition
- For each string, create a counting sort. Join the counting sort array with a
delimiter.
- The joined counting sort with delimiter will identify if we encountered an
anagram in the hashmap or not.
- Return only the hashmap values in an array.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(n x m + n) => O(n x m).

- Space:
O(n). Worst case is every string is not an anagram, which means the hashmap
will store at most n key-value pairs.
*/

var groupAnagrams = function(strs) {
    // define anagrams hashmap
    const anagrams = {};

    // loop strings - O(n)
    for (let i = 0; i < strs.length; i++) {
        // define a counting sort array of size 26 - O(1)
        const countArr = Array(26).fill(0);

        // count chars in string - O(m)
        for (const ch of strs[i]) countArr[ch.charCodeAt(0) - 97]++;

        // join count in array with a delimiter - O(1)
        const countStr = countArr.join('#');

        // push string to hashmap based where joined string
        // is the key. 
        if (!(countStr in anagrams)) anagrams[countStr] = [];
        anagrams[countStr].push(strs[i]);
    }

    // return an array of only values in hashmap - O(n)
    return Object.values(anagrams);
};