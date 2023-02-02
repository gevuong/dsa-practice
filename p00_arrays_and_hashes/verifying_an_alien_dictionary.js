/*
# Problem
https://leetcode.com/problems/verifying-an-alien-dictionary/description/

# Method
Hashmap (Map Char to Rank) + Nested For Loop

# Intuition
- Define a hashmap to store mapping of each character to its order number.
- Compare the character of each word to its subsequent word, and compare the
    rank between both characters.

# Approach
1. Map character to its order (or rank) number.
2. Loop words up to words length - 1.
    a. Define word at current index and word at the next index.
    b. Loop each char in word at current index.
    c. If the char index of current word ever exceeds length of the next word,
        then we know current word length > adjacent word length.
        Therefore, words are not in lexical order.
    d. If rank of char in current word < rank of char in adjacent word, then
        we know words are in lexical order. Therefore, we can break from nested
        loop.
3. If we compared all pairs of adjacent words and they are in lexical order,
    return true.

# Complexity
- Time:
O(26 + m) => O(m), where m is total number of characters in words array.
Creating the hashmap will always take O(26) time regardless of the size of the
words array.
However, for each word in words array, we have to iterate every character to
find out its rank and compare it with the rank of its adjacent words character.

- Space:
O(26) => O(1).
The hashmap does not increase with respect to n.
*/

var isAlienSorted = function(words, order) {
    // define hashmap to map char to rank
    const letterRank = {};
    for (let i = 0; i < order.length; i++) {
        letterRank[order[i]] = i;
    }

    // loop up to words length - 1
    for (let i = 0; i < words.length - 1; i++) {
        // define words one and two, and word two length
        const wordOne = words[i],
            wordTwo = words[i+1],
            wordTwoLen = wordTwo.length;

        // loop char of word one
        for (let j = 0; j < wordOne.length; j++) {
            // if j exceeds the length of word two,
            // then words are not in lexical order.
            if (j > wordTwoLen - 1) return false;

            // define rank of char in words one and two
            const rankOne = letterRank[wordOne[j]],
                rankTwo = letterRank[wordTwo[j]];

            // if character of word one has a smaller rank,
            // then we know words one and two are in lexical order.
            if (rankOne < rankTwo) break;

            // if character of word one has a greater rank,
            // then words are not in lexical order.   
            if (rankOne > rankTwo) return false;
        }
    }

    return true;
};