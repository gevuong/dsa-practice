/*
# Problem
https://leetcode.com/problems/flood-fill/description/

# Method
BFS (via Queue)

# Intuition
If starting cell color is the same as the desired color, no changes need to be
made to image.

# Approach
1. Check if starting cell color equals desired color. If so, return image.
2. Define queue with starting coords, and loop while queue is not empty.
    2a. Shift queue, and check if coords are out of bounds, or if current cell
    does not equal starting color, skip, and stop traversing in in that direction.
    2b. Otherwise, assign current cell to desired color, and push its neighbors
        to queue.
3. Return image.

# Complexity
- Time:
O(n x m). Worst case is we traverse and update entire grid to desired color.

- Space:
O(min(n, m)). Worst case is queue will be filled up to min(n, m) cells.
Image explains why:
https://imgur.com/gallery/M58OKvB
*/

var floodFill = function(image, sr, sc, color) {
    // define row and col lengths, queue with sr and sc,
    // starting pixel color
    const rowLen = image.length,
        colLen = image[0].length,
        startColor = image[sr][sc];

    // handle edge case, if starting cell color is the same as desired color,
    // no changes need to be made to the image.
    if (startColor === color) return image;

    // loop while queue is not empty
    const queue = [[sr, sc]];
    while (queue.length > 0) {
        // shift queue
        const [r, c] = queue.shift();

        // handle edge cases (ie. out of bounds, if color at current cell is not
        // the start color). We only want to modify cells with the start color
        if (
            r < 0 || c < 0 || r >= rowLen || c >= colLen ||
            image[r][c] !== startColor
        ) continue;
        
        // otherwise, update cell with start color, to desired color
        image[r][c] = color;
        // push neighbors to queue
        queue.push([r-1, c], [r, c-1], [r+1, c], [r, c+1]);
    }

    return image;
};