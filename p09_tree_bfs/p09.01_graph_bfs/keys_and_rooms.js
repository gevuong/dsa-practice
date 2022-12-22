/*
# Problem
https://leetcode.com/problems/keys-and-rooms/description/

# Method
BFS (via Queue) + Visited (via Hashset)

# Intuition
Basically, we want n keys in set. This means we visited n rooms. Room 0
is already unlocked so we start at room 0, and add room 0 to visited set.

# Approach
1. Define visited Set with room 0, since we start at unlocked room 0.
1. Create queue with keys at room 0.
2. Loop while queue is not empty and shift queue per iteration.
3. If vertex is not visited, add vertex to visited set, and push its neighbors 
    to queue, and check if size of visited Set equals n.
4. If visited set size equals n, then we have visited all n rooms.

# Complexity
- Time complexity:
O(V+E), where V is number of vertices and E is number of keys. 
Even when you have already visited a neighbor (ie. room), you need to travel 
on the connecting edge to find out that you have already visited the neighbor.

- Space complexity:
O(V). Worst case is a single room stores all room keys. This means that queue
will store at most V keys.
*/

var canVisitAllRooms = function(rooms) {
    // define rooms length, visited set, and queue
    const roomsLen = rooms.length,
        queue = [...rooms[0]],
        visited = new Set([0]);
    
    // loop while queue is not empty
    while (queue.length > 0) {
        // shift queue
        const v = queue.shift();

        // if vertex is not visited AND vertex is not 0 (since that
        // is the room we start at, and is already unlocked), add vertex to set,
        // and add its neighbors to queue. 
        if (!visited.has(v)) {
            queue.push(...rooms[v]);
            visited.add(v);
            // if visited set size equals rooms length,
            // return true
            if (visited.size === roomsLen) return true;
        }
    }

    return false;
};