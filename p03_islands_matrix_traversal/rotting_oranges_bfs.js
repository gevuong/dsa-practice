/*
# Problem
https://leetcode.com/problems/rotting-oranges/description/

# Method
BFS (w/ Multiple Sources) + HashSet + Level Order Traversal

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(n x m).

- Space complexity:
O(n x m). Worst case the grid is filled with rotting oranges. This means the
queue and visited set will have at most n x m oranges.
*/

const EMPTY = 0,
    FRESH = 1,
    ROTTEN = 2;

var orangesRotting = function(grid) {
    // define row/col lengths, queue, total oranges count
    const rows = grid.length,
        cols = grid[0].length,
        queue = [];
    let totalOranges = 0;

    // loop rows
    for (let i = 0; i < rows; i++) {
        // loop cols
        for (let j = 0; j < cols; j++) {
            // push rotting oranges to queue
            if (grid[i][j] === ROTTEN) {
                queue.push([i, j]);
                totalOranges++;
            } else if (grid[i][j] === FRESH) totalOranges++;
        }
    }

    // perform level order traversal via bfs with multiple sources
    return bfs(grid, queue, rows, cols, totalOranges);
};


// define bfs method, with queue, grid
function bfs(grid, queue, rows, cols, totalOranges) {
    // define level size, minutes count (or current level), 
    // array of 4 directions, visited set
    let minMinutes = 0,
        levelSize = 0;
    const visited = new Set();

    // loop while queue is not empty
    while (queue.length > 0) {
        // calc level size
        levelSize = queue.length;
        // loop while level size > 0
        while (levelSize > 0) {
            // shift queue and decrement level size
            const [r, c] = queue.shift();
            levelSize--;

            // if coords are out of bounds, an empty cell, or was visited, 
            // continue.
            // That means we are letting only non-visited, 
            // oranges (fresh or rotten) proceed.
            if (
                r < 0 || c < 0 || r >= rows || c >= cols || 
                visited.has(`${r},${c}`) || grid[r][c] === EMPTY
            ) continue;

            // otherwise, add coords to visited set,
            // set cell to ROTTEN (regardless if cell already contains a rotten orange)
            visited.add(`${r},${c}`);
            grid[r][c] = ROTTEN;
            // push neighbors to queue
            queue.push([r-1, c], [r, c-1], [r+1, c], [r, c+1]);
        }
        // after traversing a level, check if all oranges have been visited,
        // if so, then we can stop traversing and return min minutes.
        if (visited.size === totalOranges) return minMinutes;

        // increment minutes count (or current level)
        minMinutes++;
    }

    // 
    return totalOranges === visited.size ? minMinutes : -1;
}