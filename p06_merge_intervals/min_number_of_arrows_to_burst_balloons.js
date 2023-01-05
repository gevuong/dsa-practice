/*
# Problem
https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/description/

# Method
Merge Intervals

# Intuition
- At first read through, the problem reminded of a merge interval type problem.
- Usually with merge interval problems, it's best to sort the intervals, either
by start or end values.
- Once sorted, it's important to keep track of the min end value. This is because
    when we iterate the next interval, we want to see if the starting value
    is less than or equal to the min end value. If so, then there is an overlap,
    and we can still burst current ballon with same arrow.

# Approach
1. Handle edge case if points length < 2.
2. Sort points by starting value.
3. Initialize min end value to be the first end value in sorted intervals.
4. Loop points starting at index 1.
    a. If current start value <= min end value, then there is an overlap,
        and we calculate the new min end value between both intervals, and continue
        to next iteration.
    b. Otherwise, increment min arrow count, and set min end value to current
        min end value.

# Complexity
- Time complexity:
O(nlogn + n) => O(nlogn). We sort the points in place, by starting value.

- Space complexity:
Ranges from O(logn) to O(n) space, depending on language used to sort intervals.
*/

var findMinArrowShots = function(points) {
    // define min arrows, points length
    const pointsLen = points.length;
    // handle edge case, if length equals 1, it takes 1 arrow.
    // if 0, takes 0 arrows.
    if (pointsLen < 2) return pointsLen;

    // sort points by starting value, in ascending order.
    points.sort((a , b) => a[0] - b[0]);
    
    // define min end value
    let minArrows = 1,
        minEnd = points[0][1];

    // loop points, start at index 1
    for (let i = 1; i < pointsLen; i++) {
        const [currStart, currEnd] = points[i];
        // if current start value <= running min end value,
        // then there is an overlap, and so we calc new min end value,
        // and continue.
        if (currStart <= minEnd) {
            minEnd = Math.min(minEnd, currEnd);
            continue;
        }

        // else set min end value to current end value
        minEnd = currEnd;
        minArrows++;
    }

    return minArrows;
};

