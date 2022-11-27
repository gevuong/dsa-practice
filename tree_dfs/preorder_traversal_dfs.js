/*
https://leetcode.com/problems/binary-tree-preorder-traversal/

Runtime: 68 ms, faster than 86.64% of JavaScript online submissions for Binary Tree Preorder Traversal.
Memory Usage: 42 MB, less than 77.86% of JavaScript online submissions for Binary Tree Preorder Traversal.

Hints:
1. What is the base case? 
When the node is null, we can just return from dfs call.

2. Always go from the root in counterclockwise direction around the tree.
For Preorder, print the nodes when you visit them for the first time.
    Steps:
    1. Visit current node - When we visit node, we add the node value to our output.
    2. Traverse left child node (of the current node).
    3. Traverse right child node (of the current node). 

3. Before calling dfs with left and right children, we don't need to check if they exist,
since the base case handles null values.
I'm beginning to notice this is common practice for tree dfs implementations, and can produce
cleaner code.
*/

var preorderTraversal = function(root) {    
    // define output, and dfs method
    const res = [],
        dfs = (node) => {
            // define base case, if node equals null.
            if (node === null) return;
            
            // otherwise, push node va to output
            res.push(node.val);
            // call dfs with left and right children.
            dfs(node.left);
            dfs(node.right);
        };
    
    dfs(root);
    return res;
}

/*
Runtime: 61 ms, faster than 94.67% of JavaScript online submissions for Binary Tree Preorder Traversal.
Memory Usage: 42.1 MB, less than 66.77% of JavaScript online submissions for Binary Tree Preorder Traversal.

Valid solution, but obviously not as clean as above solution, 
but you can check if left and right children first exists, before calling dfs with them.
*/


var preorderTraversal = function(root) {
    // define edge case, root equals null
    if (root === null) return [];
    
    // define array to store node's values
    const res = [],
        dfs = (node) => {
            // define base case
            if (node !== null) res.push(node.val)
            // call dfs with left and right children, if exists.
            if (node.left !== null) dfs(node.left);
            if (node.right !== null) dfs(node.right);
        };
    
    // call dfs
    dfs(root);
    return res;
};