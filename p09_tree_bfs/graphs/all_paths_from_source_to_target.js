/*
# Problem
https://leetcode.com/problems/all-paths-from-source-to-target/description/

# Method
BFS (via Queue)

# Intuition
Use a queue to store current node and current path. Traverse graph by adding
all of the current node's neighbors and updated paths to queue.
If the target is reached, we can add path to output.

# Approach
- Create a queue to store an array containing the current node value, and the 
current path array, so something like queue = [[currNode, currPath]].
- If current node equals target, push current path to output array.

# Complexity
- Time complexity:
O(n x 2^n).
- For each new node, the number of paths can double. This means that we can 
    have up to 2^n paths, where n is the number of nodes in graph.
- In other words, with each new node, new paths can be created by preceding all
    previous paths with the newly added node.
- For each new path, it can take up to O(n) time to copy the path to output.

- Space complexity:
O(n x 2^n).
- Worst case is if the source node is a neighbor to all remaining nodes. That
    means that the queue can hold up to n-1 nodes.
- Copying the array can take up to O(n) space.
- There can be up to 2^n paths.
*/

var allPathsSourceTarget = function(graph) {
    const paths = [],
        target = graph.length - 1,
        queue = [[0, [0]]];

    while (queue.length > 0) {
        // shift queue
        const [currNode, currPath] = queue.shift();
        // if shifted node equals target, push
        // path to target, and stop traversing current path.
        if (currNode === target) {
            paths.push([...currPath]);
            continue;
        }
        
        // otherwise, loop current nodes neighbors
        for (let i = 0; i < graph[currNode].length; i++) {
            const neighbor = graph[currNode][i];
            // make copy of current path
            copied = currPath.slice();
            // push each neighbor to current path
            copied.push(neighbor);
            // push path to queue
            queue.push([neighbor, copied]);
        }
    }

    return paths;
};