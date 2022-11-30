/*
https://leetcode.com/problems/path-sum-ii/

Runtime: 75 ms, faster than 96.05% of JavaScript online submissions for Path Sum II.
Memory Usage: 44.8 MB, less than 90.07% of JavaScript online submissions for Path Sum II.

TC O(n^2), because worst case is if tree is balanced, then at most we can have
n/2 leaf nodes. And for each root-to-leaf path we may need to make a copy
of each path to be added to the output, which takes O(n) time.

SC O(n), because we're not including the space to store the output, O(n) comes
storing a subarray of nodes for a particular path.

Hints:
1. There is an if-else statement. If the remaining sum equals 0, then we can
    push path to output array. Else recurse the left and right subtrees.

2. At the end of the dfs call, we want to pop node the path subarray because
    by the time we reach the end of the dfs method, we would have traversed
    the its subtrees.
*/

var pathSum = function(root, targetSum) {
    // define output array, and dfs method, with node and remaining sum as params
    const paths = [],
        dfs = (node, remainingSum, path) => {
            // define base case, if node is null, return from function call.
            if (node === null) return;
            
            // calc remaining sum, and push node val to subarray
            remainingSum -= node.val;
            path.push(node.val);
            
            // if node is a leaf node, and remaining sum equals 0, 
            // then we found a valid path sum, and push subarray to output.
            if (node.left === null && node.right === null && remainingSum === 0) {
                paths.push([...path]);
            } else {
                // otherwise, call dfs with left and right child and remaining sum
                dfs(node.left, remainingSum, path);
                dfs(node.right, remainingSum, path);
            }
            // pop node from path once all of its subtrees have been traversed.
            path.pop();
        }
    
    // call dfs, return output.
    dfs(root, targetSum, []);
    return paths;
};