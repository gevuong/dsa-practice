/*
https://leetcode.com/problems/range-sum-of-bst/

Intuition:
1. Implement iterative DFS to find node values within inclusive range using a stack.
2. It's basically pre-order traversal, but with conditions identifying
    whether we need to traverse the left or right subtrees.
3. Use BST property to your advantage. If the current node value
    is less than the low range, then we no longer need to traverse its left
    subtree because all the node values in the left subtree will be less than
    the low range. 
    Similarly, if the current node value is greater than the high
    range, we don't need to traverse its right subtree because all node values
    in right subtree will be greater than high range based on BST property.
*/

var rangeSumBST = function(root, low, high) {
    // handle edge case, if root is null
    if (root === null) return 0;
    // define sum, stack
    let sum = 0, stack = [root];

    // while stack is not empty
    while (stack.length > 0) {
        // pop from stack
        const node = stack.pop();
        // if value is within range, add to sum
        if (node.val >= low && node.val <= high) sum += node.val;
        // if value < high, that means we can traverse right subtree.
        if (node.right !== null && node.val < high) stack.push(node.right);
        // if value > low, we can still traverse left subtree.
        if (node.left !== null && node.val > low) stack.push(node.left);

    }

    return sum;
};