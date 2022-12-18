/*
https://leetcode.com/problems/maximum-depth-of-binary-tree/description/

Method: Recursive DFS

# Intuition
1. To compare nodes, push root node's left and right children.

# Approach
1. Create dfs method with node and current depth as parameters.
2. Traverse from root to leaf and when leaf is reached, calculate max depth.

# Complexity
- Time complexity:
O(n), we traverse all nodes to find max depth.

- Space complexity:
O(n). Worst case is that the tree is a linked list, where each parent has one child.

*/

var maxDepth = function(root) {
    // define max depth, dfs method
    let maxDepth = 0;
    const dfs = (node, depth) => {
        // define base case
        if (node === null) return;
        depth++;
        // if node is leaf, calc max depth
        if (node.left === null && node.right === null) {
            maxDepth = Math.max(maxDepth, depth);
        }
        // traverse left and right subtree
        dfs(node.left, depth);
        dfs(node.right, depth);
    
    }
    // call dfs
    dfs(root, 0);
    return maxDepth;
};