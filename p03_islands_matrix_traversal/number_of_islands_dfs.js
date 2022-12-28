/*
# Problem
https://leetcode.com/problems/number-of-islands/description/

# Method
Recursive DFS + Visited Matrix (Optional)

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(n x m). We visit each cell at most once.

- Space complexity:
O(n x m). Space is used to store visited matrix. 

Although we don't necessarily need a visited matrix, and can mark the visited cells
to '0', we can still occupy O(n x m) in the worst case. If the entire matrix
is an island, the recursive call stack would require O(n x m) space.
*/

var numIslands = function(grid) {
    // define row/col lengths, visited grid, num islands count
    const rowLen = grid.length,
        colLen = grid[0].length,
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
                dfs(grid, visited, i, j, rowLen, colLen);
            }
        }
    }
    
    return numIslands;
};

// define dfs, with i, j, row/col lengths, visited, grid
function dfs(grid, visited, i, j, rowLen, colLen) {
    // stop traversing island if row/col are out of bounds, 
    // cell has been visited, or grid cell equals 0.
    if (i < 0 || j < 0 || i >= rowLen || j >= colLen || visited[i][j] || grid[i][j] === '0') return;
    
    // otherwise, update visited grid
    visited[i][j] = true;

    // traverse in 4 directions from current cell
    dfs(grid, visited, i-1, j, rowLen, colLen);
    dfs(grid, visited, i, j-1, rowLen, colLen);
    dfs(grid, visited, i+1, j, rowLen, colLen);
    dfs(grid, visited, i, j+1, rowLen, colLen);
}