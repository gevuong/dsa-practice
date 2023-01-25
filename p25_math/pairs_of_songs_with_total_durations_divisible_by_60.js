/*
# Problem
https://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60/description/

Return the number of pairs of songs for which their total duration in seconds is
divisible by 60. Formally, we want the number of indices i, j such that i < j 
with (time[i] + time[j]) % 60 == 0.

# Method
Two Sum (via Hashmap - Map Remainder to Count) + Math

# Intuition
Very similar to Two Sum, in that we are storing remainder of current time in hashmap.
That way, if we have encounter a time that needs that missing remainder, then we
know we have found a valid pair. But instead of incrementing number of pairs by 1,
we are adding the total count of the missing remainder (so far) to number of pairs.

1. If time at current index is divisible by 60, then to get a sum that is divisible by 60,
the other pair must also be divisible by 60.

For example, if time at current index is 60, the other pair must be divisible by 60 
(ie. 60, 120, 180, 240, 300).

If remainder does not equal 60, we must subtract from 60 to find the missing pair.

For example, if time at current index is 40, the remainder is 20.
Therefore, we need to find a second pair that has a remainder of 20 (or is divisible by 20).

2. If missing remainder is in mod count, then we have found a pair.

3. We want to track and increment remainder count. 
In subsequent iterations, there may be a time that is looking for its missing 
remainder to be paired, so that its sum is divisible by 60.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(n).

- Space:
O(n).
*/

var numPairsDivisibleBy60 = function(time) {
    // define number of pairs, time length
    const timeLen = time.length,
        modCount = {};
    let numPairs = 0;

    // loop time
    for (let i = 0; i < timeLen; i++) {
        // define pair two and calc remainder
        let pairTwo = 0,
            remainder = time[i] % 60;
        
        // if time at current index is divisible by 60,
        // then to get a sum that is divisible by 60,
        // the other pair must also be divisible by 60.
        //
        // For example, if time at current index is 60,
        // the other pair must be divisible by 60 
        // (ie. 60, 120, 180, 240, 300).
        //
        // If remainder does not equal 60, we must subtract
        // from 60 to find the missing pair.
        //
        // For example, if time at current index is 40,
        // the remainder is 20.
        // Therefore, we need to find a second pair that
        // has a remainder of 20 (or is divisible by 20).
        if (remainder !== 0) pairTwo = 60 - remainder;

        // if missing remainder is in mod count,
        // then we have found a pair.
        if (pairTwo in modCount) numPairs += modCount[pairTwo];

        // track and increment remainder count. 
        // In subsequent iterations, there may be a time that 
        // is looking for its missing remainder to be paired,
        // so that its sum is divisible by 60.
        remainder in modCount ? modCount[remainder]++ : modCount[remainder] = 1;
    }

    return numPairs;
};