/*
# Problem
https://leetcode.com/problems/same-tree/description/

# Method
Recursive DFS

# Intuition
Perform recursive DFS.
1. check if they're both null, if so, skip and stop traversing
with current nodes.
2. check if either are null, if so, return false.
3. check if both node values are equal, if not return false.
4. Otherwise, make recursive call to traverse left subtree, AND another
    recursive call to traverse right subtree.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(n + n) => O(n). Each node is visited once.

- Space complexity:
O(n/2 + n/2) => O(n). Worst case is if both trees full, which means that there
can be up to n/2 leaf nodes in each tree. Since we are performing level order
traversal, at the last, leaf level, there can be up to O(n/2) leaf nodes in
stack, per tree.
*/

var isSameTree = function(p, q) {
    // define base cases.
    // if both nodes are null, then current nodes are same.
    if (p === null && q === null) return true;
    // after checking if both nodes are null,
    // if either node is null, then tree is not the same.
    if (p === null || q === null) return false;
    // if values are not the same, then tree is not the same.
    if (p.val !== q.val) return false;

    // traverse left subtree of both trees, and right subtree
    // of both trees. If at any point traversing subtrees
    // return false, then tree is not the same.
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};