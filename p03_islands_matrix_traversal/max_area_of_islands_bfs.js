/*
# Problem
https://leetcode.com/problems/max-area-of-island/description/

# Method
BFS (via Queue) + Visited Matrix (Optional)

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
1. If cell is land, and has not been visited, then calculate area of island
    via bfs.
2. BFS will return the area of island, and compare with max area.
3. Within BFS, check if cell is out of bounds, or has been visited, or is water,
    if so, skip.
    3a. Otherwise, mark cell as visited, increment area, and push cell's
        neighbors to queue.

# Complexity
- Time:
O(n x m). We traverse every cell once.

- Space:
O(min(n, m)). Worst case is queue will be filled up to min(n, m) cells.
Image explains why:
https://imgur.com/gallery/M58OKvB
*/

const LAND = 1;
    WATER = 0;

var maxAreaOfIsland = function(grid) {
    // define row and col lengths, max area, visited grid
    const rowLen = grid.length,
        colLen = grid[0].length
        visited = Array(rowLen).fill(0).map(() => Array(colLen).fill(false));
    let maxArea = 0;

    // loop rows
    for (let i = 0; i < rowLen; i++) {
        // loop cols
        for (let j = 0; j < colLen; j++) {
            // if cell is LAND, traverse island via bfs
            if (grid[i][j] === LAND && !visited[i][j]) {
                // calc max area
                const area = bfs(grid, i, j, rowLen, colLen, visited);
                maxArea = Math.max(maxArea, area);
            }
        }
    }

    return maxArea;
};

// define bfs method
function bfs(grid, i, j, rowLen, colLen, visited) {
    // define area, queue with current row/col
    let area = 0;
    const queue = [[i, j]];

    // loop while queue is not empty
    while (queue.length > 0) {
        // shift queue
        const [r, c] = queue.shift();
        
        // handle edge cases
        if (
            r < 0 || c < 0 || r >= rowLen || c >= colLen ||
            visited[r][c] || grid[r][c] === WATER
        ) continue;
        
        // otherwise, mark cell as visited, increment area
        // and push its neighbors to queue
        visited[r][c] = true;
        area++;
        queue.push([r-1, c], [r, c-1], [r+1, c], [r, c+1]);
    }

    return area;
}

/*
# Method
BFS (via Queue)
*/
// const LAND = 1;
//     WATER = 0;

var maxAreaOfIsland = function(grid) {
    // define row and col lengths, max area
    const rowLen = grid.length,
        colLen = grid[0].length;
    let maxArea = 0;

    // loop rows
    for (let i = 0; i < rowLen; i++) {
        // loop cols
        for (let j = 0; j < colLen; j++) {
            // if cell is LAND, traverse island via bfs
            if (grid[i][j] === LAND) {
                // calc max area
                const area = bfs(grid, i, j, rowLen, colLen);
                maxArea = Math.max(maxArea, area);
            }
        }
    }

    return maxArea;
};

// define bfs method
function bfs(grid, i, j, rowLen, colLen) {
    // define area, queue with current row/col
    let area = 0;
    const queue = [[i, j]];

    // loop while queue is not empty
    while (queue.length > 0) {
        // shift queue
        const [r, c] = queue.shift();
        
        // handle edge cases
        if (
            r < 0 || c < 0 || r >= rowLen || c >= colLen ||
            grid[r][c] === WATER
        ) continue;
        
        // otherwise, set cell to 0, increment area
        // and push its neighbors to queue
        grid[r][c] = 0;
        area++;
        queue.push([r-1, c], [r, c-1], [r+1, c], [r, c+1]);
    }

    return area;
}