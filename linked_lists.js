/*
  2.1 Remove Dups:
  Write code to remove duplicates from an unsorted linked list.
  How would you solve this problem if a temporary buffer is not allowed?
*/
  // Questions: Is this a singly linked list or a doubly linked list?
  // Examples: 1 -> 1 -> 2 -> 3; 1 -> 2 -> 3 -> 2;
  // Naive Answer:
    /* function removeDups(unsortedLinkedList) {
      set current to unsortedLinkedList's this.head
      set record to hash with this.head's value as a key
      while current.next !== null
        if record doesn't have current.next's value
          set value as key on record
        otherwise (if record does have value)
          update current node's next to current.next.next
        set current to current's next
       return unsortedLinkedList;
     } */

    // function removeDups(unsortedLinkedList) {
      // set firstPointer to unsortedLinkedList's this.head
      // while firstPointer.next !== null
        // set secondPointer to this.head
        // while secondPointer.next !== null
          // if secondPointer.next.value === firstPointer.value
            // set secondPointer.next to secondPointer.next.next
          // set secondPointer to secondPointer.next
        // set firstPointer to firstPointer.next

      // return unsortedLinkedList;
    //}

/*
  2.2  Return Kth to Last:
  Implement an algorithm to find the kth to last element of a singly linked list.
*/

  // Questions: -
  // Assumption: linkedlist has a size property/method (if not, loop through and count nodes in linked list)

  // function returnKth(linkedList, k) {
    // set current to linkedList.head
    // set counter to 0
    // loop through linked list while counter !== linkedList.size - k
      // counter++
      // set current to linkedList.next

    // return current
  // }

  // function returnKth(linkedList, k) {
    // set result to null
    // function subroutine (current, count = 0) {
      // base case: current.next === null
        // return;
      // call subroutine with current.next
      // count ++
      // if (count === k)
        // set result = current
    // }
    // call subroutine with linkedList.head
    // return current
  // }

/* 2.3 Delete Middle Node:
  Implement an algorithm to delete a node in the middle (ie. any node but the
  first and last, not necessarily the exact middle) of a singly linked list,
  given only access to that node.

  Example
    Input: the node c from the linked list a -> b -> c -> d -> e -> f
    Result: nothing is returned, but the new linked list looks like a -> b -> d -> e -> f
*/

    /*function deleteMiddleNode(middleNode) {
        set middleNode.value = middleNode.next.value
        set middleNode.next = middleNode.next.next;
      } */

/*
  2.4 Partition:
  Write code to partition a linked list around a value x, such that all nodes
  less than x come before all nodes greater than or equal to x. If x is
  contained within the list, the values of x only need to be right after the
  elements less than x (see below). The partition element x can appear anywhere
  in the "right partition"; it does not need to appear between the left and
  right partitions.

  Example:
   Input: x -> 5 -> 8 -> 5 -> 10 -> 2 -> 1 [partition = 5]
   Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8
 */

 // Questions: LinkedList API?

 /*
  function partition(linkedlist, partition) {
    let leftPartition,
      rightPartition,
      currentNode = linkedlist.head;

  1. loop through linkedlist
        set next to currentNode.next
        set currentNode.next to null
      2. if currentNode.value >= partition
        2a. add currentNode to rightPartition
      3. else
        3a. add currentNode to leftPartition
      update currentNode to next
  4. add head of rightPartition to leftPartition and return leftPartition
  }
  */

/*
  2.5 Sum Lists:
  You have two numbers represented by a linked list, where each node contains a
  single digit. The digits are stored in reverse order, such that the 1's digit
  is at the head of the list. Write a function that adds the two numbers and
  returns the sum as a linked list.

  Example:
   Input: (7 -> 1 -> 6) + (5 -> 9 -> 2). That is, 617 + 295
   Output: 2 -> 1 -> 9. That is, 912.

   Suppose the digits are stored in forward order. Repeat the above problem.
   Input: (6 -> 1 -> 7) + (2 -> 9 -> 5). That is, 617 + 295
   Output: 9 -> 1 -> 2. That is, 912 in linked list form
*/

  // 9 - 7 - 8 | 6 - 8 -5
  // Question: Singly linked list or doubly linked list? assuming singly linked

  /*

    function sumListHelperv1(linkedList) {
      let num = 0 // without using type coersion to convert int to string
      function subroutine(node) {
        base case:
          if node.next is null
            num += node.value
            return
        recursive step:
          subroutine(node)
          num *= 10
          num += node.value
      }
      subroutine(linkedList)
      return num
    }


    function sumListHelperv2(linkedList) {
      let num = 0; // without using type coersion to convert int to string
      loop through linkedList (node)
        if num !== 0
          num *= 10
        num += node.value
        update node to node.next

      return num
    }

    function sumLists(linkedList1, linkedList2) {
      let num1 = sumListHelper(linkedList1), num2 = sumListHelper(linkedList2);
      // let newNum = turn num1 and num2 into integers and add them, then stringify them
      let newNum = num1 + num2;

      let resultLinkedList = new LinkedList();
      stringify newNum loop through it, inserting each value into resultLinkedList
      return resultLinkedList
    }
   */



// 2.6 Palindrome: Implement a function to check if a linked list is a palindrome.
// Question: singly linked or doubly linked?

function LinkedListNode(value) {
  this.head = null;
  this.tail = null;
}

LinkedListNode.prototype.insert = function(value) {
  let newNode = {
    value: value,
    next: null
  };
  if (this.head === null) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }
};

function palindromeCheck(node) {
  let currentNode = node,
    isPalindrome = true;
  function subroutine(node) {
    if (node === null) {
      return;
    }
    subroutine(node.next);
    if (currentNode.value !== node.value) {
      isPalindrome = false;
    }
    currentNode = currentNode.next;
    return;
  }
  subroutine(node);
  return isPalindrome;
}

let example = new LinkedListNode();
example.insert(1);
example.insert(1);
example.insert(1);

//console.log( palindromeCheck(example.head) );

/*
  2.7 Intersection:
  Given two (singly) linked lists, determine if the two lists intersect. Return
  the intersecting node. Note that the intersection is defined based on
  reference, not value. That is, if the kth node of the firstlinked list is the
  exact same node (by ref) as the jth node of the second linked list, then they
  are intersecting.
*/

// Version 1, non-constant space

  function linkedListIntersection(ll1, ll2) {
    let record = {};
    while (ll1) {
      if (!record[JSON.stringify(ll1)]) {
        record[JSON.stringify(ll1)] = [];
      }
      record[JSON.stringify(ll1)].push(ll1);
      ll1 = ll1.next;
    }
    while (ll2) {
      console.log(ll2);
      if (record[JSON.stringify(ll2)]) {
        for (let i = 0; i < record[JSON.stringify(ll2)].length; i++) {
          if (record[JSON.stringify(ll2)][i] === ll2) {
            return true;
          }
        }
      }
      ll2 = ll2.next;
    }
    return null;
  }

// Version 2, constant space
  // in case we don't have a convenient size method/property on our linked list class
  function getTailNodeAndSize(llHead) {
    let node = llHead, size = 0;
    while (node.next !== null) {
      size++;
      node = node.next;
    }
    return {tail: node, size: size};
  }

  function linkedListIntersection(ll1, ll2) {
    let ll1Info = getTailNodeAndSize(ll1),
      ll2Info = getTailNodeAndSize(ll2),
      longest = (ll1Info.size >= ll2Info.size) ? ll1 : ll2,
      shortest = (ll1Info.size <= ll2Info.size) ? ll1 : ll2,
      diff = Math.max(ll1Info.size, ll2Info.size) - Math.min(ll1Info.size, ll2Info.size);

    // if tails aren't the same, then they don't intersect; short circuits fn
    if (ll1Info.tail !== ll2Info.tail) {
      return false;
    }

    // "chop off" the difference from longest (break off into helper function?)
    while (diff) {
      longest = longest.next;
      diff -= 1;
    }

    // loop over longest and shortest and compare each node
    while (longest && shortest) {
      if (longest === shortest) {
        return longest;
      }
      longest = longest.next;
      shortest = shortest.next;
    }
  }

/*
  2.8 Loop Detection:
  Given a circular linked list, implement an algorithm that returns the node at
  the beginning of the loop.

  Definition: Circular linked list in which a node's next pointer points to an
  earlier node, so as to make a loop in the linked list

  Example:
   Input: A -> B -> C -> D -> E -> C (same C as before)
   Output: C

*/
function loopDetector(linkedlist) {
  let slowPointer = linkedlist.next,
    fastPointer = linkedlist.next.next;

  while (slowPointer !== fastPointer) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;
  }

  fastPointer = linkedlist;

  while (slowPointer !== fastPointer) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next;
  }

  return slowPointer;
}
