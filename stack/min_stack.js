/*
https://leetcode.com/problems/min-stack/

Runtime: 115 ms, faster than 87.54% of JavaScript online submissions for Min Stack.
Memory Usage: 52.2 MB, less than 6.60% of JavaScript online submissions for Min Stack.

Method 1: One Stack w/ Value/Min Pairs
*/
class MinStack {
    constructor() {
        this.stack = []; // stores [val, min] pair.
    }
    
    push(val) {
        // define stack length and default subarray pair.
        const stackLen = this.stack.length;
        let pair = [val, val];
        // if stack is empty, push value/min pair.
        if (stackLen === 0) this.stack.push(pair);
        // otherwise, extract current min from second element in top of stack,
        // and if current min < val, then update min in pair subarray to current min.
        // And push pair to stack.
        else {
            const currMin = this.stack[stackLen - 1][1];
            if (currMin < val) pair = [val, currMin];
            this.stack.push(pair);
        }
    }
    
    pop() {
        return this.stack.pop();
    }
    
    top() {
        return this.stack[this.stack.length - 1][0];
    }
    
    getMin() {
        return this.stack[this.stack.length - 1][1];
    }
}

/*
Runtime: 106 ms, faster than 95.07% of JavaScript online submissions for Min Stack.
Memory Usage: 49.8 MB, less than 52.95% of JavaScript online submissions for Min Stack.

Method 2: Two Stacks
*/

class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = []; // contains min value at top of stack.
    }
    
    push(val) {
        this.stack.push(val);
        const minStackLen = this.minStack.length;
        // if min stack is not empty, and top element of min stack < val,
        // then push top element of min stack to min stack.
        // This means that even after adding a new value, the min remains the same.
        if (minStackLen > 0 && this.minStack[minStackLen - 1] < val) {
            this.minStack.push(this.minStack[minStackLen - 1]);
        // otherwise, if min stack is empty, just push val.
        } else this.minStack.push(val);
    }
    
    pop() {
        this.minStack.pop();
        return this.stack.pop();
    }
    
    top() {
        return this.stack[this.stack.length - 1];
    }
    
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}