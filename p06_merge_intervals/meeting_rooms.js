/*
# Problem
https://leetcode.com/problems/meeting-rooms/description/

Given an array of meeting time intervals where intervals[i] = [start_i, end_i],
determine if a person could attend all meetings.

# Method


# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(nlogn + n) => O(n).

- Space:
O(logn) to O(n), depending on sorting algorithm used in JavaScript.
*/

var canAttendMeetings = function(intervals) {
    // sort intervals based on start value, in ascending order
    intervals.sort((a, b) => a[0] - b[0]);

    // loop intervals
    for (let i = 1; i < intervals.length; i++) {
        const [currStart, prevEnd] = [intervals[i][0], intervals[i-1][1]];

        // because intervals are sorted by start value,
        // if start of current interval overlaps end of previous interval,
        // then person cannot attend all meetings.
        if (currStart < prevEnd) return false;
    }

    return true;
};