/*
https://leetcode.com/problems/two-sum-iv-input-is-a-bst/

Method: HashSet + BFS

Intuition:
1. Perform level order traversal of BST using a BFS (via queue).
2. As we traverse each node, we calculate the difference and see if difference
    exists in hashset. If so, then there exists a pair of numbers that sum to k.
3. If not, add current node value to hashset so the subsequent elements can
    check if the difference exists in the hashset.

Time Complexity:
O(n), where n is number fof nodes in BST.

Space Complexity:
O(n) worst case, where BST is a linked list, where every parent has one child.
*/

var findTarget = function(root, k) {
    // define hashmap, and queue with root.
    const seen = new Set();
    const queue = [root];

    // loop while queue is non empty
    while (queue.length > 0) {
        // shift queue
        const node = queue.shift(),
            diff = k - node.val;
        
        // subtract current node value from k
        if (seen.has(diff)) return true;

        // otherwise, add node value to object
        seen.add(node.val);

        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
    }

    return false;
};