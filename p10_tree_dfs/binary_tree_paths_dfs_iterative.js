/*
https://leetcode.com/problems/binary-tree-paths/description/

Method: Iterative DFS via Stack

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
<!-- Add your time complexity here, e.g. $$O(n)$$ -->

- Space complexity:
<!-- Add your space complexity here, e.g. $$O(n)$$ -->
*/

var binaryTreePaths = function(root) {
    // handle edge case
    if (root === null) return [];
    // define paths, and queue or stack, [[root, 'root.val']]
    const paths = [],
        stack = [[root, root.val.toString()]];
        
    // while stack is non empty
    while (stack.length > 0) {
        // pop stack
        const [node, path] = stack.pop();

        // if node is a leaf, push string path to paths
        if (node.left === null && node.right === null) {
            paths.push(path);
        }

        // if right node exists, push array with right node 
        // and appended '->' and right child value to path.
        if (node.right !== null) stack.push([node.right, path + `->${node.right.val.toString()}`]);
        // if left node exists, push array with left node 
        // and appended '->' and left child value to path.
        if (node.left !== null) stack.push([node.left, path + `->${node.left.val.toString()}`]);
    }

    return paths;
};