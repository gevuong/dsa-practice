/*
# Problem
https://leetcode.com/problems/insert-interval/description/

# Method
Linear Search (via 2 While Loops) + Single Pointer

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
1. While the end of current interval < start of new interval, push current
    intervals to output.
2. While start of current interval <= end of new interval, merge overlapping
    intervals by calculating min and max between the starting and ending values
    of both intervals, and assigning it to new interval.
3. Push new interval to output.
4. Push remaining intervals to output.

# Complexity
- Time:
O(n). We visit each interval at most once.

- Space:
O(1). The output array does not count as extra space.
*/

var insert = function(intervals, newInterval) {
    // define output, intervals length, and index
    const res = [],
        intervalsLen = intervals.length;
    let i = 0,
        [newStart, newEnd] = [newInterval[0], newInterval[1]];

    // add current intervals that come before start of new interval.
    while (i < intervalsLen && intervals[i][1] < newStart) {
        res.push(intervals[i]);
        i++;
    }

    // at this point, we know that 
    // end of current interval >= start of new interval.
    // But that doesn't mean they overlap. 
    // Current interval can come after new interval.
    //
    // So to make sure they overlap, we need to compare the start 
    // of current interval with the end of new interval.
    while (i < intervalsLen && intervals[i][0] <= newEnd) {
        // merge overlapping intervals by finding the min and max
        // between start and end values.
        [newStart, newEnd] = [
            Math.min(newStart, intervals[i][0]),
            Math.max(newEnd, intervals[i][1]),
        ];
        i++;
    }
    
    // add new interval to output
    res.push([newStart, newEnd]);
    
    // push remaining current intervals
    res.push(...intervals.slice(i));

    return res;
};

/*
Method
Linear Search
*/

var insert = function(intervals, newInterval) {
    // handle edge case
    const intervalsLen = intervals.length;
    if (intervalsLen === 0) return [newInterval];
    
    // define output
    const res = [];
    let [newStart, newEnd] = [newInterval[0], newInterval[1]];

    // loop intervals
    for (let i = 0; i < intervalsLen; i++) {
        const [currStart, currEnd] = [intervals[i][0], intervals[i][1]];

        // if end of new interval < start of new interval,
        // since intervals are sorted, the remaining intervals will
        // always be greater than new interval.
        if (newEnd < currStart) {
            res.push([newStart, newEnd], ...intervals.slice(i));
            return res;
        }

        // if current end < new start, then there is no overlapping,
        // and we can add current interval to output.
        if (currEnd < newStart) res.push([currStart, currEnd]); 

        // otherwise, there is overlapping intervals, 
        // and we want to merge them.
        else {
            // calc the min start between the two overlapping
            // intervals.
            newStart = Math.min(newStart, currStart);

            // calc the max end between the two overlapping
            // intervals.
            newEnd = Math.max(newEnd, currEnd);
        }
    }

    // we want to add the new interval because for example,
    // all prior intervals could be smaller than new interval.
    res.push([newStart, newEnd]);
    return res;
};       