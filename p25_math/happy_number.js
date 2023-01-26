/*
# Problem
https://leetcode.com/problems/happy-number/description/

Write an algorithm to determine if a number n is happy.
A happy number is a number defined by the following process:

Starting with any positive integer, replace the number by the sum of the squares of its digits.
Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
Those numbers for which this process ends in 1 are happy.
Return true if n is a happy number, and false if not.

# Method
Math + Hashset (to track visited/seen)

# Intuition
Use hashset to track numbers that were seen.
Calculate sum of square of digits using a while loop, modulo, and division.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(logn). 
The # of digits for a number n is log n. 
Resources explaining why:
https://stackoverflow.com/questions/50261364/explain-why-time-complexity-for-summing-digits-in-a-number-of-length-n-is-ologn/50262470#50262470
https://leetcode.com/problems/happy-number/solutions/421162/happy-number/

- Space:
O(logn).
Resource explaining why.
https://leetcode.com/problems/happy-number/solutions/421162/happy-number/
*/

var isHappy = function(n) {
    // define seen hashset, and sum
    const seen = new Set();
    let sum = 0;

    // loop while sum does not equal 1
    while (n !== 1) {
        // if n has been seen, then we are in a cycle
        if (seen.has(n)) return false;

        // otherwise, add sum to hashset
        seen.add(n);

        // reset sum
        sum = 0;
        
        // calc sum of square of each digit
        while (n > 0) {
            const digit = n % 10;
            n = Math.floor(n / 10);
            sum += Math.pow(digit, 2);
        }

        // assign new sum to n
        n = sum;
    }

    return true;
};