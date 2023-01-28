/*
# Problem
https://leetcode.com/problems/lru-cache/description/

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Helpful resources:
https://www.youtube.com/watch?v=6NGIx1vfZR4
https://www.youtube.com/watch?v=7ABFKPK2hD4&t=61s
https://www.youtube.com/watch?v=S6IfqDXWa10

# Method
Hashmap (Maps key to Node) + Doubly Linked List

# Intuition
- This is how the doubly linked list is structured:
tail -> LRU -> nodeOne -> nodeTwo -> MRU -> head

- Initialize dummy nodes for the head and tail nodes.
- The tail points to the LRU, and the MRU points to the head.

- Whenever we add a new node, we add it between the MRU and head node:
MRU -> new node -> head

- Whenever we fetch an existing node, we move the node to the head
    of the linked list.

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(1) average.

- Space:
O(n). Worst case is 
*/

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.size = 0;      // track size of cache
        this.cache = {};    // map key to node
        this.dll = new DoublyLinkedList();
    }

    get(key) {
        // if key exists in cache, retrieve node from cache,
        // move node to front of LL, and return node value.
        if (key in this.cache) {
            const node = this.cache[key];

            // move visited node to head (to mark as MRU)
            this.dll.moveToHead(node);
            return node.val;
        }

        return -1;
    }

    put(key, val) {
        // if key exists in cache, update node value,
        // and move node to front of LL.
        if (key in this.cache) {
            const node = this.cache[key];
            node.val = val;

            // move visited node to head (to mark as MRU)
            this.dll.moveToHead(node);
            return;
        }

        // if capacity is reached, delete the least recently
        // used node from cache and LL, before adding a new node.
        if (this.size === this.capacity) {
            // remove node from list and cache, and decrement size.
            // Remember that the tail points to LRU.
            const lru = this.dll.tail.next;
            this.dll.removeFromList(lru);
            delete this.cache[lru.key];
            this.size--;
        }

        // create and add new node to cache 
        const newNode = new Node(key, val);
        this.cache[key] = newNode;

        // add node to head (to mark as MRU)
        this.dll.addToHead(newNode)
        this.size++;
    }
}

class DoublyLinkedList {
    constructor() {
        // tail's next pointer points to LRU, and
        // head's previous pointer points to MRU.
        // For example:
        // tail -> LRU -> nodeOne -> nodeTwo -> MRU -> head
        //
        // initialize with dummy nodes, and connect tail to head. 
        this.tail = new Node();
        this.head = new Node();
        this.connect(this.tail, this.head);
    }
    
    // point nodeOne -> to nodeTwo
    connect(nodeOne, nodeTwo) {
        nodeOne.next = nodeTwo;
        nodeTwo.prev = nodeOne;
    }

    // remove node from list.
    // so point node's previous to its next node, skipping
    // the current node entirely.
    removeFromList(node) {
        this.connect(node.prev, node.next);
    }

    // add new node to head (to mark as MRU).
    // In other words, we want to add new node between
    // current MRU and head,
    // like so:
    // current MRU -> new node -> head
    addToHead(node) {
        // point current MRU to new node,
        // and point new node to head.
        this.connect(this.head.prev, node);
        this.connect(node, this.head);
    }

    // move current node to head.
    // That means we first remove node from LL,
    // and then move node to head (to mark as MRU).
    moveToHead(node) {
        this.removeFromList(node);
        this.addToHead(node);
    }
}

class Node {
    constructor(key = 0, val = 0) {
        this.key = key;
        this.val = val;
        this.head = null;
        this.tail = null;
    }
}