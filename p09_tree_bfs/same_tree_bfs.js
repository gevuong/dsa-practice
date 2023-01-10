/*
# Problem
https://leetcode.com/problems/same-tree/description/

# Method
BFS (via Queue)

# Intuition
Perform level order traversal by pushing both root nodes to queue,
and 
1. check if they're both null, if so, skip and stop traversing
with current nodes.
2. check if either are null, if so, return false.
3. check if both node values are equal, if not return false.
4. Otherwise, push both left nodes, then both right nodes to queue.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(n + n) => O(n).

- Space complexity:
O(n/2 + n/2) => O(n). Worst case is if both trees full, which means that there
can be up to n/2 leaf nodes in each tree. Since we are performing level order
traversal, at the last, leaf level, there can be up to O(n/2) leaf nodes in
queue, per tree.
*/

var isSameTree = function(p, q) {
    // define queue
    const queue = [p, q];

    // loop while queue is not empty
    while (queue.length > 0) {
        // pop queue twice
        const [nodeOne, nodeTwo] = [queue.pop(), queue.pop()];

        if (nodeOne === null && nodeTwo === null) continue;
        if (nodeOne === null || nodeTwo === null) return false; 
        // if popped values are not equal, return false
        if (nodeOne.val !== nodeTwo.val) return false;

        // otherwise, push both left children,
        // then both right children.
        queue.push(nodeOne.left, nodeTwo.left);
        queue.push(nodeOne.right, nodeTwo.right);
    }

    return true;
};