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
  - The `find` function takes O(1) time.
  - However, the `union` function takes O(n) time.

- **Quick Union**
  - The `find` function will take more time than the **Quick Find** implementation.
  - Compared to **Quick Find**, the time complexity of `union` function is better.

## Quick Find - Disjoint Set

## Quick Union - Disjoint Set

- Generally, Quick Union is more efficient than Quick Find.

## Union by Rank - Disjoint Set

- The 'rank' refers to the height of each vertex.
- When we `union` two vertices, instead of always picking the root of vertex A (or vertex B, it doesn't matter as long as we're consistent) as the new root node, we choose the root node of the vertex with a larger 'rank'.
- We will merge the shorter tree under the taller tree and assign the root node of the taller tree as the root node for both vertices.
- This way, we effectively avoid the possibility of connecting all vertices into a straight line.
- This optimization is called the 'disjoint set' with union by rank.
