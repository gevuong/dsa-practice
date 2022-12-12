/*
https://leetcode.com/problems/symmetric-tree/description/

Method: Recursive DFS

# Intuition

# Approach
1. DFS method has 2 node parameters.
2. If both nodes are null, there is still symmetry, so we can return true.
3. Next, if either nodes are null, or the node values are not equal,
    we do not have symmetry, therefore return false.
4. When traversing subtrees via recursive call, we are comparing the left node's
    left child with the right node's right child, and the left node's right child
    with the right node's left child.

# Complexity
- Time complexity:
O(n), we have traverse all nodes in tree for comparison of symmetry. 

- Space complexity:
O(h), worst case is if every left child of root has a left node, and every
right child of root has a right node. This recursive


        root
        /  \
     node  node
     /       \
  node       node
  /            \
node           node
*/

var isSymmetric = function(root) {
    // define dfs
    const dfs = (nodeOne, nodeTwo) => {
        // define base cases.
        // if both nodes are null, we still have symmetry.
        if (nodeOne === null && nodeTwo === null) return true;

        // if either nodes are null, or the node's values do not equal,
        // we do not have symmetry.
        if (nodeOne === null || nodeTwo === null || nodeOne.val !== nodeTwo.val) {
            return false;
        }
        // due to symmetry, a node one's left child and node two's right child should be equal,
        // and vice versa.
        // if either subtree traversals is not true, then the entire tree is not symmetric. 
        return dfs(nodeOne.left, nodeTwo.right) && dfs(nodeOne.right, nodeTwo.left);
    }

    // begin with the root's left and right child 
    // since we know the root is equal and shared.
    return dfs(root.left, root.right);
};