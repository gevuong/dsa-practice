/*
https://leetcode.com/problems/sum-root-to-leaf-numbers/

Runtime: 72 ms, faster than 79.30% of JavaScript online submissions for Sum Root to Leaf Numbers.
Memory Usage: 42.5 MB, less than 45.15% of JavaScript online submissions for Sum Root to Leaf Numbers.

TC O(n) | SC O(n)

Method 1: DFS Recursive + Arithmetic

Since we are not storing node values in a path array, we actually do not need
to backtrack by removing previously added value from 'pathSum' at the bottom of DFS method.
Why? I'm not exactly sure...
*/


var sumNumbers = function(root) {
    // define total sum, dfs method with node, path params
    let total = 0;
    const dfs = (node, pathSum) => {
        // define base case
        if (node === null) return;    
        // calculate path sum (ie. 1->2->3 = 123).
        pathSum = (pathSum * 10) + node.val;
        // if node is a leaf, add path sum to total.
        if (node.left === null && node.right === null) {
            total += pathSum;
        }
        // traverse left and right subtree
        dfs(node.left, pathSum);
        dfs(node.right, pathSum);
    }
    
    // call dfs, and return total
    dfs(root, 0);
    return total;
};

/*
Method 2: DFS Recursive + Path Array (Less optimal)

Runtime: 72 ms, faster than 79.30% of JavaScript online submissions for Sum Root to Leaf Numbers.
Memory Usage: 42.5 MB, less than 45.15% of JavaScript online submissions for Sum Root to Leaf Numbers.

TC O(n) | SC O(n)
Requires extra space to store array of path, and extra processing O(n) to join
array of numbers.
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
        } 
        // otherwise, traverse left and right subtree
        dfs(node.left, path);
        dfs(node.right, path);

        // pop from path
        path.pop();
    }
    
    // call dfs, and return total sum
    dfs(root, []);
    return total;
};