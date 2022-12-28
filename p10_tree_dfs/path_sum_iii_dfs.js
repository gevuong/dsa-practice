/*
https://leetcode.com/problems/path-sum-iii/

Runtime: 90 ms, faster than 93.15% of JavaScript online submissions for Path Sum III.
Memory Usage: 46.6 MB, less than 99.19% of JavaScript online submissions for Path Sum III.

Method: Recursive DFS + Backtracking + Path Array

TC O(n^2), for each node, we loop its path and worst case is the path is length n.
SC O(n), worst case is tree is a linked list, where each parent has a single child.

Method: Path Sum, Non-optimal solution
*/

var pathSum = function(root, targetSum) {
    // define count, dfs with node current sum as params
    let count = 0;
    const dfs = (node, path) => {
        // define base case, 
        // if node is null, we have 0 path count.
        if (node === null) return 0;

        // push current node value to path
        path.push(node.val);

        // loop path in reverse order because we want to find
        // NEW paths as we added a new element. This can
        // only be done if we include the last element
        // to every possible path.
        
        // if we loop in the normal order, we would start from
        // the root, and will encounter duplicate paths
        // that will not have the new/last element.
        let pathSum = 0;
        for (let i = path.length - 1; i >= 0; i--) {
            pathSum += path[i];
            if (pathSum === targetSum) count++;
        }
        
        // traverse left and right subtrees
        dfs(node.left, path);
        dfs(node.right, path);
        
        // remove current node from path to backtrack.
        // the current node needs to be removed to go up the
        // recursive call stack.
        path.pop();        
    };
    
    dfs(root, []);
    return count;
};

