/*
# Problem
https://leetcode.com/problems/number-of-islands/description/

# Method
BFS (via Queue) + Visited Matrix (Optional)

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(n x m).

- Space complexity:
O(n x m) due to visited matrix.
- If we are allowed to modify input matrix, we can mark visited cells as '0', 
    thereby removing the need to have a visited matrix.
- This can reduce space to O(min(n, m)), where the max elements in queue is
    min(n, m).
- Image explaining why the space is the minimum between row and column of grid:
    https://imgur.com/gallery/M58OKvB
*/

var numIslands = function(grid) {
    // define row/col lengths, visited grid, num islands count
    const rowLen = grid.length,
        colLen = grid[0].length,
        dirs = [[-1, 0], [0, -1], [1, 0], [0, 1]];
        visited = Array(rowLen).fill(0).map(() => Array(colLen).fill(false));
    let numIslands = 0;

    // loop rows
    for (let i = 0; i < rowLen; i++) {
        // loop cols
        for (let j = 0; j < colLen; j++) {
            // if cell equals 1 and has not been visited, 
            // we can increment count and traverse island.
            if (grid[i][j] === '1' && !visited[i][j]) {
                numIslands++;
                bfs(grid, visited, i, j, rowLen, colLen, dirs);
            }
        }
    }
    
    return numIslands;
};

function bfs(grid, visited, i, j, rowLen, colLen, dirs) {
    // define queue with current row, col
    const queue = [[i, j]];

    // loop while queue is not empty
    while (queue.length > 0) {
        // shift queue
        const [row, col] = queue.shift();

        // if row/col is out of bounds, cell has been visited,
        // or grid cell equals '0', stop traversing.
        if (
            row < 0 || col < 0 || row >= rowLen || col >= colLen ||
            visited[row][col] || grid[row][col] === '0'
        ) continue;

        // otherwise, mark cell as visited,
        visited[row][col] = true;
        
        // and traverse the current cell's neighbors.
        for (let [dx, dy] of dirs) queue.push([row + dx, col + dy]);    
    }
}