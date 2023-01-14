/*
# Problem
https://leetcode.com/problems/daily-temperatures/description/

# Method
Monotonic Decreasing Stack (Store Indices (w/ Temp))

# Intuition
- Stack will store temps in decreasing order. 
- If current temp is greater than the temp at top of stack, we have to pop 
    from stack until the stack is either empty, or the temp at top of stack > current temp. 
- During that process, we can calculate the difference between the current day
    (or index) and the day (or index) in which the temp at top of stack occurred.
- When that condition is met, we can push current index to stack.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
O(2n) => O(n). Worst case is every element will be pushed and popped once, which
gives a TC of O(2n). This occurs if temperatures are in increasing order.

- Space complexity:
O(n). Worst case is when temperatures are already in decreasing order. This means
that stack will be of length n.
*/

var dailyTemperatures = function(temperatures) {
    // define temperatures length, monotonic decreasing stack,
    // output array of size temp length
    const tempsLen = temperatures.length,
        stack = [];
    let res = Array(tempsLen).fill(0),
        currTemp;

    // loop temperatures
    for (let day = 0; day < tempsLen; day++) {
        // define current temp
        currTemp = temperatures[day];

        // while stack is not empty, and current temp > temp at top of stack,
        // we want to pop from stack to retain monotonic decreasing property.
        while (stack.length > 0 && currTemp > stack[stack.length - 1][1]) {
            // pop from stack
            const [prevDay, ,]  = stack.pop();
            // calc number of days to get warm temperature and
            // assign to output array at the index of the value at top of stack
            res[prevDay] = day - prevDay;;
        }

        // push index and value to top of stack
        stack.push([day, currTemp]);
    }

    return res;
};