/*
https://leetcode.com/problems/validate-binary-search-tree/

Runtime: 80 ms, faster than 86.16% of JavaScript online submissions for Validate Binary Search Tree.
Memory Usage: 46.1 MB, less than 68.03% of JavaScript online submissions for Validate Binary Search Tree.

TC O(n), where n is number of nodes in tree.
SC O(n), since worst case is there are n/2 leaf nodes in a balanced tree.

Hints:
1. An empty tree is considered a valid BST.

2. An invalid BST occurs when the current node is not greater than the lower
    limit, and less than the upper limit.
    
3. Since we know that the values in the left subtree have to be lower than 
    its parent (or current) node, when we push the left child to the queue,
    we must also update the upper limit to the current node.
    Similarly, when we push the right child to the queue, we must update
    the lower limit to the current node because any values in the right subtree
    must be greater than its parent (or current) node.
*/
var isValidBST = function(root) {
    // define edge case.
    // an empty tree is still a valid BST.
    if (root === null) return true;
    
    // define queue with root, low and high bounds.
    const queue = [[root, -Infinity, Infinity]];
    
    // loop while queue is not empty
    while (queue.length > 0) {
        // shift queue
        const [node, low, high] = queue.shift();
        
        // if node is not between ranges ranges, 
        // or are equal to the lower and upper bounds,
        // then the tree is an invalid BST.
        if (node.val <= low || node.val >= high) return false;
        
        // otherwise, if left or right child exists,
        // push left and right children with an updated low and high bounds
        // to queue.
        if (node.left !== null) queue.push([node.left, low, node.val]);
        if (node.right !== null) queue.push([node.right, node.val, high]);
    }
    
    return true;
};