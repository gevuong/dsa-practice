/*
https://leetcode.com/problems/validate-binary-search-tree/

Method 1: Recursive traversal with Valid Range

Runtime: 107 ms, faster than 67.08% of JavaScript online submissions for Validate Binary Search Tree.
Memory Usage: 46.3 MB, less than 60.20% of JavaScript online submissions for Validate Binary Search Tree.

Hints:
1. An empty tree is still a valid BST.

2. Check if current node value is within lower and upper limits.

3. If at any point the left or right subtree encounters an invalid BST,
    that means the entire tree is invalid. In other words, both left and right
    subtrees must be valid BSTs.
    The upper limit must be updated when traversing the left subtree.
    Similarly, the lower limit must be updated when traversing the right subtree.
*/

var isValidBST = function(root) {
    // define dfs method with node, lower and upper limits
    const dfs = (node, low, high) => {
        // define base case, if node equals null, return true.
        // an empty tree is also a valid BST.
        if (node === null) return true;
        
        // make sure current node value are within the low and
        // high bounds, exclusive. If not, tree is an invalid BST.
        if (node.val <= low || node.val >= high) return false;
    
        // we want to make sure both the left and right subtrees
        // are valid. 
        // Update the upper limit when traversing the left subtree,
        // and the lower limit when traversing the 
        // right subtree to satisfy BST property.
        return dfs(node.left, low, node.val) && dfs(node.right, node.val, high);
    }
    
    // call dfs
    return dfs(root, -Infinity, Infinity);
};



/*
Runtime: 100 ms, faster than 74.10% of JavaScript online submissions for Validate Binary Search Tree.
Memory Usage: 46.4 MB, less than 51.20% of JavaScript online submissions for Validate Binary Search Tree.

TC O(n) | SC O(n), where n is total number of nodes in tree.
Worst case is if tree is a linked list, where each node has a one child.

Method 2: Recursive Inorder Traversal

Hints:
1. Write code to traverse tree inorder.
    When we visit a node for the second time (ie. traverse to bottom-leftmost node
    and begin working your way back up), instead of pushing the node 
    value to an output array, we compare the current and previous node values. 
    The previous node (ie. bottom-leftmost child) value needs to be LESS THAN the 
    current (ie. its parent) node value.

2. As we traverse the left subtree (via dfs call), if at any point the dfs call
    returns false, we know the tree is an invalid BST, and we can return false.

*/

var isValidBST = function(root) {
    // define previous value, and dfs method with node as param
    let prev;
    const dfs = (node) => {
        // define base case.
        // if node equals null, return true, because even an
        // empty tree is still a valid BST.
        if (node === null) return true;
    
        // call dfs with left child,
        // if at any point, while traversing the left subtree,
        // we discover that the BST property is invalid,
        // then tree is not a valid BST, and return false.
        if (!dfs(node.left)) return false;
    
        // compare current node value with previous value.
        // after traversing to leftmost leaf node from dfs call,
        // we traverse back up and compare the previous value
        // (which is the leftmost leaf node value), with its parent (or current)
        // node.
        // The parent node value should not be less than the previous (left child) node value.
        if (prev !== null && node.val <= prev) return false;
        // update previous val to current value.
        prev = node.val;
        
        // return call dfs with right child
        return dfs(node.right);
    }
    
    // call and return dfs
    return dfs(root);
};


