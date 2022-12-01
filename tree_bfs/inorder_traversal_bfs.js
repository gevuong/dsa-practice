/*
https://leetcode.com/problems/binary-tree-inorder-traversal/

Runtime: 79 ms, faster than 74.85% of JavaScript online submissions for Binary Tree Inorder Traversal.
Memory Usage: 41.9 MB, less than 85.48% of JavaScript online submissions for Binary Tree Inorder Traversal.

TC O(n) | SC O(n), where n is number of nodes in tree.
Worst case is when tree is a linked list with a single left child for each node.
*/

var inorderTraversal = function(root) {
    // handle edge case if root is null
    if (root === null) return [];
    
    // define output array, stack, and current node.
    const res = [],
        stack = [];
    let currNode = root;
    
    // loop while stack is not empty, or current node is not null.
    // Why? 
    
    // Because when we start, we have an empty stack,
    // so the while loop is skipped over.
    // However, we are tracking the current node being visited.
    // So in order to enter the while loop, we must also check if
    // current node is null or not.
    
    // Then why not just have a single condition to check if current node is null?
    // Well because we may exit the while loop without having popped
    // all values out of the stack. Lets say we have a tree like this:
    //     1
    //    /
    //   2
    //  /
    // 3
    // current node will be null because we have no right child.
    // But our stack will still have remaining values that need to be popped.
    while (stack.length > 0 || currNode !== null) {
        // first traverse left subtree to the bottom-leftmost node.
        // loop while current node is not null.
        while (currNode !== null) {
            stack.push(currNode);
            // update current node to its left child
            currNode = currNode.left;    
        }

        // pop from stack if current node is null.
        // This means we have reached the bottom-leftmost node.
        currNode = stack.pop();
        // push popped value to output.
        res.push(currNode.val);
        // now traverse right subtree.
        currNode = currNode.right;
    }
    return res;
        
};