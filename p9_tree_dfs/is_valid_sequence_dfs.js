/*
https://leetcode.com/problems/check-if-a-string-is-a-valid-sequence-from-root-to-leaves-path-in-a-binary-tree/

Runtime: 138 ms, faster than 61.54% of JavaScript online submissions for Check If a String Is a Valid Sequence from Root to Leaves Path in a Binary Tree.
Memory Usage: 49.7 MB, less than 15.38% of JavaScript online submissions for Check If a String Is a Valid Sequence from Root to Leaves Path in a Binary Tree.

TC O(n) | SC O(n), where n is total number of nodes in tree.
Worst case space is when recursive call stack equals total number of nodes in tree.

Hints:
1. This pattern is very similar to Path Sum. If either traversing the left or right
    subtree of the current node equates to a valid sequence, then we can return true.

2. We have to track sequence (or input array) index and compare its value with
    the current node value.

3. If we reached the end of sequence, and the current node is a leaf node,
    then we have a valid sequence.
*/

var isValidSequence = function(root, arr) {
    const arrLen = arr.length,
        dfs = (node, seqIdx) => {
            // handle base case
            if (node === null) return false;
            
            // check if seq value equals node value.
            // We can immediately return false as soon as we find a mismatch
            // between sequence and node values.
            if (arr[seqIdx] !== node.val) return false;

            // check if node is a leaf, and it is the end of sequence,
            // we found a valid sequence from root-to-leaf.
            if (node.left === null && node.right === null && seqIdx + 1 === arrLen) return true;
            
            // otherwise, return the traversal of left and right subtrees 
            // with incremented seq idx.
            // recursively call to traverse the left and right sub-tree.
            // return true if any of the two recursive call return true.
            return dfs(node.left, seqIdx + 1) || dfs(node.right, seqIdx + 1);
        };

    return dfs(root, 0);
};