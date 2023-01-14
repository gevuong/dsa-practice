/*
# Problem
https://leetcode.com/problems/longest-path-with-different-adjacent-characters/description/

Return the length of the longest path in the tree such that no pair of adjacent 
nodes on the path have the same character assigned to them.

Helpful explanation with pictures:
https://leetcode.com/problems/longest-path-with-different-adjacent-characters/solutions/1955340/Python-Explanation-with-pictures-BFS/

# Method
Recursive DFS + Hashmap (Map Parent to Child)
An adjacency list is not necessary.

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
- Map parent to an array of children.
- In DFS method, initialize the first and second longest paths.
    - Loop current node's children, and call dfs for each child.
    - The dfs call should return the longest path in child's subtree.
    - We want to skip child if the current and child nodes share the same
        character.
    - Otherwise, compare longest path in child's subtree with the first and
        second longest paths of current node.
    - Update the first and second longest paths of current node if the longest
        path in child's subtree is greater.
    - Once we're done looping all children, we would have calculated the 
        first and second longest paths of the current node. So we want to
        calculate the max path by comparing the current max path, and the sum
        of the first and second longest paths + 1 (to account for the current node).
    - In DFS method, we want to return the longest path + 1 (to account for the
        current node). Not the max path.
- Return max path.

# Complexity
- Time:
O(n + n + n) => O(n).
- Each node is visited once per dfs call, which takes O(n) time total.
- We traverse the edge of every node once. Since we don't visit a node more than
    once, we don't iterate its edges more than once).
- We iterate every node to populate hashmap.

- Space:
O(n + n) => O(n).
- There are n keys in hashmap.
- Worst case is if tree is a singly linked list. This means there are n calls in
the recursive call stack.
*/

var longestPath = function(parent, s) {
    // initialize hashmap with empty arrays per node
    const parentToChild = {},
        parentLen = parent.length;
    for (let i = 0; i < parentLen; i++) parentToChild[i] = [];

    // populate hashmap with directed edges (from parent to child)
    for (let i = 0; i < parentLen; i++) {
        if (parent[i] === -1) continue;
        parentToChild[parent[i]].push(i);
    }

    // define longest path and dfs method
    let longest = 1;
    const dfs = (curr) => {
        // define first and second longest paths.
        // the current node can have at most two longest paths formed
        // by its child nodes.
        let firstLongest = 0,
            secondLongest = 0;

        // loop current node's children
        for (let child of parentToChild[curr]) {            
            // traverse child node via dfs, and return the longest
            // path encountered in the child subtree.
            const longestFromChild = dfs(child);

            // if current and child characters are the same, then we can
            // skip child because the adjacent pairs share the same character.
            //
            // We conduct this check after dfs traversal call because we
            // don't want this to be a stopping condition.
            // We want to traverse child's subtree to see if child's subtree
            // has a path that may be the longest.
            if (s[child] === s[curr]) continue;

            // update first and second longest if the longest path in
            // the child subtree is greater than the first or
            // second longest paths at the current node.
            if (longestFromChild > firstLongest) {
                secondLongest = firstLongest;
                firstLongest = longestFromChild;
            } else if (longestFromChild > secondLongest) {
                secondLongest = longestFromChild;
            }
        }

        // calc longest path at current node.
        // Because the longest path of current node can have up to 
        // two paths, we must add the first and second longest paths,
        // and 1 to account for the current node.
        longest = Math.max(longest, firstLongest + secondLongest + 1);

        // as we move up to the parent node in the recursive call stack,
        // we want to return the longest path at the current node,
        // which in this case is the first longest path. We add 1 to
        // account for the current node.
        return firstLongest + 1;
    }

    // call dfs
    dfs(0);
    return longest;
};