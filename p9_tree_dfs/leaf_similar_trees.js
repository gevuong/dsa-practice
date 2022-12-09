/*
https://leetcode.com/problems/leaf-similar-trees/description/

TC O(n + m), where n and m are total number of nodes in each tree.
SC O(n + m), where n and m are total number of nodes in each tree.
    Space is needed to store the leaf node values for each tree.
*/

var leafSimilar = function(root1, root2) {
    // define leaf sequence of root1 and root2
    const seqOne = [],
        seqTwo = [];

    // define dfs, with node as param
    const dfs = (node, seq) => {
        // define base case, if node equals null, return
        if (node === null) return;

        // otherwise, check if node is a leaf, if so, add to leaf sequence
        if (node.left === null && node.right === null) seq.push(node.val);
        // traverse left and right subtrees
        dfs(node.left, seq);
        dfs(node.right, seq);
    }

    dfs(root1, seqOne);
    dfs(root2, seqTwo);

    // define sequence lengths
    const seqOneLen = seqOne.length,
        seqTwoLen = seqTwo.length;

    // compare length of leaf sequences
    if (seqOneLen !== seqTwoLen) return false;

    // loop either sequences
    for (let i = 0; i < seqOneLen; i++) {
       // compare leaf values by index
        if (seqOne[i] !== seqTwo[i]) return false;
    }

    return true;
};