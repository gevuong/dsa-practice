# Disjoint Set

To determine whether two vertices are connected, we can using a **disjoint set** data structure, aka **union-find** data structure. Others might refer to it as an algorithm.

The primary use of **disjoint sets** is to address connectivity between the components of a network.

The "network" here can be a computer network or a social network. For example, we can use a **disjoint set** to determine if two people share a common ancestor.

## Terminologies

- Parent node
  - The direct parent node of a vertex.
  - For example: In `3 -> 1 -> 0`, the parent node of vertex 3 is 1, and the parent node of vertex 1 is 0.
- Root node
  - A node without a parent node. It can be viewed as the parent node of itself.
  - For example, In `3 -> 1 -> 0`, the root node of vertices 3 and 1 is 0.
  - Sometimes, the root node is sometimes referred to as the head node.

## Two Important Functions of a Disjoint Set

- `find`
  - This function finds the root node of a given vertex.
  - For example, the output of the `find` function for vertex 3 in this graph, `3 -> 1 -> 0`, is 0.

- `union`
  - This function unions two vertices and makes their root nodes the same.
  - If we union vertices A and B, their root node will become the same. This means the `union` function will modify the root node of vertices A and B to the same root node.

## Two Ways to Implement a Disjoint Set

- **Quick Find**
  - `find`
    - Function takes O(1) time.
    - Stores the root vertex in the array. The array index represents the each vertex.
    - For example, if array is length 5, then there are 5 vertices, ranging from values 0 to 4.
  - However, the `union` function takes O(n) time.

- **Quick Union**
  - Compared to the **Quick Find** implementation, `find` will take more time, but the `union` operation will be faster.

## Quick Find - Disjoint Set

As the name suggests, **Quick Find** will have a faster `find` operation.

```js
class UnionFind {
  // size represents the total number of vertices in graph.
  constructor(size = 0) {
    // initially, each vertex is isolated and independent. 
    // Therefore, the root node of each vertex (which is 
    // represented by the array index) is itself.
    this.root = Array(size).fill().map((_, i) => i);
  }

  // return the root node (or vertex) of current node,
  // since every vertex in root array will be pointing to its root node.
  find(node) {
    return this.root[node];
  }

  union(x, y) {
    // Step 1: find root node of x and y.
    const [rootX, rootY] = [find(x), find(y)];

    // Step 2: Perform union and merge roots if roots are not equal.
    // In this case, we are merging vertices with rootY to rootX.
    if (rootX !== rootY) {
      // loop root array,
      // and assign any vertices that share the same root as node y,
      // to the new root, which is the root of node x.
      for (let i = 0; i < this.root.length; i++) {
        if (root[i] === rootY) root[i] = rootX;
      }
    }
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}
```

- **Time Complexity**

|    | Union-find Constructor | Find | Union | Connected |
| -- | ---------------------- |----- | ----- | --------- |
| TC | O(n)                   | O(1) | O(n)  | O(1)      |

Space complexity is O(n), to store the array of size n.

## Quick Union - Disjoint Set

- The root array in **Quick Union** stores the parent vertex of each vertex, instead of the root vertex.

```js
class UnionFind {
  // initialization of root array is the same as Quick Find.
  // size represents the total number of vertices in graph.
  constructor(size = 0) {
    // initially, each vertex is isolated and independent. 
    // Therefore, the root node of each vertex (which is 
    // represented by the array index) is itself.
    this.root = Array(size).fill().map((_, i) => i);
  }


  // return the root of current node.
  find(node) {
    // if the current node equals its parent,
    // then we found the root of current node.
    while (node !== this.root[node]) node = this.root[node];

    return node;
  }

  union(x, y) {
    const [rootX, rootY] = [find(x), find(y)];

    // if root of x and y are equal, then they are already connected.
    //
    // if not, we want to set the root of y, which is the parent node of y,
    // to the root of x.
    // This is because if we want to find the root of x and y next time,
    // the roots will be equal.
    if (rootX === rootY) this.root[rootY] = rootX;
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}
```

- **Time Complexity**

|    | Union-find Constructor | Find | Union | Connected |
| -- | ---------------------- |----- | ----- | --------- |
| TC | O(n)                   | O(n) | O(n)  | O(n)      |

Space complexity is O(n), to store the array of size n.

- The `union` operation consists of two `find` operations, which in the worst case, will take O(n) time.
- The `connected` operation takes O(n) time in worst case since it involves two `find` calls.
- For the `find` operation, in the worst case, we traverse every vertex to find the root of the input vertex.
- The max number of operations to get the root vertex would be no more than the tree's height, which is O(n) time.

## Why is Quick Union More Efficient than Quick Find?

In **Quick Union**, the worst case scenario for `find` is when the tree is constructed as a singly linked list, in a line.

- For example, to find the root of 4, `1 - 2 - 3 - 4`, we have to search node 3, then 2, and finally 1.

In **Quick Find**, since each `union` call takes O(n) time no matter what, if we want to connect n elements, it will take O(n^2) to connect n elements.

In **Quick Union**, to connect n elements, the worst case runtime for each union is O(n). So overall, the time complexity is less than O(n^2). Only in the worst case will the time complexity be O(n^2).

With that being said, between **Quick Find** and **Quick Union**, neither are very efficient. However, this can be optimized.

## Union by Rank - Disjoint Set

**Quick Union** runs the risk of forming a skewed tree.

For example, since **Quick Union** will always point `rootY` to `rootX`, `union(1, 0)`, `union(2, 0)`, `union(3, 0)`, `union(4, 0)`, `union(5, 0)` will construct a linked list of nodes with 5 as the root node.

This demonstrates the main inefficiency of **Quick Union**, because the `find` operation will take O(n) time in the worst case, The height of the tree is equal to n elements.

If we can try to balance the tree during the `union` operation, then the time complexity of the `find` operation will decrease because the height will be smaller. It will also improve the overall efficiency of the disjoint sets.

### Rank

- The 'rank' refers to the height of each vertex.
- When we `union` two vertices, instead of always picking the root of vertex A (or vertex B, it doesn't matter as long as we're consistent) as the new root node, we choose the root node of the vertex with a larger 'rank'.
- We merge the shorter tree under the taller tree and assign the root node of the taller tree as the root node for both vertices.
- This way, we effectively avoid the possibility of connecting all vertices into a straight line.
- This optimization only works with **Quick Union** disjoint sets, and is called the disjoint set with union by rank.

```js
class UnionFind {
  constructor(size) {
    // root array stores the parent node of each vertex.
    this.root = Array(size).fill().map((_, i) => i);

    // use rank array to record the height of each vertex,
    // which is where they are in the tree.
    // Each node is initialized to 1 since each node is isolated at the start.
    this.rank = Array(size).fill(1);
  }

  // return the root of current node.
  find(node) {
    // if the current node equals its parent,
    // then we have found the root of current node.
    while (node !== this.root[node]) {
      node = this.root[node];
    }

    return node;
  }

  union(x, y) {
    // find root nodes of x and y.
    // if they're the same, then they're already connected and we don't have
    // to do anything.
    const [rootX, rootY] = [find(x), find(y)];
    
    // if the root nodes are not equal,
    // compare height of the root nodes.
    if (rootX !== rootY) {
      // if height of the root node of x is taller (or has a higher rank),
      // then update the parent of y's root node.
      if (this.rank[rootX] > this.rank[rootY]) this.root[rootY] = rootX;
      else if (this.rank[rootX] < this.rank[rootY]) this.root[rootX] = rootY;
      else {
        // if the heights are equal, we can choose either to be the root node.
        // Here, we choose the root node of X to be the root node.
        this.root[rootY] = rootX;
        // the height of the overall tree will increase by 1.
        // For example, if we have 2 disjoint sets of equal height,
        //  0 -> 1, and 1 -> 2, 
        // when we connect root 1 to root 0, the height of 0 increases by 1.
        this.rank[rootX]++;
      }
    }
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}
```

- **Time Complexity**

|    | Union-find Constructor | Find    | Union    | Connected |
| -- | ---------------------- |-------- | -------- | --------- |
| TC | O(n)                   | O(logn) | O(logn)  | O(logn)   |

Space complexity is O(n), to store the array of size n.

For the `find` operation, in the worst case, when we repeatedly union components of equal rank, the tree height will be at most log(n) + 1. So the `find` operation requires O(logn) time.

For the `union` and `connected` operations, we need O(logn) time since these operations are dominated by the `find` operation.

## Path Compression Optimization

This is an optimization to the `find` function in the **Quick Union** implementation.

As a reminder, in **Quick Union**, the worst case scenario for `find` is when the tree is constructed as a singly linked list (in a line). The `find` function would take O(n) time to find the root node.

After finding the root node, we can update the parent node of all traversed elements to their root node.

That way, when we search for the root node of the same element again, we only need to traverse two elements to find its root node, which is highly efficient.

- For example, the path compression optimization converts the following:

```md
 from          to
  0            0
  |        / / | \ \
  2        1 2 3 4 5
  |
  3
  |
  4
  |
  5
```

How could we efficiently update the parent nodes of all traversed elements to the root node?
The answer is **recursion**.

```js
class UnionFind {
  // initialization of root array is the same as Quick Find.
  // size represents the total number of vertices in graph.
  constructor(size = 0) {
    // initially, each vertex is isolated and independent. 
    // Therefore, the root node of each vertex (which is 
    // represented by the array index) is itself.
    this.root = Array(size).fill().map((_, i) => i);
  }


  // return the root of current node.
  find(node) {
    // if current node is equal to its parent, then we found our root.
    if (node === this.root[node]) return node;

    // otherwise, keep searching via recursion until the root node is found.
    // When the base case is reached, recursion will return the value of
    // the root node, and at the same time, change the parent of the current
    // node, to the root node.
    this.root[node] = this.find(this.root[node]);

    // finally, return the current node's root.
    return this.root[node];
  }

  union(x, y) {
    const [rootX, rootY] = [find(x), find(y)];

    // if root of x and y are equal, then they are already connected.
    //
    // if not, we want to set the root of y, which is the parent node of y,
    // to the root of x.
    // This is because if we want to find the root of x and y next time,
    // the roots will be equal.
    if (rootX === rootY) this.root[rootY] = rootX;
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}
```

- **Time Complexity**

These are for the average case, since the worst-case scenario is rare in practice.

|    | Union-find Constructor | Find    | Union    | Connected |
| -- | ---------------------- |-------- | -------- | --------- |
| TC | O(n)                   | O(logn) | O(logn)  | O(logn)   |

Space complexity is O(n), to store the array of size n.

On average, the `union` and `connected` operations will be O(logn) due to path compression.
In the worst case, it would be O(n) time when the tree is skewed.

## Optimized Disjoint Set with Path Compression and Union by Rank

```js
class UnionFind {
  constructor(size) {
    // root array stores the parent node of each vertex.
    this.root = Array(size).fill().map((_, i) => i);

    // use rank array to record the height of each vertex,
    // which is where they are in the tree.
    // Each node is initialized to 1 since each node is isolated at the start.
    this.rank = Array(size).fill(1);
  }

  // return the root of current node.
  find(node) {
    // if current node is equal to its parent, then we found our root.
    if (node === this.root[node]) return node;

    // otherwise, keep searching via recursion until the root node is found.
    // When the base case is reached, recursion will return the value of
    // the root node, and at the same time, change the parent of the current
    // node, to the root node.
    this.root[node] = this.find(this.root[node]);

    // finally, return the current node's root.
    return this.root[node];
  }

  union(x, y) {
    // find root nodes of x and y.
    // if they're the same, then they're already connected and we don't have
    // to do anything.
    const [rootX, rootY] = [find(x), find(y)];
    
    // if the root nodes are not equal,
    // compare height of the root nodes.
    if (rootX !== rootY) {
      // if height of the root node of x is taller (or has a higher rank),
      // then update the parent of y's root node.
      if (this.rank[rootX] > this.rank[rootY]) this.root[rootY] = rootX;
      else if (this.rank[rootX] < this.rank[rootY]) this.root[rootX] = rootY;
      else {
        // if the heights are equal, we can choose either to be the root node.
        // Here, we choose the root node of X to be the root node.
        this.root[rootY] = rootX;
        // the height of the overall tree will increase by 1.
        // For example, if we have 2 disjoint sets of equal height,
        //  0 -> 1, and 1 -> 2, 
        // when we connect root 1 to root 0, the height of 0 increases by 1.
        this.rank[rootX]++;
      }
    }
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}
```

- **Time Complexity**

These are for the average case, since the worst-case scenario is rare in practice.

|    | Union-find Constructor | Find        | Union       | Connected   |
| -- | ---------------------- |------------ | ----------- | ----------- |
| TC | O(n)                   | O(alpha(n)) | O(alpha(n)) | O(alpha(n)) |

- n is the number of vertices in the graph.
- alpha refers to the Inverse Ackermann function.
- In practice we assume O(alpha(n)) as O(1) average.

- When using a combination of union by rank and path compression optimization, the `find` operation will take O(alpha(n)) time on average.
- Since `union` and `connected` both make calls to `find` and all other operations are constant time, `union` and `connected` functions will also take O(alpha(n)) time on average.

- Space complexity is O(n), to store the array of size n.
