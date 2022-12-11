/*
https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/description/

Method: One Pass DFS + Array

# Intuition
1. Calculate the total sum of tree via postorder dfs.
2. Product of sum of two trees = (total sum - subtree1) * subtree1.
3. Once total sum is calculated you can either:
    1. do a second pas dfs, and calculate and compare the max product sums of 
        each subtree.
    2. During the first pass, push the subtree sums to an array, then loop array
        and calculate max product sum with total sum value.

# Approach
1. Perform postorder traversal to calculate the sum of subtrees from 
the bottom up.
As a reminder, postorder has the following order:
    1. Traverse left subtree.
    2. Traverse right subtree.
    3. Visit root node.
In other words, print the nodes when you visit them for the third time.

# Complexity
- Time complexity:
O(n), since we only visit each node once as we conduct postorder traversal to
calculate the sum of each subtree.

- Space complexity:
O(n). 
There are n-1 edges, so there will be n-1 subtree sums in array.
Also, the recursive call stack can range from O(logn) (balanced tree) to O(n)
(tree that resembles a linked list, where each parent has one child).
*/

var maxProduct = function(root) {
    // define array of subtree sums
    const subtreeSums = [];

    // define dfs method to calc sum of subtree and
    // return total sum of tree.
    const dfs = (node) => {
        // define base case
        if (node === null) return 0;
        
        // traverse left and right subtree
        const leftSum = dfs(node.left);
        const rightSum = dfs(node.right);

        // calc sum of subtree, and push sum to array.
        const sum = leftSum + rightSum + node.val;
        subtreeSums.push(sum);
        return sum;
    }

    // calc sum of tree and subtrees via dfs
    const totalSum = dfs(root);

    let maxProdSum = 0;
    // loop subtree sums, and calc product of sums
    for (const sum of subtreeSums) {
        const prodSum = (totalSum - sum) * sum;
        maxProdSum = Math.max(prodSum, maxProdSum);
    }

    // take modulo of max product sum
    return maxProdSum % (Math.pow(10, 9) + 7);
};