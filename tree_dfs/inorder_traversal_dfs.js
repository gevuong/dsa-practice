/*
https://leetcode.com/problems/binary-tree-inorder-traversal/

Runtime: 56 ms, faster than 98.26% of JavaScript online submissions for Binary Tree Inorder Traversal.
Memory Usage: 42.3 MB, less than 42.56% of JavaScript online submissions for Binary Tree Inorder Traversal.

TC O(n) | SC O(n), worst case is when tree is a linked list, where each node has one child.

Hints:
1. Define the base case. What should we return (if any), if the current node is null?

2. Always go from the root in counterclockwise direction around the tree.
    For inorder traversal, When a node is visited twice, record the node's value.

3. To perform inorder traversal, remember the following:
    - traverse left child node, or left subtree (of current node).
    - visit and record root node.
    - traverse right child node, or right subtree (of current node).
*/

var inorderTraversal = function(root) {
    // define output, dfs method with node param
    const res = [],
        dfs = (node) => {
            // define base case, if node equals null.
            if (node === null) return;

            // otherwise, call dfs with left child
            // push current node to output
            // call dfs with right child
            dfs(node.left);
            res.push(node.val);
            dfs(node.right);
        }
    
    // call dfs
    dfs(root);
    return res;
};