/*
# Problem
https://leetcode.com/problems/number-of-distinct-islands/description/

Return the number of distinct islands.

# Method
BFS (via Queue) + Hashset (to store path signature)

# Intuition
- Create a path signature for each direction we traverse.
- It is important to record where we backtracked when we encounter an edge case,
    like water, or if we're out of bounds.
- Use a set to store path signature. If there are islands considered the same,
    the set will only store unique paths. This means the set size represents
    the number of distinct islands.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(m x n).
Every cell is visited at most once.

- Space:
O(m x n).
Worst case is if entire grid is an island. This means that the array that 
hold the path signature will have m x n characters.
*/

var numDistinctIslands = function(grid) {
    // define row and col lengths, island set
    const rowLen = grid.length,
        colLen = grid[0].length,
        islandSet = new Set();

    // loop rows
    for (let i = 0; i < rowLen; i++) {
        // loop cols
        for (let j = 0; j < colLen; j++) {
            // if cell equals 1, traverse island via bfs
            if (grid[i][j] === 1) {
                // push direction to island set
                const dir = bfs(grid, i, j, rowLen, colLen);
                islandSet.add(dir);
            }
        }
    }

    return islandSet.size;
};


// define bfs
function bfs(grid, i, j, rowLen, colLen) {
    // define queue with 'S' - start, and island path signature.
    const queue = [[i, j, 'S']],
        islandPath = [];

    // loop while queue is not empty
    while (queue.length > 0) {
        // shift queue
        const [r, c, path] = queue.shift();

        // handle edge cases (ie. out of bounds, cell is water)
        // we only want to traverse on land.
        if (r < 0 || c < 0 || r >= rowLen || c >= colLen ||
            grid[r][c] === 0) 
        {
            // add 'B' to island path to signify that we are traversing
            // back to former cell. In other words, record where we backtracked.
            // 
            // Not doing this will result in islands falsely labeled
            // as not-distinct when in fact the are.
            //
            // This is a good example. Without pushing 'B' to island path,
            // both distinct islands will have a path signature of 'SRDR'.
            // [[1,1,0],
            //  [0,1,1],
            //  [0,0,0],
            //  [1,1,1],
            //  [0,1,0]]
            islandPath.push('B');
            continue;
        } 

        // otherwise, push path to island path,
        // and set cell to 0 (water) to mark as visited
        islandPath.push(path);
        grid[r][c] = 0;

        // push neighbors with 'L', 'R', 'U', 'D' chars to represent
        // directions (ie. L - left, R - right, U - up, D - down).
        queue.push(
            [r-1, c, 'U'], [r, c-1, 'L'],
            [r+1, c, 'D'], [r, c+1, 'R'],
        );
    }

    return islandPath.join('');
}