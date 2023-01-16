/*
# Problem
https://leetcode.com/problems/merge-intervals/description/

Given an array of intervals where intervals[i] = [starti, endi], merge all 
overlapping intervals, and return an array of the non-overlapping intervals that
cover all the intervals in the input.

# Method
Sort + Two Pointers (1 to track result length, 1 to loop intervals)

# Intuition
Because we first sort the intervals by starting value, there can be 4 possible scenarios.

1. a and b do not overlap.
2. some parts of b overlaps with a.
3. a fully overlaps b.
4. b fully overlaps a but both have same start time.

To handle scenario 1, we simply add the non overlapping intervals to output.

To merge 2 overlapping intervals, we compare the end values of both intervals, 
and keep the larger value. This will take care of scenarios 2-4.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(nlogn + n) => O(nlogn).

- Space:
O(logn) to O(n), depending on sorting algorithm used.
*/

var merge = function(intervals) {
    // sort intervals in ascending order
    intervals.sort((a, b) => a[0] - b[0]);

    // define output with first interval
    const res = [intervals[0]];
    let resIdx = 0;

    // loop intervals, start at index 1
    for (let i = 1; i < intervals.length; i++) {
        // define start and end values of current interval, and only
        // the end value of last interval in output.
        const prevEnd = res[resIdx][1],
            [currStart, currEnd] = [intervals[i][0], intervals[i][1]];
        
        // if previous interval comes before current interval,
        // simply push current interval to output as there is no
        // overlapping, and increment size of output array.
        if (prevEnd < currStart) {
            res.push(intervals[i]);
            resIdx++;
        }
        else {
            // otherwise, there is an overlap.
            // Because the intervals are sorted, we know the start
            // value of current interval will not be less than the
            // start value of the last interval in output.
            // 
            // Therefore, to merge, we only need to update the end value
            // of the last interval in output.
            res[resIdx][1] = Math.max(prevEnd, currEnd);
        }
    }

    return res;
};