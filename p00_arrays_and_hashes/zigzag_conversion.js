/*
# Problem
https://leetcode.com/problems/zigzag-conversion/description/

The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of
rows like this:

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number
of rows.

# Method
2D Array + While Loops + Two Pointers

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(m + n + n) => O(n).
- Initializing zigzag array takes O(m) time, where m is number of rows.
- While loop takes O(n) time, where n is length of string.
- Lastly, we loop every num row subarray, and push its elements to an output
    array. Since we are pushing at most n elements, this takes O(n) time.

- Space:
O(n).
Although we have a 2D array, the most elements we are storing in the entire
2d array is the length of input string.
*/

var convert = function(s, numRows) {
    // if num rows equal 1, then just return string as is.
    if (numRows === 1) return s;

    // define zigzag array with num row subarrays, and s length
    const zigZagArr = Array(numRows).fill(0).map(() => Array()),
        sLen = s.length;

    // define s index, subarray index
    let [sIdx, subArrIdx] = [0, 0];

    // loop until we visit all characters in string
    while (sIdx < sLen) {
        // loop subarray in ascending order
        while (sIdx < sLen && subArrIdx < numRows) {
            // push char to subarray
            zigZagArr[subArrIdx].push(s[sIdx]);
            // increment string and subarray indices
            sIdx++;
            subArrIdx++;
        }

        // decrement subarray index by 2 because:
        // 1. we are out of bounds since exiting while loop.
        // 2. we do not want to visit same subarray we last visited.
        subArrIdx -= 2;

        // loop subarray in descending order
        while (sIdx < sLen && subArrIdx > 0) {
            // push char to subarray
            zigZagArr[subArrIdx].push(s[sIdx]);
            // increment string index, decrement subarray index
            sIdx++;
            subArrIdx--;
        }
    }

    // push all elements in each subarray to output
    const res = [];
    zigZagArr.forEach((sub) => res.push(...sub));

    // return joined output array
    return res.join('');
};
