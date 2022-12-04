/*
https://leetcode.com/problems/sum-root-to-leaf-numbers/

Runtime: 72 ms, faster than 79.30% of JavaScript online submissions for Sum Root to Leaf Numbers.
Memory Usage: 42.5 MB, less than 45.15% of JavaScript online submissions for Sum Root to Leaf Numbers.

TC O(n) | SC O(n)

Method 1: DFS Recursive + Arithmetic

Since we are not storing node values in a path array, we actually do not need
to backtrack by removing previously added value from 'pathSum' at the bottom of DFS method.
For the sake of consistency, similar to popping the value from the path array
as shown in alternative implementation below,
I will leave the pathSum calculation at the bottom of DFS method.
*/


var sumNumbers = function(root) {
    // define total sum, dfs method with node, path params
    let total = 0;
    const dfs = (node, pathSum) => {
        // define base case, return if node is null
        if (node === null) return;    
        // add node val to path
        pathSum = pathSum * 10 + node.val;
        // if node is a leaf, join path and convert to Number
        // add to total.
        if (node.left === null && node.right === null) {
            total += pathSum;
        } else {
            // otherwise, traverse left and right subtree
            dfs(node.left, pathSum);
            dfs(node.right, pathSum);
        }
        // remove previously added value from path sum.
        pathSum = Math.floor(pathSum / 10);
    }
    
    // call dfs, and return total sum
    dfs(root, 0);
    return total;
};

/*
Method 2: DFS Recursive + Path Array

Runtime: 72 ms, faster than 79.30% of JavaScript online submissions for Sum Root to Leaf Numbers.
Memory Usage: 42.5 MB, less than 45.15% of JavaScript online submissions for Sum Root to Leaf Numbers.

TC O(n) | SC O(n)
*/

var sumNumbers = function(root) {
    // define total sum, dfs method with node, path params
    let total = 0;
    const dfs = (node, path) => {
        // define base case, return if node is null
        if (node === null) return;    
        // add node val to path
        path.push(node.val);
        // if node is a leaf, join path and convert to Number,
        // add to total.
        if (node.left === null && node.right === null) {
            total += Number(path.join(''));
        } else {
            // otherwise, traverse left and right subtree
            dfs(node.left, path);
            dfs(node.right, path);
        }
        // pop from path
        path.pop();
    }
    
    // call dfs, and return total sum
    dfs(root, []);
    return total;
};