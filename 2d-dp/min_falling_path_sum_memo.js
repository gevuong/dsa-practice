/*
https://leetcode.com/problems/minimum-falling-path-sum/

Method: Top Down DP w/ Memoization

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
1. Create a 2d memo array of a size equivalent to input matrix.
2. Since we always start at the top row, we do not need to iterate row length.
    Instead, only iterate column length where row = 0.
3. For each column at row 0, we make a recursive call to traverse the its falling
    path. 
    Important: The dfs method will return the min falling path sum at the current
    row/col combination.
4. Within dfs method, we define 3 base cases. The base cases will return the 
    4a. If column is out of bounds, return a high value.
    4b. If we reached bottom of falling path, we simply return its value in matrix.
    4c. If computation was previously, then the sum should be stored in memo.
5. Traverse all 3 paths via dfs, and each dfs call returns the current sum for
    each path taken, starting from the bottom of the falling path (ie. last row),
    because we're doing dfs.
6. Find the min between the 3 paths and add that value to the value stored in
    the current row/col of matrix. Assign the sum to current row/col in memo.
7. Return the value stored in current row/col in memo.

# Complexity
- Time complexity:
O(n^2). There are n^2 cells in matrix, and therefore n^2 dp states.
Due to memoization, we only compute the result once if we encounter the same cell.

- Space complexity:
O(n^2). The 2D memo array occupies n^2 space. The recursive call stack is at most
O(n) space, which is the length of a falling path.
Therefore, O(n) + O(n^2) = O(n^2).
*/

var minFallingPathSum = function(matrix) {
    // define col length, min sum, memo (2d dp array of size matrix with null)
    const sideLen = matrix.length,
        memo = Array(sideLen).fill(null).map(() => Array(sideLen).fill(null));
    let minSum = Number.MAX_SAFE_INTEGER;

    // loop cols
    for (let j = 0; j < sideLen; j++) {
        // call dfs with matrix, row, col, col length, memo
        // to calculate and return the min sum of each column.
        const colMinSum = dfs(matrix, 0, j, sideLen, memo);
        // calc min sum
        minSum = Math.min(colMinSum, minSum);
    }

    return minSum;
};

// define dfs
function dfs(matrix, row, col, sideLen, memo) {
    // define base case.
    // if col is out of bounds, return largest number
    if (col < 0 || col >= sideLen) return Number.MAX_SAFE_INTEGER;

    // if we reached last row, return value in matrix.
    // We do not want to continue traversing falling path because
    // we will be out of bounds.
    if (row === sideLen - 1) return matrix[row][col];

    // if computation was done before from earlier subproblem,
    // return its memoized value.
    if (memo[row][col] !== null) return memo[row][col];

    // otherwise, define recurrence relation.
    // recursively explore all falling paths. If base cases are not satisfied,
    // then we have not reached end of falling path.
    // calc min falling path sum for each possible next step.
    const left = dfs(matrix, row+1, col-1, sideLen, memo);
    const bottom = dfs(matrix, row+1, col, sideLen, memo);
    const right = dfs(matrix, row+1, col+1, sideLen, memo);

    // calc min falling path sum and assign to memo at current row/col indices
    memo[row][col] = Math.min(left, bottom, right) + matrix[row][col];

    // return memo with current row/col indices
    return memo[row][col];
}