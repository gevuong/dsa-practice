/*
# Problem
https://leetcode.com/problems/number-of-closed-islands/description/

# Method
BFS (via Queue) + Visited Matrix (Optional)

# Intuition
Current logic makes the most sense to me, and passes all test cases in LC. 
However, if I removed visited array from code, I get TLE.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(n x m).

- Space:
O(n x m). This is due to visited matrix.
*/

const LAND = 0,
    WATER = 1;

var closedIsland = function(grid) {
    // define row and col lengths, number of closed islands
    const rowLen = grid.length,
        colLen = grid[0].length;
    const visited = Array(rowLen).fill(false).map(() => Array(colLen).fill(false));
    let numClosed = 0;
    // loop rows, ignore row and col indices on the edge of grid
    for (let i = 1; i < rowLen - 1; i++) {
        // loop cols
        for (let j = 1; j < colLen - 1; j++) {
            // if cell is LAND, traverse island
            if (grid[i][j] === LAND && !visited[i][j]) {
                // if bfs returns true, increment number of close islands
                if (bfs(grid, i, j, rowLen, colLen, visited)) numClosed++;
            }
        }
    }
    
    return numClosed;
};

// define bfs method
function bfs(grid, i, j, rowLen, colLen, visited) {
    // define isClosed boolean to true
    let isClosed = true;

    // define queue and loop while queue is not empty
    const queue = [[i, j]];
    while (queue.length > 0) {
        // shift queue
        const [r, c] = queue.shift();

        // if coords are out of bounds, cell was visited or equals 1, 
        // stop traversing in that direction.
        if (r < 0 || c < 0 || r >= rowLen || c >= colLen || visited[r][c] || grid[r][c] === 1) {
            continue;
        }

        // if cell equals 0 and is on the edge of grid, set isClosed to false
        // and stop traversing in that direction.
        if (grid[r][c] === 0 && (r === 0 || c === 0 || r === rowLen - 1 || c === colLen - 1)) {
            isClosed = false;
            continue;
        }

        // mark cell a visited, and push its neighbors to queue.
        visited[r][c] = true;        
        queue.push([r-1, c], [r, c-1], [r+1, c], [r, c+1]);
    }

    return isClosed;
}


/*
# Method
BFS (via Queue)

# Approach
If I simply remove visited array from the above solution, I will get a TLE.
Therefore, I have to handle the edge cases prior to adding neighbors to queue
to improve performance.

# Complexity
- Time:
O(n x m).

- Space:
O(min(n, m)). Space is reduced because we no longer using a visited matrix.
*/

// const LAND = 0,
//     WATER = 1;

var closedIsland = function(grid) {
    // define row and col lengths, number of closed islands
    const rowLen = grid.length,
        colLen = grid[0].length,
        dirs = [[-1, 0], [0, -1], [1, 0], [0, 1]];

    let numClosed = 0;
    // loop rows, ignore row and col indices on the edge of grid
    for (let i = 1; i < rowLen - 1; i++) {
        // loop cols
        for (let j = 1; j < colLen - 1; j++) {
            // if cell is LAND, traverse island
            if (grid[i][j] === LAND) {
                // if bfs returns true, increment number of close islands
                if (bfs(grid, i, j, rowLen, colLen, dirs)) numClosed++;
            }
        }
    }
    
    return numClosed;
};

// define bfs method
function bfs(grid, i, j, rowLen, colLen, dirs) {
    // define isClosed boolean to true
    let isClosed = true;

    // define queue and loop while queue is not empty
    const queue = [[i, j]];
    while (queue.length > 0) {
        // shift queue, and set current cell to water to mark as visited.
        // That way, when we revisit cell and it's 1, we will skip it.
        const [r, c] = queue.shift();
        grid[r][c] = 1;

        // loop directions, and add each direction to current cell
        for (const [dx, dy] of dirs) {
            const [row, col] = [r + dx, c + dy];

            // if neighbor coords are out of bounds, 
            // or cell equals 1, stop traversing in that direction.
            if (
                row < 0 || col < 0 || row >= rowLen || col >= colLen ||
                grid[row][col] === 1
            ) continue;

            // if cell equals 0 and is on the edge of grid, set isClosed to false
            // and stop traversing in that direction.
            if (
                grid[row][col] === 0 &&
                (row === 0 || col === 0 || row === rowLen - 1 || col === colLen - 1)
            ) {
                isClosed = false;
                continue;
            }

            // push valid neighbor that is part of the close island we're traversing
            // (ie. neighbor that within bounds, is a land, and is not on the edge).
            queue.push([row, col])
        }
    }

    return isClosed;
}