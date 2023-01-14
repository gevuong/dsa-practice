/*
# Problem
https://leetcode.com/problems/the-maze/description/

# Method
BFS (via Queue)

# Intuition
- Use a queue to traverse maze.
- To travel in a particular direction, we keep adding a particular direction
    (left, right, bottom, top) till we hit a wall or a boundary. 
    For a particular start position, we do this process for all the four 
    possible directions.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(m x n). Worst case is if maze is literally a single row or column. You would
basically traverse all cells in that single row or column.

- Space:
O(?). Solution says worst case is m x n elements can be stored in queue.
Hmm, trying to think of an example when this is true..
*/

var hasPath = function(maze, start, destination) {
    // define row and col lengths, queue with start coords,
    // directions, target row and col, and wall.
    const rowLen = maze.length,
        colLen = maze[0].length,
        WALL = 1,
        [targetRow, targetCol] = destination,
        queue = [start],
        dirs = [[-1, 0], [0, -1], [1, 0], [0, 1]];

    // loop while queue is not empty
    while (queue.length > 0) {
        // shift queue and set current cell to a 'visited' value.
        // Cannot mark cell as a wall because we may have to traverse
        // along that same route but from a different direction.
        const [r, c] = queue.shift();
        maze[r][c] = 2;

        // if coords equals destination, return true
        if (r === targetRow && c === targetCol) return true;
        
        // loop directions
        for (const [dr, dc] of dirs) {
            // calc coords of neighbor
            let [row, col] = [r + dr, c + dc];

            // otherwise, while coords are within bounds and is not a wall,
            // continue traversing in that direction.
            while (
                row >= 0 && col >= 0 && row < rowLen && col < colLen &&
                maze[row][col] !== WALL
            ) {
                row += dr;
                col += dc;
            }

            // when out of bounds or wall is reached, push 
            // row and col before ball went out of bounds or hit wall,
            // to queue
            const [validRow, validCol] = [row - dr, col - dc];

            // if row has been visited, skip.
            // Otherwise, push non-visited, empty space to queue to traverse.
            if (maze[validRow][validCol] === 2) continue;
            queue.push([validRow, validCol]);
        }
    }

    return false;    
};

/*
# Method
BFS (via Queue) + Visited Hashset

# Complexity
- Time:
O(m x n). Worst case is if maze is literally a single row or column. You would
basically traverse all cells in that single row or column.

- Space:
O(m x n). To store visited cells. Worst case is if maze is a 2x2 square with no
walls within maze. That means we would traverse and store all 4 cells as visited.
*/

var hasPath = function(maze, start, destination) {
    // define row and col lengths, queue with start coords,
    // directions
    const rowLen = maze.length,
        colLen = maze[0].length,
        WALL = 1,
        [targetRow, targetCol] = destination,
        queue = [start],
        dirs = [[-1, 0], [0, -1], [1, 0], [0, 1]]
        seen = new Set();

    // loop while queue is not empty
    while (queue.length > 0) {
        // shift queue and set current cell to a wall,
        // to mark as 'seen'.
        const [r, c] = queue.shift();
        seen.add(`${r} ${c}`);

        // if coords equals destination, return true
        if (r === targetRow && c === targetCol) return true;
        
        // loop directions
        for (const [dr, dc] of dirs) {
            // calc coords of neighbor
            let [row, col] = [r + dr, c + dc];

            // otherwise, while coords are within bounds and is not a wall,
            // continue traversing in that direction.
            while (
                row >= 0 && col >= 0 && row < rowLen && col < colLen &&
                maze[row][col] !== WALL
            ) {
                row += dr;
                col += dc;
            }

            // when out of bounds or wall is reached, revert 
            // row and col to before ball went out of bounds or hit wall,
            // check if reverted coords have been seen.
            // if not, push to queue
            const [prevRow, prevCol] = [row - dr, col - dc];
            if (!seen.has(`${prevRow} ${prevCol}`)) {
                queue.push([prevRow, prevCol]);
            }
        }
    }

    return false;    
};