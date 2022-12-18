/*
# Problem
https://leetcode.com/problems/evaluate-reverse-polish-notation/description/

# Method
Stack

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
1. Push non-operators (ie. numbers) to stack.
2. If token is an operator, pop twice from stack, and perform operation.
3. After performing operation on both popped values, push result to stack.

# Complexity
- Time complexity:
O(n). Every element is visited once.

- Space complexity:
O(n/2) => O(n). Worst case is half the tokens are numbers, which are stored in stack.
*/

var evalRPN = function(tokens) {
    // define stack, tokens length, and set with 4 valid operators
    const tokensLen = tokens.length,
        stack = [],
        operatorSet = new Set(['+','-','*','/']);

    // loops tokens
    for (let i = 0; i < tokensLen; i++) {
        // if token is not in set, then it is a digit,
        // so push to stack
        if (!operatorSet.has(tokens[i])) stack.push(Number(tokens[i]));

        // else pop twice from stack, and perform operation.
        // Note: round towards 0 if operator is '/'.
        else {
            const [popOne, popTwo] = [stack.pop(), stack.pop()];
            const result = performOperation(popTwo, popOne, tokens[i]);
            
            // push result to stack
            stack.push(result);
        }
    }

    // return remaining value in stack
    return stack[0];
};

function performOperation(numOne, numTwo, operator) {
    if (operator === '+') return numOne + numTwo;
    if (operator === '-') return numOne - numTwo;
    if (operator === '*') return numOne * numTwo;
    if (operator === '/') return Math.trunc(numOne / numTwo);
}