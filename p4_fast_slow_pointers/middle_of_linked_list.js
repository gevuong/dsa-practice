/*
https://leetcode.com/problems/middle-of-the-linked-list/

Runtime: 86 ms, faster than 64.62% of JavaScript online submissions for Middle of the Linked List.
Memory Usage: 41.9 MB, less than 72.14% of JavaScript online submissions for Middle of the Linked List.

Method: Fast and Slow Pointer
TC O(n) | SC O(1)
*/

var middleNode = function(head) {
    // define slow and fast pointers
    let slow = head,
        fast = head;
    
    // 1. don't need to have a condition for slow node because
    //    fast node will reach null first.
    // 2. Have to check if its next value is null because
    //    if we have [1], we do not want slow or fast nodes to move.
    //    To prevent that, we also have to check if fast.next is null.
    while (fast !== null && fast.next !== null) {
        // move slow node to the right once.
        slow = slow.next;
        // move fast node to the right 2x. 
        fast = fast.next.next;
    }    

    return slow;
};