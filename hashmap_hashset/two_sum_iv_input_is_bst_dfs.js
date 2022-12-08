/*
https://leetcode.com/problems/two-sum-iv-input-is-a-bst/

Method: HashSet + Recursive DFS

Intuition:
1. Define base case. We know that node is null, can there be two sum?
2. If traversing either the left or right subtree returns true, then we know
    the BST has a valid two sum.

Time Complexity:
O(n), where n is number fof nodes in BST.

Space Complexity:
O(n) worst case, where BST is a linked list, where every parent has one child.
*/

var findTarget = function(root, k) {
    // define set, dfs method
    const seen = new Set(),
        dfs = (node) => {
            // if root equals null, return false
            if (node === null) return false;
            // calc diff between k and node value
            const diff = k - node.val;
            // check if diff exists in set, if so, return true
            if (seen.has(diff)) return true;
            
            // otherwise, store node val in set.
            seen.add(node.val);

            // if either traversal directions return true, then we have
            // two values that sum to k.
            return dfs(node.left) || dfs(node.right);
        }

    return dfs(root);
};