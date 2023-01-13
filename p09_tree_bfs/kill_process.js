/*
# Problem
https://leetcode.com/problems/kill-process/description/

# Method
BFS (via Queue) + Hashmap (Map Parent to its Children). 
An adjacency List is not necessary.

# Intuition
- Create a hashmap which maps parent to an array of children.
- Traverse kill id via BFS, and push parent's children to queue.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(n + n + n) => O(n). Worst case is if tree is a 

- Space:
O(n + n) => O(n), where n is number of processes in tree.
There are n keys in hashmap, and the queue can store up to n/2 leaf nodes if
tree is a full binary tree (where every parent node/internal node has either
2 or no children).
*/

var killProcess = function(pid, ppid, kill) {
    // initialize hashmap with empty arrays.
    const parentToChild = {};
    for (const id of pid) parentToChild[id] = [];

    // Don't need to create an edge from child to parent.
    for (let i = 0; i < pid.length; i++) {
        const [child, parent] = [pid[i], ppid[i]];
        // if parent equals 0, continue
        if (parent === 0) continue;
        // otherwise, create an edge from parent to child
        parentToChild[parent].push(child);
    }

    // loop kill ids children
    const queue = [kill],
        idsToKill = [];
    let i = 0;
    while (queue.length > i) {
        // access id at current index, then increment index
        const id = queue[i++];
        // push id to kill
        idsToKill.push(id);
        // loop id's children
        queue.push(...parentToChild[id]);
    }

    // return ids to kill
    return idsToKill;
};