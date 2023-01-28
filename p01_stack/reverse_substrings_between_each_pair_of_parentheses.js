/*
# Problem
https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses/description/

You are given a string s that consists of lower case English letters and brackets.
Reverse the strings in each pair of matching parentheses, starting from the innermost one.
Your result should not contain any brackets.

# Method
Stack

# Intuition
- Push elements that are not closing parentheses, ')', to stack.
- If ')' is encountered,
    - loop while stack is not empty and last char is not '('.
        - pop from stack and push popped char to a temp array.
    - Once we exit while loop, pop from stack once more to remove '('.
    - Loop temp array from left to right, and push each element back to stack.
- Return string after joining stack.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(n x k)?..
Where for k pair of parentheses, we will move maximum of (n-k) elements
for each k. So k*(n-k) => O(kn).

- Space:
O(n).
Worst case is stack stores n chars.
*/

var reverseParentheses = function(s) {
    // define stack
    const stack = [];

    // loop s
    for (let i = 0; i < s.length; i++) {
        // push chars that are not closing parentheses
        if (s[i] !== ')') stack.push(s[i]);

        // otherwise, generate reversed substring via stack popping,
        // and push reversed substring to stack
        else {
            // loop while stack length > 0,
            // and last element in stack is not an open parentheses
            const reversed = [];
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                // pop stack and push value to a temp stack,
                // which stores reversed chars.
                reversed.push(stack.pop());
            }

            // pop stack to remove open parenthesis
            stack.pop();

            // add reversed substring back to the stack.
            stack.push(...reversed);
        }
    }
    
    // return joined stack string
    return stack.join('');
};