/*
# Problem
https://leetcode.com/problems/all-paths-from-source-to-target/description/

# Method
Backtracking (via Recursive DFS)

# Intuition
- This problem is similar to like a binary tree path sum type problem, where we
    retain a current path array as we traverse a particular path in the graph.
    And if path is invalid, pop node from path and traverse a different path.
- Also, although it may not be obvious at first, this problem is also similar to
    subsets in that there can be up to 2^n possible paths from source to target.

# Approach
1. Define paths array, and the target node value which is n - 1, where n is the
    length of the input graph array.
2. Define backtrack method via template.
    2a. Define base case, which is when current node equals target, push path
        to output array.
    2b. Loop all neighbors of current node, and within each iteration, push
        possible candidate to current path, explore path further, and remove
        possible candidate from current path.
3. Call backtrack method with current path of [0] and the source node value.
4. Return array of all paths.

# Complexity
- Time complexity:
O(n x 2^n). 
- For each new node, the number of paths can double. This means that we can 
    have up to 2^n paths, where n is the number of nodes in graph.
- In other words, with each new node, new paths can be created by preceding all
    previous paths with the newly added node.
- For each new path, it can take up to O(n) time to copy the path to output.

- Space complexity:
O(n x 2^n).
- Worst case is the recursive call stack can take up to O(n) space, 
    and the output array can hold up to 2^n paths.
*/

var allPathsSourceTarget = function(graph) {
    // output array, backtrack method
    const paths = [],
        target = graph.length - 1,
        backtrack = (currNode, currPath) => {
            // define base case.
            // if current node equals target, 
            // push copy of path to target and stop traversing path.
            if (currNode === target) {
                paths.push([...currPath]);
                return;
            }

            // otherwise, loop all possible candidates
            for (let i = 0; i < graph[currNode].length; i++) {
                // push to current path
                currPath.push(graph[currNode][i]);
                // traverse further
                backtrack(graph[currNode][i], currPath);
                // backtrack
                currPath.pop();
            }
        };

    // call backtrack, and return all paths.
    backtrack(0, [0]);
    return paths;
};