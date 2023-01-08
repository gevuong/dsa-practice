/*
# Problem
https://leetcode.com/problems/max-points-on-a-line/description/

# Method
Counting Sort (via Hashmap) + Math

# Intuition
- The way to determine if a point is on the same straight line as the base point
    is by calculating the slope and incrementing the slope count.
- For each base point, we want to calculate the slope at every remaining point.
- Calculate max points at the end of each slop count increment.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(n^2). We iterate all points, and for each point, we iterate remaining points
to calculate the slope.

- Space complexity:
O(n). Even though we create a new hashmap for each point, the max number of
slopes a hashmap can hold are n slopes.
*/

var maxPoints = function(points) {
    // define max points, points length
    const pointsLen = points.length;

    // handle edge case. we know that if there are only 2 points, 
    // there will always be a straight line between the two.
    if (pointsLen < 3) return pointsLen;

    // define max points to 2, and loop points.
    // there can be a minimum of 2 points that lie on the same straight line.
    let maxPoints = 2;
    for (let i = 0; i < pointsLen - 1; i++) {
        // define starting point, and reset slope count for each starting point.
        // We initialize slope count with Infinity in case we encounter
        // a run value of 0. We set to 1 to account for current point.
        const startPoint = points[i],
            slopeCount = { Infinity: 1 };

        // loop points, j = i+1. j does not need to start at 0 because we would
        // be comparing the same points again.
        for (let j = i+1; j < pointsLen; j++) {
            // define end point, rise, run, and current slope
            const endPoint = points[j],
                rise = endPoint[1] - startPoint[1],
                run = endPoint[0] - startPoint[0];
            let currSlope = Infinity;

            // If run equals 0, we want to increment slope count at Infinity.
            // This is because rise can either be a negative or positive value,
            // resulting in either -Infinity or Infinity even though they're
            // both on the same straight line.
            if (run === 0) slopeCount[currSlope]++;
            else {
                // update current slope
                currSlope = rise / run;
                // increment slope count or set count to 2. This is because
                // the starting point and current point amounts to 2 points
                // that lie on the same straight line.
                (currSlope in slopeCount) ? slopeCount[currSlope]++ : slopeCount[currSlope] = 2;
            }

            // calc max points on same straight line
            maxPoints = Math.max(maxPoints, slopeCount[currSlope]);
        }
    }
    
    return maxPoints;
};