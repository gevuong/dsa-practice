/*
https://leetcode.com/problems/path-sum/

Runtime: 80 ms, faster than 87.80% of JavaScript online submissions for Path Sum.
Memory Usage: 46.2 MB, less than 15.29% of JavaScript online submissions for Path Sum.

TC O(n), where n is number of nodes.
SC O(n/2) -> O(n). There can be at most n/2 leaf nodes in the queue since we're
doing a level-order traversal. O(n/2) reduces to O(n).

Hints:
1. Queue can store a subarray of the node and the current sum, [node, currSum].

2. If a node is a leaf node and the current sum equals target sum, then there
    is a valid path that sums to target.

3. push left and right child nodes along with the updated current sum,
    to the queue, if they exist.
*/

var hasPathSum = function(root, targetSum) {
    // define edge case, if root is null
    if (root === null) return false;
    
    // define queue with root and root val
    const queue = [[root, root.val]];
    
    // loop while queue is not empty
    while (queue.length > 0) {
        // shift from queue
        const [node, sum] = queue.shift();
        
        // if node is a leaf node and current sum equals target sum, return true
        if (node.left === null && node.right === null && sum === targetSum) return true;
        
        // otherwise, push left and right child if exists
        if (node.left !== null) queue.push([node.left, sum + node.left.val]);
        if (node.right !== null) queue.push([node.right, sum + node.right.val]);
    }
    
    return false;
};