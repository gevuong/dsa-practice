/*
https://leetcode.com/problems/generate-parentheses/

Runtime: 60 ms, faster than 97.73% of JavaScript online submissions for Generate Parentheses.
Memory Usage: 42.5 MB, less than 72.41% of JavaScript online submissions for Generate Parentheses.

I don't fully understand or would be able to conclude the TC/SC provided in the LC backtracking solution.
I would say the upper bound TC is 2^n, since at each node in decision tree, there can be up to 2 decisions,
to add or not add a bracket.
As for SC, I would say O(2n) -> O(n), since the stack would store at most a string of length 2n.
*/

var generateParenthesis = function(n) {
    // define output array
    const res = [];
    
    // define dfs, with open and close bracket count, and subarray
    const dfs = (open, close, sub) => {
        // define base case.
        // if open + close equals n x 2, then push to res.
        if (open + close === n*2) {
            res.push(sub.join(''));
            return;
        }
        
        // push open bracket if count < n,
        // and call dfs with incremented open count.
        if (open < n) {
            sub.push('(');
            dfs(open+1, close, sub);
            // backtrack
            sub.pop();
        }
        
        // only push closed bracket if close count < open count,
        // and call dfs with incremented close count.
        if (open > close) {
            sub.push(')');
            dfs(open, close+1, sub);
            // backtrack
            sub.pop();
        }
    }
    
    // call dfs
    dfs(0, 0, []);
    return res;
};