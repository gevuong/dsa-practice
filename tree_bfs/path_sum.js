/*
https://leetcode.com/problems/path-sum/

Runtime: 108 ms, faster than 66.76% of JavaScript online submissions for Path Sum.
Memory Usage: 46.3 MB, less than 12.12% of JavaScript online submissions for Path Sum.

TC O(n), where n is number of nodes.
SC O(n/2) -> O(n). There can be at most n/2 leaf nodes in the queue since we're
doing a level-order traversal. O(n/2) reduces to O(n).
*/

var hasPathSum = function(root, targetSum) {
    // handle edge case, if root is null.
    if (root === null) return false;
    
    // define queue
    const queue = [[root, root.val]];
    
    while (queue.length > 0) {
        // shift from queue
        const [currNode, currSum] = queue.shift();
        
        // check if current sum equals target
        if (currNode.left === null && currNode.right === null && currSum === targetSum) return true;
        
        // otherwise, push left and right child nodes to queue
        if (currNode.left !== null) queue.push([currNode.left, currSum + currNode.left.val]);
        if (currNode.right !== null) queue.push([currNode.right, currSum + currNode.right.val]);
    }
    
    return false;
};