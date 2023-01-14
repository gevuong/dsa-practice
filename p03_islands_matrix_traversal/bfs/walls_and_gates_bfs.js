/*
# Problem
https://leetcode.com/problems/walls-and-gates/description/

# Method (More intuitive imo, but less time efficient)
BFS (For Each Gate) + Level Order Traversal + HashSet

# Intuition
1. Implement BFS as soon as we visit a gate. 
2. Perform level order traversal and expand outward, one level at a time.
3. Assign all empty rooms a level (or depth) count as we expand outward from gate.

# Approach
1. Loop matrix until we visit a gate.
2. Implement BFS with current row/col.
3. Perform level order traversal. As we expand outward from each gate, we
    increment the level count and assign empty cells to the current level.
4. Repeat steps for each gate we encounter in matrix.

# Complexity
- Time complexity:
O(m x n x k), where k is the number of gates in matrix.
For each gate k, we call BFS, which can take O(m x n) time.

- Space complexity:
O(m x n). Worst case is if there is one gate in matrix, and the rest of the cells
are empty. That means the visited set will have up to (m x n) - 1 elements.

I think the queue can store up to a max of O(min(m, n)) elements due to this
illustration:
https://imgur.com/gallery/M58OKvB
*/

var wallsAndGates = function(rooms) {
    const GATE = 0,
        rows = rooms.length,
        cols = rooms[0].length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (rooms[i][j] === GATE) {
                // call bfs for each gate.
                // traverse matrix, one gate at a time.
                bfs(rooms, i, j, rows, cols);
            }
        }
    }
};

function bfs(rooms, i, j, rows, cols) {
    // define visited set (do not need a visited matrix),
    // queue, level size, current level, WALL.
    const WALL = -1,
        visited = new Set(),
        queue = [[i, j]];
    let levelSize = 0,
        currLevel = 0;

    // loop while queue is not empty
    while (queue.length > 0) {
        // calc number of cells at current level
        levelSize = queue.length;

        // loop until we traversed all cells at current level
        while (levelSize > 0) {
            // shift queue, decrement level size
            const [r, c] = queue.shift();
            levelSize--;

            // if row/col is out of bounds, room has already been visited, is a wall,
            // OR if current room has already been assigned a level from previous bfs call
            // and it's smaller than current level, we can skip current cell.
            if (r < 0 || c < 0 || r >= rows || c >= cols ||
                visited.has(`${r},${c}`) ||
                rooms[r][c] === WALL ||
                rooms[r][c] < currLevel
            ) continue;

            // otherwise, add cell to visited, 
            // and update empty room value to current level
            visited.add(`${r},${c}`);
            rooms[r][c] = currLevel;

            // push neighbors to queue
            queue.push([r-1, c], [r, c-1], [r+1, c], [r, c+1]);
        }

        // increment to next level in level order traversal.
        currLevel++;
    }
}