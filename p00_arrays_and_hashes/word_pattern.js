/*
# Problem
https://leetcode.com/problems/word-pattern/description/

# Method
HashMap + HashSet (to track visited/seen) - My Initial Solution

# Intuition
Map each character in pattern to a word (or string) in s.
For situations like pattern = 'abba', s = 'dog dog dog dog', we have to keep
track of each character in pattern, but also what words have been seen in s.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(n + n) => O(n), where n is the number of words in s.
And assuming pattern length and splitted string lengths are equal, then time
would be O(2n) => O(n).

- Space complexity:
O(n + n + n) => O(n). 
Worst case is every word in splitted string is unique. That means
the seen set will contain up to n elements. The splitted string will also contain
up to n elements. If all characters in pattern are unique, then the
matches object will contain up to n characters.
*/

var wordPattern = function(pattern, s) {
    // define splitted s, pattern length, hashmap
    const splitted = s.split(' '),
        patternLen = pattern.length,
        matches = {};
        seen = new Set();

    // handle edge case
    // if splitted s and pattern length are not equal,
    // return false
    if (splitted.length !== patternLen) return false;

    // loop pattern and splitted array in parallel
    for (let i = 0; i < patternLen; i++) {
        const ch = pattern[i],
            word = splitted[i];
        
        // if char is not in map, add char and word in splitted s
        // as key value pairs
        if (!(ch in matches) && !seen.has(word)) {
            matches[ch] = word;
            seen.add(word);
        }
        // otherwise, if value in map does not equal word in splitted s,
        // return false
        else if (matches[ch] !== word) return false;
    }

    return true;
};

/*
Method 2
Hashmap + HashSet (to compare set sizes)
*/

var wordPattern = function(pattern, s) {
    // define splitted s, pattern length, hashmap
    const splitted = s.split(' '),
        patternLen = pattern.length,
        matches = {};

    // handle edge cases.
    // if splitted s and pattern length are not equal, OR
    // if hashset size of pattern does not equal hashset size of splitted string,
    // return false.
    if (splitted.length !== patternLen) return false;
    if (new Set(pattern).size !== new Set(splitted).size) return false;

    // loop pattern and splitted array in parallel
    for (let i = 0; i < patternLen; i++) {
        const [ch, word] = [pattern[i], splitted[i]];
        
        // if char is not in map, add char and word in splitted s
        // as key value pairs
        if (!(ch in matches)) matches[ch] = word;
        
        // otherwise, if value in map does not equal word in splitted s,
        // return false
        else if (matches[ch] !== word) return false;
    }

    return true;
};

/*
Method 3
HashMap (to track indices of every char in pattern in word splitted array)
*/
var wordPattern = function(pattern, s) {
    // define splitted s, pattern length, hashmap
    const splitted = s.split(' '),
        patternLen = pattern.length,
        matches = {};

    // handle edge cases.
    // if splitted s and pattern length are not equal, return false.
    if (splitted.length !== patternLen) return false;

    // loop pattern and splitted array in parallel
    for (let i = 0; i < patternLen; i++) {
        // distinguish if char is from pattern or input string
        // by prefixing char with a 'p_' or 's_'.
        // This solves issue if the same char exists in pattern and
        // input string, like p = 'abc', s = 'b c a'.
        const [ch, word] = [`p_${pattern[i]}`, `s_${splitted[i]}`];

        // if ch or word is not in matches, add them as key and
        // current index as value.
        if (!(ch in matches)) matches[ch] = i;
        if (!(word in matches)) matches[word] = i; 

        // lets say if ch and word were not in matches, 
        // then ch and word indices should be equal.
        // 
        // Now, if ch and/or word were in matches before, 
        // and the ch and/or word reappeared in a subsequent iteration,
        // the indices of ch and word must match.
        //
        // Example: p = 'ab' s = 'd d'.
        // m = { p_a: 0, s_d: 0, p_b: 1 } m[b] !== m[d].
        if (matches[ch] !== matches[word]) return false;
    }

    return true;
};
