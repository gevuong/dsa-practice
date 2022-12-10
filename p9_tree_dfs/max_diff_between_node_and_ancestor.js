/*
https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/description/

# Intuition
1. Implement an algorithm similar to how you would traverse a tree to find all 
    root-to-leaf paths.
2. As you traverse a root-to-leaf path, find the min and max value of the path.
3. When the leaf node is reached, simply take the absolute difference between
    the min and max values, and compare it to the max absolute difference.
4. Track the min and max values of the path for each dfs call.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(n), where n is total number of nodes in tree

- Space complexity:
O(n), where n is total number of nodes in tree. Worst case is when tree is a
linked list.
*/

var maxAncestorDiff = function(root) {
    // define max diff
    let maxDiff = 0;
    // define dfs method
    const dfs = (node, min, max) => {
        // define base case
        if (node === null) return;

        // find current min and max of path
        min = Math.min(min, node.val);
        max = Math.max(max, node.val);

        // if node is a leaf, calc max diff in path
        if (node.left === null && node.right === null) {
            const diff = Math.abs(max - min);
            maxDiff = Math.max(diff, maxDiff);
        }
        // traverse left and right subtree
        dfs(node.left, min, max);
        dfs(node.right, min, max);
    }

    // call dfs
    dfs(root, Infinity, -Infinity);
    return maxDiff;
};