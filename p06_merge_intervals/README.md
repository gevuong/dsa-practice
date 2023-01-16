# Intervals

Given two intervals (‘a’ and ‘b’), there are six different ways the two intervals can relate to each other.

1. a and b do not overlap: `[[2,4],[5,7]]`.
2. a and b overlap, b ends after a: `[[2,4],[4,6]]`.
3. a completely overlaps b: `[[2,4],[2,3]]`.
4. a and b overlaps, a ends after a: `[[2,4],[1,3]].
5. b completely overlaps a: `[[2,4],[1,5]]`.
6. a and b do not overlap: `[[2,4],[0,1]]`.

## Merge Intervals

Because we first sort the intervals by starting value, there can be 4 possible scenarios.

1. a and b do not overlap.
2. some parts of b overlaps with a.
3. a fully overlaps b.
4. b fully overlaps a but both have same start time.

To handle scenario 1, we simply add the non overlapping intervals to output.

To merge 2 overlapping intervals, we compare the end values of both intervals, and keep the larger value. This will take care of scenarios 2-4.