/*
# Problem
https://leetcode.com/problems/isomorphic-strings/description/

# Method
Hashmap + Hashset (to compare set sizes between both strings)

# Intuition


# Approach
- Check if length of both strings are equal, and if the number of unique chars
    in both strings are equal. If not, return false.
- If so, loop both strings in parallel, and map current char in s to current char
    in t.
- If current char in s exists in map, check if the char the current char in s
    maps to equals the current char in t.

# Complexity
- Time complexity:
O(n).

- Space complexity:
O(n). Worst case is the hashmap contains n unique chars.
*/

var isIsomorphic = function(s, t) {
    // define s and t lengths
    const sLen = s.length,
        tLen = t.length;

    // handle edge cases.
    // s and t lengths must be equal, 
    // and number of unique chars must be equal.
    if (sLen !== tLen) return false;
    if (new Set(s).size !== new Set(t).size) return false;

    const mapChars = {};
    for (let i = 0; i < tLen; i++) {
        const [sChar, tChar] = [s[i], t[i]];

        // if char in s is not in map,
        // map char in s, to char in t.
        if (!(sChar in mapChars)) mapChars[sChar] = tChar;

        // when same char in s is encountered in subsequent iteration,
        // make sure the char that s already maps to,
        // equals the current char in t.
        if (mapChars[sChar] !== tChar) return false;
    }

    return true;
};