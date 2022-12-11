/*
https://leetcode.com/problems/binary-tree-paths/

Runtime: 72 ms, faster than 87.37% of JavaScript online submissions for Binary Tree Paths.
Memory Usage: 43.6 MB, less than 70.56% of JavaScript online submissions for Binary Tree Paths.

Method 1: Recursive DFS + Backtracking + Path Array

TC O(n) or O(n^2)
Hm, TC could be O(n^2), since joining a path takes O(n) time and there are 
at most n/2 leaf nodes (or root-to-leaf paths).

SC O(n), worst case tree is a linked list where each parent is one child.
*/

var binaryTreePaths = function(root) {
    // define output array, dfs method with node, path param
    const res = [],
        dfs = (node, path) => {
            // define base case.
            if (node === null) return;
            
            // push node value to path
            path.push(node.val);
            
            // check if node is a leaf node.
            // if so, join path with '->' and push to output
            if (node.left === null && node.right === null) {
                res.push(path.join('->'));
            }

            // traverse left and right subtree
            dfs(node.left, path);
            dfs(node.right, path);

            // remove current node from the path to backtrack while we are
            // going up the recursive call stack.
            path.pop();
        }
    
    // call dfs and return output
    dfs(root, []);
    return res;
};