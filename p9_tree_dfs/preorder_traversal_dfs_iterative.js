/*
https://leetcode.com/problems/binary-tree-preorder-traversal/

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
<!-- Add your time complexity here, e.g. $$O(n)$$ -->

- Space complexity:
<!-- Add your space complexity here, e.g. $$O(n)$$ -->
*/

var preorderTraversal = function(root) {
    if (root === null) return [];

    const res = [], stack = [root];

    while (stack.length > 0) {
        const node = stack.pop();
        res.push(node.val);
        // due to LIFO, we want to push right node to stack first,
        // then left node. So that when we pop from stack,
        // we can continue traversing left subtree first.
        if (node.right !== null) stack.push(node.right);
        if (node.left !== null) stack.push(node.left);

    }

    return res;
};