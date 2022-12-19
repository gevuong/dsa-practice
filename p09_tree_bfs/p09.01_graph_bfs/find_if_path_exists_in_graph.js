/*
# Problem
https://leetcode.com/problems/find-if-path-exists-in-graph/description/

# Method
BFS + Hashmap + Hashset + Queue

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(n + m), or O(V + E). Where V (or n) is the number of vertices, 
and E (or m) is number of edges.
To build graph via adjacency list, we loop all edges which takes O(m) time.
We push and pop each vertex in the queue once, this takes O(n) to handle
all nodes.

- Space complexity:
O(n + m). Takes up to O(n) space to store visited nodes in set.
Also, a queue can take up to O(n) space.
The hashmap stores all edges, which requires O(m) space.
*/

var validPath = function(n, edges, source, destination) {
    // handle edge case
    if (source === destination) return true;

    // init adjacency list, where each vertex is assigned to
    // an empty array.
    const adjList = {};
    for (let i = 0; i < n; i++) adjList[i] = [];

    // loop edges, and create a graph via adjacency list.
    for (let [x, y] of edges) {
        // create bidirectional relationship between graph in each provided edge.
        adjList[x].push(y);
        adjList[y].push(x);
    }

    // define queue and visited set, with source's neighbors
    const queue = [...adjList[source]],
        visited = new Set([source, ...adjList[source]]);
    
    // loop while queue is not empty
    while (queue.length > 0) {
        // shift queue
        const vertex = queue.shift();
        // if vertex equals destination, then a path exists in graph.
        if (vertex === destination) return true;

        // otherwise, loop all of the vertex's neighbors via adjacency list
        const neighbors = adjList[vertex];
        for (let c of neighbors) {
            // if add child to visited set, 
            // and push child to queue
            if (!visited.has(c)) {
                queue.push(c);
                visited.add(c);
            }
        }
    }

    return false;
};