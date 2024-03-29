/*
# Problem
https://leetcode.com/problems/implement-queue-using-stacks/description/

# Method
Two Stacks

# Intuition
One stack stores recently pushed elements.
Second stack acts as a queue, such that popping the top element is actually
the first element in the queue.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
push - O(1)
pop - O(1) amortized. This only occurs when there are no more values in stack 2,
we have to loop all recently pushed values in stack 1, pop and push them to stack 2.
The number of times pop operation can be called is limited by the number of push
operations before it. Although a single pop operation can be expensive, it is 
expensive only once per n times (queue size), when stack 2 is empty.
peek - O(1)
empty - O(1)

- Space complexity:
O(n). Worst case is n methods are pushes to queue.
*/

class MyQueue {
    constructor() {
        // this stack stores the most recently added elements.
        this.stackOne = [];

        // this stack stores elements in FIFO order, meaning the top element
        // is the first element in queue. 
        this.stackTwo = [];
    }

    push(val) {
        this.stackOne.push(val);
    }

    // TC O(1) amortized | TC O(n) space
    // Worst case of TC O(n) does not very happen, 
    // only occurs if stack 2 is empty.
    pop() {
        // populate stack 2 by popping from stack 1,
        // and pushing them to stack 2.
        if (this.stackTwo.length === 0) {
            while (this.stackOne.length > 0) {
                this.stackTwo.push(this.stackOne.pop());
            }
        }
        // top element will be first element in queue
        return this.stackTwo.pop();
    }

    peek() {
        if (this.stackTwo.length > 0) return this.stackTwo[this.stackTwo.length - 1];
        return this.stackOne[0];
    }

    empty() {
        return (this.stackOne.length === 0 && this.stackTwo.length === 0);
    }
}