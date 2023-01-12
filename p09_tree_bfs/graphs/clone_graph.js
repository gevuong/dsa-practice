/*
# Problem
https://leetcode.com/problems/clone-graph/description/

# Method
BFS (via Queue) + Hashmap (Map)

# Intuition
- Using an Object to store objects as keys will convert the object to a string,
'object Object', and then use that as the key, which can cause unforeseen problems.
- To reliably store objects in a map, it is best to use a Map.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(V + E). 

- Space:
O(V). We store up to V vertices.
*/

var cloneGraph = function(node) {
    // define edge case
    if (node === null) return node;

    // define hashmap and assign original to copy of starting
    // node, and queue with starting node.
    const seen = new Map([[node, new Node(node.val)]]),
        queue = [node];
    let i = 0;

    // loop while queue is not empty
    while (queue.length > i) {
        // shift queue, and increment to next index
        const orig = queue[i++];

        // loop neighbors
        for (let n of orig.neighbors) {
            // if node is not seen, create copy of neighbor
            // and assign to seen, and push original 
            // neighbor to queue.
            if (!(seen.has(n))) {
                // assign original neighbor to copied of neighbor in map
                seen.set(n, new Node(n.val));
                // push original neighbor to queue. we only want
                // to traverse original nodes.
                queue.push(n);
            }

            // add copy of neighbor to parent's neighbors list.
            seen.get(orig).neighbors.push(seen.get(n));
        }
    }

    return seen.get(node);
};

/*
# Method
BFS (via Queue) + Hashmap (Object)
*/

var cloneGraph = function(node) {
    // define edge case
    if (node === null) return node;

    // define seen hashmap with copy of starting
    // node, and queue with starting node
    const seen = {},
        queue = [node];
    seen[node.val] = new Node(node.val);
    let i = 0;

    // loop while queue is not empty
    while (queue.length > i) {
        // shift queue, and increment to next index
        const orig = queue[i];
        i++;

        // loop neighbors
        for (let n of orig.neighbors) {
            // if node is not seen, create copy of neighbor
            // and assign to seen, and push original 
            // neighbor to queue.
            if (!(n.val in seen)) {
                // create copy of neighbor and assign to seen
                seen[n.val] = new Node(n.val);
                // push original neighbor to queue
                queue.push(n);
            }

            // add copy of neighbor to parent's neighbors list.
            seen[orig.val].neighbors.push(seen[n.val]);
        }
    }

    return seen[node.val];
};