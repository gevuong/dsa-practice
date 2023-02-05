/*
# Problem
https://leetcode.com/problems/spiral-matrix/description/

Given an m x n matrix, return all elements of the matrix in spiral order.

# Method
Matrix Traversal + Set Boundaries (via Offset) + While Loops

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
- Loop until we have visited n x m cells.
- Create a nested while loop for each direction we need to traverse.
    - One to traverse from top left to top right.
    - One to traverse from top right to bottom right.
    - One to traverse from bottom right to bottom left.
    - One to traverse from bottom left to top left.
- Keep track of an offset to add/subtract to the row and column boundaries.
    After each spiral, the row/col boundaries will move towards the center.

# Complexity
- Time:
O(n x m). We visit each cell once.

- Space:
O(1), since we are not using any other data structures aside from the output
array, and we don't include the output array in space analyses.
*/

var spiralOrder = function(matrix) {
    // define output array, row and col lengths,
    // and total number of elements
    const res = [], rowLen = matrix.length,
        colLen = matrix[0].length,
        totalCells = rowLen * colLen;

    // define cell count, row and col indices, and offset
    let cellCount = 0,
        row = 0, col = 0, offset = 0;

    // loop until we visited all cells once
    while (cellCount < totalCells) {
        // move from top left to top right until we exceed column's
        // upper boundary.
        while (cellCount < totalCells && col < colLen - offset) {
            // push num to output, and increment column and cell count.
            res.push(matrix[row][col]);
            col++;
            cellCount++;
        }

        // since we exceeded column's upper boundary upon exiting loop,
        // decrement col. Also, increment row so we don't visit the
        // same cell we last visited.
        col--;
        row++;

        // move downwards, from top right to bottom right, until
        // we exceed row's upper boundary + offset.
        while (cellCount < totalCells && row < rowLen - offset) {
            // push num to output, and increment row and cell count.
            res.push(matrix[row][col]);
            row++;
            cellCount++;
        }

        // since we exceeded row's upper boundary upon exiting loop,
        // decrement row. Also decrement col so we don't visit
        // the same cell we last visited.
        row--;
        col--;

        // move from bottom right to bottom left, until we exceed
        // column's lower boundary + offset.
        while (cellCount < totalCells && col >= offset) {
            // push visited num to output, decrement column,
            // and increment cell count.
            res.push(matrix[row][col]);
            col--;
            cellCount++;
        }

        // since we exceeded column's lower boundary upon exiting
        // loop, increment col. Also, decrement row so we don't
        // visit the same cell we last visited.
        // Also, increment offset to move the row and column
        // boundaries toward the center.
        col++;
        row--;
        offset++;

        // move from bottom left to top left until we exceed
        // row's lower boundary + offset.
        while (cellCount < totalCells && row >= offset) {
            // push visited num to output, decrement row,
            // and increment cell count.
            res.push(matrix[row][col]);
            row--;
            cellCount++;
        }

        // now that we've reached the end of the first spiral,
        // increment row and col to prevent visiting the same
        // spiral we last visited.
        row++
        col++
    }

    return res;
};