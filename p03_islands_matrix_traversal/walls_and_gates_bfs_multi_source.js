/*
# Problem
https://leetcode.com/problems/walls-and-gates/description/

# Method (Not as Intuitive imo - has a few tricks)
BFS w/ Multiple Sources (Queue) + Level Order Traversal

# Intuition
Push all gates (or sources) to queue. After pushing all sources (or gates) to
queue, perform level order traversal and expand outward, one level at a time.
Assign all empty rooms a level (or depth) count as we expand outward from gate.

# Approach
1. Gather all gates in queue.
2. Implement BFS on queue filled with gates.
3. Perform level order traversal. As we expand outward from each gate, we
    increment the level count and assign empty cells to the current level.

# Complexity
- Time complexity:
O(m x n). We first traverse all cells in matrix once to store all gates in queue.
We then call bfs once, and traverse all cells once more, and mark only empty cells,
and skip the cells we already visited.

- Space complexity:
O(m x n). Worst case is if all cells in matrix are gates. That means queue
will store at most m x n values.
*/

const GATE = 0,
    WALL = -1,
    EMPTY = 2147483647;

var wallsAndGates = function(rooms) {
    const rows = rooms.length,
        cols = rooms[0].length,
        queue = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // push all gates to queue
            if (rooms[i][j] === GATE) {
                queue.push([i, j]);
            }
        }
    }

    // perform bfs, level order traversal.
    bfs(rooms, queue, rows, cols);
};

function bfs(rooms, queue, rows, cols) {
    const dirs = [[-1, 0], [0, -1], [1, 0], [0, 1]];
    let currLevel = 0,
        levelSize = 0;

    // loop while queue is not empty
    while (queue.length > 0) {
        // define level size
        levelSize = queue.length;
        // loop level size
        while (levelSize > 0) {
            // shift queue
            const [r, c] = queue.shift();
            levelSize--;
            
            for (let [dx, dy] of dirs) {
                // calc current cell's neighbors
                const row = r + dx,
                    col = c + dy;
                // check if neighbors are within bounds, or if neighbors are a wall or gate. 
                // If so, we can skip since we only want to modify empty rooms.
                //
                // But, how do we avoid revisiting a previously empty cell?
                // Well, when we visit an empty cell for the first time, we set it to
                // a current distance count. This means the empty cell is no longer empty
                // and can be skipped. Also, that cell will contain min distance (or level)
                // because we visited the empty cell at a previous level.
                if (row < 0 || col < 0 || row >= rows || col >= cols || rooms[row][col] !== EMPTY) {
                    continue;
                }

                // assign empty neighbors to current level + 1, 
                // and push empty neighbors to queue to traverse it.
                rooms[row][col] = currLevel + 1;
                queue.push([row, col]);
            }

            // FYI, despite being more intuitive, the following code produces a TLC,
            // and passes 59/62 test cases.

            // // skip if cell is out of bounds, or is a wall.
            // // allow gate and empty rooms to proceed.
            // if (r < 0 || c < 0 || r >= rows || c >= cols || visited[r][c] || rooms[r][c] === WALL) {
            //     continue;
            // }

            // // set current room (empty or gate) to current distance, 
            // // and set visited cell to true.
            // rooms[r][c] = currLevel;
            // visited[r][c] = true;
            // // push four neighbors to queue.
            // for (let [dx, dy] of dirs) queue.push([r + dx, c + dy]);
        }

        // increment current level
        currLevel++;
    }   
}