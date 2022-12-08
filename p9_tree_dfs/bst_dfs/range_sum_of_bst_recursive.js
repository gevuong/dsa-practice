/*
https://leetcode.com/problems/range-sum-of-bst/

Intuition:
1. Implement DFS to find node values within inclusive range.
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
    // define current sum and dfs method
    let sum = 0;
    const dfs = (node) => {
        // define base case
        if (node === null) return;

        // otherwise, check if node value is in inclusive range.
        if (node.val >= low && node.val <= high) sum += node.val;
        // if node value is greater than low, traverse left subtree.
        if (node.val > low) dfs(node.left);
        // if node value is less than high, traverse right subtree.
        if (node.val < high) dfs(node.right);
    }

    dfs(root);
    return sum;
};