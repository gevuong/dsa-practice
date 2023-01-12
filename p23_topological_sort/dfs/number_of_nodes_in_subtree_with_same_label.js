/*
# Problem
https://leetcode.com/problems/number-of-nodes-in-the-sub-tree-with-the-same-label/description/

# Method
Recursive DFS = Adjacency List (via Hashmap)

# Intuition
The algorithm is very similar to min time to collect apples, which is another
graph problem that relies on creating an adjacency list, and indexing an array
to determine if a node has an apple, but in this case, the same label.

# Approach
1. Create adjacency list with n vertices.
2. Populate adjacency list with undirected edges.
3. Define dfs method with current and parent nodes as parameters.

    3a. Define a total label count, and increment count of current node's label.
    3b. Loop current node's neighbors.

        4a. If neighbor equals parent, skip. We don't want to traverse graph in a loop.
        4b. Otherwise, traverse subtree of neighbor via dfs call, where the
            neighbor becomes the current node, and the current node becomes the
            parent, so to speak.
        4c. The dfs method returns the label count of the subtree, and we want
            to add all the label counts of the subtree, to the total label count.

    3c. After looping all children of current node, assign the current node's
        index in the output array, to the updated total label count of current node.
    3d. Return updated total label count.

4. Call dfs with the root node, and an arbitrary value for the parent node.
5. Return output array.

# Complexity
- Time:
O(n-1 + (26n)) => O(n), where n is number of nodes in graph.

- n-1 comes frm iterating n-1 edges. From dfs call, we only visit each node in
    graph at most once, which means we only visit a node's edge once.

- For each neighbor/child, we iterate labels stored in neighbor count hashmap.
    There can be at most 26 labels in the hashmap. So worst case would be O(26)
    per child. This equates to O(26n) time.

- Space:
O(n + 26n), where n is number of node in graph.

- The adjacency list stores n nodes.
- The recursive stack worst case is O(n) space. And for each neighbor,
    we are creating a hashmap count, which can take up to O(26)
    size worst case, since there are only lowercase English letters in labels.
    Overall, this can take up to O(26n) space.
*/

var countSubTrees = function(n, edges, labels) {
    // define and populate adjacency list
    const adjList = {};
    for (let i = 0; i < n; i++) adjList[i] = [];
    for (const [v1, v2] of edges) {
        adjList[v1].push(v2);
        adjList[v2].push(v1);
    }

    // define output array and char count
    const res = Array(n).fill(0);

    // dfs method with current and parent as params
    const dfs = (curr, parent) => {
        // initialize a new label count for each node we traverse,
        // and increment label count linked to current node.
        const labelCount = {};
        labelCount[labels[curr]] = 1;

        // loop neighbors of current node
        for (const neighbor of adjList[curr]) {
            // to prevent a cyclic traversal, skip if parent equals
            // neighbor. We don't want to traverse back up to parent.
            if (neighbor === parent) continue;

            // otherwise, traverse neighbor's subtree, and set current
            // node as the new parent.
            // This returns the label count of the neighbor's subtree.
            const neighborCount = dfs(neighbor, curr);
            
            // add frequency of labels from neighbor's subtree to the
            // overall label count
            for (let k in neighborCount) {
                k in labelCount ? labelCount[k] += neighborCount[k]
                : labelCount[k] = neighborCount[k];
            }
        }

        // set total label count of current node's label to the result
        // array, and return label count.
        res[curr] = labelCount[labels[curr]]; 
        return labelCount;
    }

    // call dfs with vertex 0, and an arbitrary parent vertex value 
    dfs(0, -1);
    return res;
};