function Graph() {
  this._nodes = {};
}

Graph.prototype = {
  insert: function(value) {
    var newNode = {value: value, edges: {}};
    this._nodes[value] = newNode;
  },
  remove: function(value) {
    var removedNode = this._nodes[value];
    for (var node in removedNode.edges) {
      delete removedNode.edges[node].edges[value];
    }
    removedNode.edges = {};
    return removedNode;
  },
  addEdge: function(value1, value2) {
    this._nodes[value1].edges[value2] = this._nodes[value2];
  },
  removeEdge: function(value1, value2) {
    delete this._nodes[value1].edges[value2];
  },
  hasEdge: function(value1, value2) {
    return this._nodes[value1].edges[value2];
  }
};

/*
  4.1 Route Between Nodes
  Given a directed graph, design an algorithm to find out whether there is a
  route between two nodes.
 */

 function isConnected(value1, value2, graph) {
   var queue = [], current;
   queue.push(graph._nodes[value1]);
   while (queue.length > 0) {
     current = queue.pop();
     current.visited = true;
     if (graph.hasEdge(current.value, value2)) {
       return true;
     }
     for (var node in current.edges) {
       var childNode = current.edges[node];
       if (!graph._nodes[childNode].visited) {
         queue.push(childNode);
       }
     }
   }
   return false;
 }

 function routeBetweenNodes(value1, value2, graph) {
   var foundRoute;
   foundRoute = isConnected(value1, value2, graph);
   foundRoute = foundRoute || isConnected(value2, value1, graph);
   return foundRoute;
 }

/*
  4.2 Minimal Tree
  Given a sorted (increasing order) array with unique integer elements, write an
  algorithm to create a binary search tree with minimal height.
 */
 function BinarySearchTree(value) {
   this.value = value;
   this.left = null;
   this.right = null;
 }

 function minimalTree(sortedArray) {
   function subroutine(array, start, end) {
     if (end < start) {
       return null;
     }
     var mid = Math.round( ( start + end ) / 2 ),
       node = new BinarySearchTree(array[mid]);
     node.left = subroutine(array, start, mid - 1);
     node.right = subroutine(array, mid + 1, end);
     return node;
   }

   return subroutine(sortedArray, 0, sortedArray.length - 1);
 }

/*
  4.3 List of Depths
  Given a binary tree, design an algorithm which creates a linked list of all
  the nodes at each depth (e.g., if you have a tree with depth D, you'll have D
  linked lists).
 */

// Breadth First Search Solution:
 function LinkedList(value) {
   this.head = null;
   this.tail = null;
   this.count = 0;
 }

 LinkedList.prototype = {
   insert: function(value) {
     // var newNode = {
     //   value: value,
     //   next: null
     // };
     newNode = value;
     newNode.next = null;
     if (this.head === null) {
       this.head = newNode;
       this.tail = newNode;
     } else {
       this.tail.next = newNode;
       this.tail = newNode;
     }
     this.count++;
   },
   foreach: function(cb) {
     var current = this.head;
     while (current !== null) {
       cb(current);
       current = current.next;
     }
   },
   size: function() {
     return this.count;
   }
 };

 function listOfDepths(treeHead) {
   var depthList = [],
     currentList = new LinkedList(),
     parents;

   currentList.insert(treeHead);
   depthList.push(currentList);

   while (currentList.size() > 0) {
     parents = currentList;
     depthList.push(currentList);
     currentList = new LinkedList();

     // loop over most recent list
     depthList[depthList.length - 1].foreach( function(node) {

       // add the children to the current list
       if (node.left !== null) {
         currentList.insert(node.left);
       }
       if (node.right !== null) {
         currentList.insert(node.right);
       }
     });
   }

   return depthList;
 }

 // Depth First Search Solution:
 function listOfDepths(treeHead) {
  var depthList = [];

  function subroutine(node, depth) {
    if (node === null) {
      return;
    }
    if (!depthList[depth]) {
      depthList[depth] = new LinkedList();
    }
    depthList[depth].insert(node);
    subroutine(node.left, depth + 1);
    subroutine(node.right, depth + 1);
  }

  subroutine(treeHead, 0);

  return depthList;
}

/*
  4.4 Check Balanced
  Implement a function to check if a binary tree is balanced. For the purposes
  of this question, a balanced tree is defined to be a tree such that the
  heights of the two subtrees of any node never differ by more than one.
 */

// Brute Force Solution
 function findMaxDepth(node, currentDepth, result = 0) {
     if (node === null) {
       if (currentDepth > result) {
         result = currentDepth;
       }
       return result;
     }

     result = findMaxDepth(node.left, currentDepth + 1, result);
     result = findMaxDepth(node.right, currentDepth + 1, result);
     return result;
   }

 function isBalanced(node) {
   if (node === null) {
     return true;
   }
   var leftMaxDepth = findMaxDepth(treeHead.left, 0),
       rightMaxDepth = findMaxDepth(treeHead.right, 0);

   if ( Math.max(leftMaxDepth, rightMaxDepth) - Math.min(leftMaxDepth, rightMaxDepth) > 1 ) {
     return false
   } else {
     return isBalanced(node.left) && isBalanced(node.right);
   }
 }

// Better Solution



/*
  4.5 Validate BST
  Implement a function to check if a binary tree is a binary search tree.
 */

 function validateBST(root) {
   return recursiveValidation(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
 }

 function recursiveValidation(node, min, max) {
   if (node === null) {
     return true;
   }
   if (node.value < min || node.value > max) {
     return false;
   }
   return recursiveValidation(node.left, min, node.value) && recursiveValidation(node.right, node.value, max);
 }

 /*
  4.6 Successor
  Write an algorithm to find the "next" node (i.e. in-order successor) of a
  given binary search tree. YOu may assume that each node has a link to its
  parent.
  */
  function successor(node) {
  var current;
  if (node.right) {
    current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current.value;
  }
  if (node.parent) {
    current = node;
    while (current.parent && current.parent.value < node.value) {
      current = current.parent;
    }
    return current.parent ? current.parent.value : null; // review
  }
}

/*
  4.7 Build Order
  You are given a ist of projects and a list of dependencies (which is a list of
  pairs of projects, where the second project is dependent on the first project).
  All of a project's dependencies must be built before the project is. Find a
  build order that will allow the projects to be built. If there is no valid
  build order, return an error.

  Example
  Input:
    projects: a, b, c, d, e, f
    dependencies: (a, d), (f, b), (b, d), (f, a), (d, c)
  Output: f, e, a, b, d, c
 */



/*
  4.8 First Common Ancestor
  Design an algorithm and write code to find the first common ancestor of two
  nodes in a binary tree. Avoid storing additional nodes in a data structure.
  NOTE: This is not necessarily a binary search tree.
 */

// Naive Solution (assuming each node has reference to parent)

 function fCA(p, q) {
    var current = p;
    while ( !areMyChildren(current, p, q) ) {
      current = current.parent;
    }
    return current;
 }

 function isMyChild(root, node) {
   if (root === null) {
     return false;
   }
   if (root === node) {
     return true;
   }

   return isMyChild(root.left, node) || isMyChild(root.right, node);
 }

 function areMyChildren(root, node1, node2) {
   return isMyChild(root, node1) && isMyChild(root, node2);
 }

// Advanced Solution

 function isMyChild(root, node) {
  if (root === null) {
    return false;
  }
  if (root === node) {
    return true;
  }

  return isMyChild(root.left, node) || isMyChild(root.right, node);
}

 // TODO: check if both nodes are in tree
 function fCA(root, p, q) {
   if (root === null || root === p || root === q) {
     return root;
   }

  var pOnLeft = isMyChild(root.left, p),
      qOnLeft = isMyChild(root.left, q);

  if (pOnLeft !== qOnLeft) {
    return root;
  }

  var childSide = pOnLeft ? root.left : root.right;
  return fCA(childSide, p, q);
 }


/*
  4.9 BST Sequences
  A binary search tree was created by traversing through an array from left to
  right and inserting each element. Given a binary search tree with distinct
  elements, print all possible arrays that could have led to this tree.

  Example:
     2
    / \
   1   3  -> [[2, 1, 3], [2, 3, 1]]
 */

// input: tree root
// output: array of arrays or sets
// constraints: distinct elements
// edge cases:

function findBSTSequence(node) {
  return findPermutations( flattenTree(node) , node.value);
}

function flattenTree(root) {
  var result = [];

  function subroutine(node) {
    if (node === null) {
      return null;
    }
    if (node !== root) {
      result.push(node.value);
    }

    subroutine(node.left);
    subroutine(node.right);
  }

  subroutine(root);
  return result;
}

function findPermutations(array, root) {
  var results = [];

  function subroutine(setSoFar, remainder) {
    if (remainder.length === 0){
      setSoFar.unshift(root);
      results.push(setSoFar);
      return;
    }

    for (var i = 0; i < remainder.length; i++) {
      var newSet = setSoFar.slice(),
          newRemainder = remainder.slice();

      newSet.push(remainder[i]);
      newRemainder.splice(i, 1);

      subroutine( newSet, newRemainder );
    }
  }

  subroutine([], array);

  return results;
}



/*
  4.10 Check Subtree
  T1 and T2 are two very large binary trees, with T1 much bigger than T2. Create
  an algorithm to determine if T2 is a subtree of T1.

  A tree T2 is a subtree of T1 if there exists a node n in T1 such that the
  subtree of n is identicial to T2. That is, if you cut off the tree at node n,
  the two trees would be identical.
 */



/*
  4.11 Random Node
  You are implementing a inary tree class from scratch which, in addition to
  insert, find, and delete, has a method getRandomNode() which returns a random
  node from the tree. All nodes should be equally likely to be chosen. Design
  and implement an algorithm for getRandomNode, and explain how you would
  implement the rest of the methods.
 */


/*
  4.12 Paths with Sum
  You are given a binary tree in which each node contains an integer value
  (which might be positive or negative). Design an algorithm to count the number
  of paths that sum to a given value. The path does not need to start or end at
  the root or a leaf, but it must go downards (traveling only from parent nodes
  to child nodes).
 */
