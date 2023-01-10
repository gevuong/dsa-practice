/*
# Problem
https://leetcode.com/problems/same-tree/description/

# Method
Iterative DFS (via Stack)

# Intuition
Perform iterative DFS by pushing both root nodes to stack,
and
1. check if they're both null, if so, skip and stop traversing
with current nodes.
2. check if either are null, if so, return false.
3. check if both node values are equal, if not return false.
4. Otherwise, push both right children, then both left children to stack.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(n + n) => O(n). Each node is visited once.

- Space complexity:
O(n/2 + n/2) => O(n). Worst case is if both trees full, which means that there
can be up to n/2 leaf nodes in each tree. Since we are performing level order
traversal, at the last, leaf level, there can be up to O(n/2) leaf nodes in
stack, per tree.
*/

var isSameTree = function(p, q) {
    // define stack
    const stack = [p, q];

    // loop while stack is not empty
    while (stack.length > 0) {
        // pop stack twice
        const [nodeOne, nodeTwo] = [stack.pop(), stack.pop()];

        // if both values are null, we can stop traversing current nodes.
        if (nodeOne === null && nodeTwo === null) continue;
        
        // if either popped values are null, or values are not equal, return false
        if (
            (nodeOne === null || nodeTwo === null) || 
            (nodeOne.val !== nodeTwo.val)
            ) return false;

        // otherwise, push both right children,
        // then both left children. That way, the left subtree
        // will be popped and traversed first to implement DFS.
        stack.push(nodeOne.right, nodeTwo.right);
        stack.push(nodeOne.left, nodeTwo.left);
    }

    return true;
};