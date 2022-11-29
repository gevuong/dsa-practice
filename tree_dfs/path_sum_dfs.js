/*
https://leetcode.com/problems/path-sum/

Runtime: 117 ms, faster than 48.76% of JavaScript online submissions for Path Sum.
Memory Usage: 45.7 MB, less than 55.33% of JavaScript online submissions for Path Sum.

TC O(n) | SC O(n), where n is number of nodes in tree.
Worst case space is when tree is a linked list, where every node has one child.
*/

var hasPathSum = function(root, targetSum) {    
    // define dfs method, with node and remaining sum as params
    const dfs = (node, remainingSum) => {
        // define base case.
        // if node equals null, return false from dfs call,
        // since we cannot have a path sum if node equals null and is not a leaf node.
        if (node === null) return false;
        
        // if node is not null, and is a leaf node, return comparison of remaining sum with current node val.
        if (node.left === null && node.right === null) {
            return remainingSum === node.val;
        }

        // call dfs with left and right children, and subtract its current node val from remaining sum.
        // if either dfs calls return true, then we have a path that sums to target.
        return dfs(node.left, remainingSum - node.val) || dfs(node.right, remainingSum - node.val);
    }
    
    // call dfs
    return dfs(root, targetSum);
};


/*
Runtime: 75 ms, faster than 92.86% of JavaScript online submissions for Path Sum.
Memory Usage: 45.2 MB, less than 84.63% of JavaScript online submissions for Path Sum.

Subtract node value from remaining sum in between base cases.
*/
var hasPathSum = function(root, targetSum) {    
    // define dfs method, with node and remaining sum as params
    const dfs = (node, remainingSum) => {
        // define base case.
        // if node equals null, return false from dfs call,
        // since we cannot have a path sum if node equals null and is not a leaf node.
        if (node === null) return false;
        
        // subtract node val from remaining sum after checking if node is null, and
        // before checking if remaining sum equals 0,
        remainingSum -= node.val;
        
        // if node is not null, and is a leaf node, return comparison of remaining sum.
        if (node.left === null && node.right === null) {
            return remainingSum === 0;
        }

        // call dfs with left and right children, and subtract its vals from remaining sum.
        // if either dfs calls return true, then we have a path that sums to target.
        return dfs(node.left, remainingSum) || dfs(node.right, remainingSum);
    }
    
    // call dfs
    return dfs(root, targetSum);
};


/*
Runtime: 92 ms, faster than 80.43% of JavaScript online submissions for Path Sum.
Memory Usage: 45.6 MB, less than 55.33% of JavaScript online submissions for Path Sum.

Although, it requires more code, this is slightly more intuitive to me, and likely what I will come up with
because we check if remaining sum equals 0 instead of node.val, 
and instead of a one liner dfs return value, 
we have a boolean variable to store whether the left or right path are valid path sums.
*/

var hasPathSum = function(root, targetSum) {    
    // define dfs method, with node and remaining sum as params
    const dfs = (node, remainingSum) => {
        // define base case.
        // if node equals null, return false from dfs call,
        // since we cannot have a path sum if node equals null and is not a leaf node.
        if (node === null) return false;
        
        remainingSum -= node.val;
        // if node is not null, and is a leaf node, return comparison of remaining sum.
        if (node.left === null && node.right === null) {
            return remainingSum === 0;
        }
        
        // if either dfs calls return true, then we have a valid path sum.
        let hasPath = false;
        hasPath = dfs(node.left, remainingSum);
        if (!hasPath) hasPath = dfs(node.right, remainingSum);
        return hasPath;
    }
    
    // call dfs
    return dfs(root, targetSum);
};



