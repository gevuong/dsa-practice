/*
# Problem
https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/description/

Return the minimum time in seconds you have to spend to collect all apples in 
the tree, starting at vertex 0 and coming back to this vertex.

# Method
Recursive DFS + Adjacency List

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
1. Create an adjacency list of n nodes.
2. Populate adjacency list with undirected edges.
3. Define dfs method, with current and parent nodes as parameters.

    3a. Initialize a total time of 0.
    3b. Loop current node's neighbors.
        3ba. If neighbor equals parent, skip because we don't want to traverse
            a cyclic loop.
        3bb. Otherwise, call dfs, where the neighbor becomes the current node,
            and the current node becomes the parent.
        3bc. The dfs call returns the time it takes to collect apples at the
            current (neighbor) subtree.
        3bd. If the neighbor time is greater than 0, then we know that there
            is at least one node in the subtree that has an apple. This means
            we have to add 2 to neighbor time to account for traversing back up
            to the root (or current node) of the subtree we're on.
            We will have to keep doing this for each new subtree we come across
            on our way back up to the root (vertex 0) of the tree.
        3be. The other time we want to add 2 to neighbor time is if the 
            neighbor (of the current node) has an apple. If so, we have to get
            it, which will require 2 units of time, so we add 2 to neighbor time.
        3bf. Add neighbor time to total time.

    3c. After all children are traversed, return total time.

4. Call dfs with vertex 0 as current node, and an arbitrary value for parent node.

# Complexity
- Time:
O(n + n-1 + n) => O(n).
- Takes O(n) to initialize adjacency list.
- Takes O(n-1) to loop edges to populate adjacency list.
- Takes O(n) to traverse all nodes in graph. We visit each node at most once.

- Space:
O(n + n) => O(n). 
- Worst case is if recursive call stack has n elements.
- Adjacency list takes n vertices.

*/

var minTime = function(n, edges, hasApple) {
    // define adjacency list, and populate with vertices
    // and undirected edges. - TC O(2n).
    const adjList = {};
    for (let i = 0; i < n; i++) adjList[i] = [];
    for (const [v1, v2] of edges) {
        adjList[v1].push(v2);
        adjList[v2].push(v1);
    }

    // define and dfs method with current and parent as params
    const dfs = (curr, parent) => {
        // initialize a new total time for each node we traverse. This value
        // represents the total time needed to get all apples from current
        // subtree, and gets returned at end of dfs method and used in the
        // other dfs calls as we traverse back up in the recursive call stack.
        let totalTime = 0;

        // loop current vertex's neighbors
        for (const neighbor of adjList[curr]) {
            // To prevent traversing back and forth on the same undirected
            // edge, if neighbor and parent vertices are equal, skip.
            if (neighbor === parent) continue;

            // otherwise, traverse to new neighbor's subtree by
            // calling dfs with the current vertex as the parent, 
            // and the neighbor as the current vertex.
            //
            // If the neighbor's subtree has apples, child time
            // will return the time it takes to collect all apples in
            // the neighbor's subtree. If there are no apples in   
            // neighbor's subtree, child time will be 0.
            let neighborTime = dfs(neighbor, curr);

            // Now, if neighbor has an apple, then we need to go get it, which
            // takes 2 seconds, 1 to travel there, and 1 to travel back.
            //
            // The other option is any nodes in the neighbor's subtree has
            // any apples, we need to add 2 to account for traversing back up 
            // one level, to the root (or current node) of the subtree.
            // 
            // We will have to continue doing this for each node we encounter
            // on our way back up to the root (vertex 0) of the tree.
            if (neighborTime > 0 || hasApple[neighbor]) neighborTime += 2;
            totalTime += neighborTime;
        }

        return totalTime;
    }

    // vertex 0 has no parent so set to arbitrary value
    return dfs(0, -1);
};