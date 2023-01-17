/*
# Problem
https://leetcode.com/problems/number-of-provinces/description/

You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the 
ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.

# Method
BFS (via Queue) + Visited Hashset

# Intuition
When performing BFS on a root node, we push unvisited, directly connected
neighbors to the queue.
For each node we shift from queue, we have to mark it as visited so we don't
traverse an edge that leads back up to the root in tree.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(n^2).

- Space:
O(n + n) => O(n).
Worst case is the current node is connected to all remaining nodes.
This means that there will be n-1 nodes in queue.
Also, the visited set will store up to n vertices.
*/

var findCircleNum = function(isConnected) {
    // define visited set, number of provinces, queue
    const visited = new Set(),
        n = isConnected.length,
        queue = [];
    let numProvinces = 0;
    
    // loop rows in adjacency matrix
    for (let i = 0; i < n; i++) {
        // if row has not been visited, add new node as root node
        // to queue.
        //
        // Whenever a node has not been visited, and we need to
        // start bfs with a new node as the root node, then we are
        // essentially traversing a new province.
        if (!visited.has(i)) {
            queue.push(i);

            // traverse current node's directly connected neighbors via bfs.
            while (queue.length > 0) {
                // shift queue, and mark node as visited
                const curr = queue.shift();
                visited.add(curr);

                for (let j = 0; j < n; j++) {
                // traverse node's directly connected neighbors if node
                // has not been visited and is connected to current node.
                    if (isConnected[curr][j] === 1 && !visited.has(j)) {
                        queue.push(j);
                    }
                }
            }
            // at the end of each bfs, we are done traversing a
            // province, and can increment count.
            numProvinces++;

            // slight optimization, if visited size equals number of
            // vertices, then we have visited all vertices and do not
            // need to continue traversing the remaining vertices in
            // rows iteration.
            if (visited.size === n) return numProvinces;
        }
    }

    return numProvinces;
};