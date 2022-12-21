/*
# Problem
https://leetcode.com/problems/find-the-town-judge/description/

# Method
Two Arrays (Can be solved with One Array)

# Intuition
A town judge would have 0 out-degrees because the town judge trusts no one,
and n-1 in-degrees because everyone except the town judge, trusts the town judge.

# Approach
1. Define an in and out-degree array of size N+1.
2. Loop E edges and increment out and in-degree count for every edge. Each
    vertex number is the index of in the out and in-degree array.
3. Loop N vertices and index into in and out-degree arrays. If out-degree
    count is 0 and in-degree count equals N-1, then that vertex (or index)
    is the town judge.

# Complexity
- Time complexity:
O(N+E). We loop N vertices, and E edges

- Space complexity:
O(2N). There are 2 arrays of size N+1.
*/

var findJudge = function(n, trust) {
    // define in and out degrees of size n.
    // an out degree is the number of outgoing edges from a vertex,
    // an an in-degree is the number of incoming edges to a vertex.
    const inDegCount = Array(n+1).fill(0),
        outDegCount = Array(n+1).fill(0);

    // loop edges in trust array
    for (let [outDeg, inDeg] of trust) {
        // increment in/out deg count. outDeg (0tht index) trusts 
        // (or points to) the person labeled as inDeg (1st index).
        outDegCount[outDeg]++;
        inDegCount[inDeg]++;
    }

    // loop n vertices
    for (let i = 1; i <= n; i++) {
        // if out-degree count is 0, and in-degree count is n-1,
        // return vertex
        if (outDegCount[i] === 0 && inDegCount[i] === n-1) return i;
    }

    return -1;
};


/*
Method
One Array
*/

var findJudge = function(n, trust) {
    // define an array of degree count of size n.
    // an out degree is the number of outgoing edges from a vertex,
    // an an in-degree is the number of incoming edges to a vertex.
    const degCount = Array(n+1).fill(0);

    // loop edges in trust array
    for (let [outDeg, inDeg] of trust) {
        // increment in deg count, and decrement out deg count.
        // out deg - in deg
        degCount[outDeg]--;
        degCount[inDeg]++;
    }

    // loop n vertices
    for (let i = 1; i <= n; i++) {
        // if degree count is n-1, return vertex.
        // if out deg - in deg = n - 1, 
        // then vertex is the town judge.
        if (degCount[i] === n-1) return i;
    }

    return -1;
};