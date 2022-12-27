/*
# Problem
https://leetcode.com/problems/valid-parentheses/description/

# Method
Stack + Hashmap

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
1. Initialize a hashmap to store valid open/close parentheses.
2. Push open parentheses to stack.
3. If char is a closed parenthesis, pop top element from stack (which should be
    an open parenthesis), and compare its corresponding closed parenthesis with
    the current char. If they're not equal return false.
4. After iterating string, if stack length equals 0, then we have valid parentheses.

# Complexity
- Time complexity:
O(n)

- Space complexity:
O(n). Worst case is if input string equals '(((('. That means stack will be of
length n.
*/

var isValid = function(s) {
    // define object to store valid parentheses,
    // and stack to store open parentheses.
    const stack = [],
        parentheses = {
            '(': ')',
            '{': '}',
            '[': ']',
        };

    // loop string
    for (const ch of s) {
        // if char is an open parenthesis, push to stack
        if (ch in parentheses) stack.push(ch);

        // else pop open parenthesis from stack, and see if
        // current char matches corresponding popped open parentheses
        // if not, return false
        else {
            if (stack.length === 0) return false;
            open = stack.pop();
            if (parentheses[open] !== ch) return false;
        }
    }

    return stack.length === 0;
};