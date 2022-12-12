/*
https://leetcode.com/problems/symmetric-tree/description/

Method: BFS w/ Queue

# Intuition
1. To compare nodes, push root node's left and right children.

# Approach
1. 

# Complexity
- Time complexity:
O(n), we have to traverse all nodes in tree once for symmetry comparison. 

- Space complexity:
Hm, not sure if it's necessarily O(n) worst case.

*/

var isSymmetric = function(root) {    
    // define queue
    const queue = [[root.left, root.right]];

    // loop while queue is not empty
    while (queue.length > 0) {
        // shift queue
        const [firstNode, secondNode] = queue.shift();

        // if both nodes are null, the tree is still symmetric,
        // but we don't have to continue processing its left and right children, so skip.
        if (firstNode === null && secondNode === null) continue;

        // if either the first or second node is null, or if the values are not equal,
        // then tree does not have symmetry,
        if (firstNode === null || secondNode === null || firstNode.val !== secondNode.val) return false;

        // push left child of first shifted node,
        // with right child of second shifted node.
        queue.push([firstNode.left, secondNode.right]);

        // push right child of first shifted node,
        // with left child of second shifted node.
        queue.push([firstNode.right, secondNode.left]);
    }

    return true;
};