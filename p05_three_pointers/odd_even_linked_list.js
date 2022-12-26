/*
https://leetcode.com/problems/odd-even-linked-list/description/

Intuition:
Put odd nodes in a LL, and even nodes in another LL. Link the head of
the even LL to the tail of the odd LL.

Algorithm:
1. Create 3 pointers.
    An odd pointer (starting at the head) that points to nodes with odd indices.
    An even pointer (starting at the head's next node) and points to nodes with
    even indices.
    An evenHead pointer that stores the head of the even linked list.

2. Must check if the even node and it's next node are not null. Otherwise,
    we cannot point the odd node to the next odd node.

2. After traversing all nodes, link the head of even LL to the tail of the odd LL.

TC O(n), where n is total number of nodes in LL.
SC O(1), we're only using pointers, which doesn't require extra space.
*/

var oddEvenList = function(head) {
    // handle edge case, if head is null.
    if (head === null) return head;

    // define odd and even pointers, and head of even pointer.
    let odd = head,
        evenHead = head.next,
        even = head.next;

    // loop while even is not null and event.next is not null.
    // if even is null, then we cannot link odd node to its next odd indices.
    while (even !== null && even.next !== null) {
        odd.next = even.next;
        odd = even.next;

        // want to have even node jump to every other node to remain in
        // even indices.
        even.next = even.next.next;
        even = even.next;
    }
    // link head of even node to tail of odd node.
    odd.next = evenHead;
    return head;

};