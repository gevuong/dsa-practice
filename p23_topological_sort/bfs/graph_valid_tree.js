/*
# Problem
https://leetcode.com/problems/graph-valid-tree/description/

# Method
BFS (via Queue) + Adjacency List (Hashmap) + Visited Hashset

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
- For a graph to be a valid tree, there must be exactly n - 1 edges. Any more 
    and it will have cycles.
- Create an adjacency list of undirected edges.
- Define a queue starting at node 0, and a visited hashset.
- Traverse node in queue via bfs, shift queue, mark current node as visited,
    and push unvisited neighbors to the queue.
- After traversing all nodes in the connected component of the graph starting at
    node 0, if the visited hashset size equals number of vertices, 
    return true, otherwise return false.

# Complexity
- Time:
O(n + n) => O(n).
Creating an adjacency list takes O(n - 1) time. In order for a graph to be valid,
there must be n - 1 edges.
During BFS, we traverse each node at most once due to the visited hashset.

- Space:
O(n + n) => O(n).
The adjacency list stores n vertices, and so does the visited hashset, in the
worst case.
*/

var validTree = function(n, edges) {
    // for a graph to be a valid tree, there must be exactly n - 1 edges.
    // Any more and it will have cycles.
    const edgesLen = edges.length;
    if (edgesLen !== n-1) return false;

    // define adjacency to map undirected edges
    const adjList = {};
    for (let i = 0; i < n; i++) adjList[i] = [];
    for (const [v1, v2] of edges) {
        adjList[v1].push(v2);
        adjList[v2].push(v1);
    }

    // define visited hashset, and queue
    const visited = new Set(),
        queue = [0];
    let i = 0;
    // traverse tree via bfs starting at root node of 0
    while (queue.length > 0) {
        // shift queue and mark current node as visited
        const curr = queue[i];
        i++;
        visited.add(curr);

        // loop and traverse current node's children.
        // if child has been visited, we can skip it.
        for (let child of adjList[curr]) {
            if (visited.has(child)) continue;
            queue.push(child);
        }
    }

    // if we did not visit n vertices, that means there's a
    // disconnected set we have not traversed
    return visited.size === n;
};