class Graph {
  constructor() {
    this.nodes = {};
  }

  insert(value) {
    const newNode = { value, edges: {} };
    this.nodes[value] = newNode;
  }

  remove(value) {
    const removedNode = this.nodes[value];
    for (const node in removedNode.edges) {
      delete removedNode.edges[node].edges[value];
    }
    removedNode.edges = {};
    return removedNode;
  }

  addEdge(value1, value2) {
    this.nodes[value1].edges[value2] = this.nodes[value2];
  }

  removeEdge(value1, value2) {
    delete this.nodes[value1].edges[value2];
  }

  hasEdge(value1, value2) {
    return this.nodes[value1].edges[value2];
  }
}

/*
  4.1 Route Between Nodes
  Given a directed graph, design an algorithm to find out whether there is a
  route between two nodes.
 */

function isConnected(value1, value2, graph) {
  const queue = [];
  let current;
  queue.push(graph.nodes[value1]);
  while (queue.length > 0) {
    current = queue.pop();
    current.visited = true;
    if (graph.hasEdge(current.value, value2)) {
      return true;
    }
    for (let node in current.edges) {
      const childNode = current.edges[node];
      if (!graph.nodes[childNode].visited) {
        queue.push(childNode);
      }
    }
  }
  return false;
}

function routeBetweenNodes(value1, value2, graph) {
  let foundRoute;
  foundRoute = isConnected(value1, value2, graph);
  foundRoute = foundRoute || isConnected(value2, value1, graph);
  return foundRoute;
}

/*
  4.2 Minimal Tree
  Given a sorted (increasing order) array with unique integer elements, write an
  algorithm to create a binary search tree with minimal height.
 */
class BinarySearchTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function minimalTree(sortedArray) {
  function subroutine(array, start, end) {
    if (end < start) {
      return null;
    }
    const mid = Math.round((start + end) / 2);
    const node = new BinarySearchTree(array[mid]);
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
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  insert(value) {
    // var newNode = {
    //   value: value,
    //   next: null
    // };
    const newNode = value;
    newNode.next = null;
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.count += 1;
  }

  foreach(cb) {
    let current = this.head;
    while (current !== null) {
      cb(current);
      current = current.next;
    }
  }

  size() {
    return this.count;
  }
}


function listOfDepths(treeHead) {
  const depthList = [];
  let currentList = new LinkedList();
  let parents;

  currentList.insert(treeHead);
  depthList.push(currentList);

  while (currentList.size() > 0) {
    parents = currentList;
    depthList.push(currentList);
    currentList = new LinkedList();

    // loop over most recent list
    depthList[depthList.length - 1].foreach(node => {
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
  const depthList = [];

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
function findMaxDepth(node, currentDepth, result) { // result = 0
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
  const leftMaxDepth = findMaxDepth(node.left, 0);
  const rightMaxDepth = findMaxDepth(node.right, 0);

  if (Math.max(leftMaxDepth, rightMaxDepth) - Math.min(leftMaxDepth, rightMaxDepth) > 1) {
    return false;
  } else {
    return isBalanced(node.left) && isBalanced(node.right);
  }
}

// Better Solution


/*
  4.5 Validate BST
  Implement a function to check if a binary tree is a binary search tree.
 */

function recursiveValidation(node, min, max) {
  if (node === null) {
    return true;
  }
  if (node.value < min || node.value > max) {
    return false;
  }
  return recursiveValidation(node.left, min, node.value) &&
        recursiveValidation(node.right, node.value, max);
}

function validateBST(root) {
  return recursiveValidation(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
}


 /*
  4.6 Successor
  Write an algorithm to find the "next" node (i.e. in-order successor) of a
  given binary search tree. YOu may assume that each node has a link to its
  parent.
  */
function successor(node) {
  let current;
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

function fCA(p, q) {
  let current = p;
  while (!areMyChildren(current, p, q)) {
    current = current.parent;
  }
  return current;
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

  const pOnLeft = isMyChild(root.left, p);
  const qOnLeft = isMyChild(root.left, q);

  if (pOnLeft !== qOnLeft) {
    return root;
  }

  const childSide = pOnLeft ? root.left : root.right;
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


// TODO: Refactor
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
  const results = [];

  function subroutine(setSoFar, remainder) {
    if (remainder.length === 0) {
      setSoFar.unshift(root);
      results.push(setSoFar);
      return;
    }

    for (let i = 0; i < remainder.length; i += 1) {
      const newSet = setSoFar.slice();
      const newRemainder = remainder.slice();

      newSet.push(remainder[i]);
      newRemainder.splice(i, 1);

      subroutine(newSet, newRemainder);
    }
  }

  subroutine([], array);

  return results;
}

function findBSTSequence(node) {
  return findPermutations(flattenTree(node), node.value);
}


/*
  4.10 Check Subtree
  T1 and T2 are two very large binary trees, with T1 much bigger than T2. Create
  an algorithm to determine if T2 is a subtree of T1.

  A tree T2 is a subtree of T1 if there exists a node n in T1 such that the
  subtree of n is identicial to T2. That is, if you cut off the tree at node n,
  the two trees would be identical.
 */
 function areIdentical(T1, T2, result) { // result = true
   if (T1 === null && T2 === null) {
     return true;
   }
   if (T1 === null || T2 === null) {
     return false;
   }
   if (T1.value !== T2.value) {
     return false;
   }
   return areIdentical(T1.left, T2.left) && areIdentical(T1.right, T2.right);
 }

function checkSubTree(T1, T2) {
  if (T1 === null) {
    return false;
  }
  if (T1.value === T2.value && areIdentical(T1, T2)) {
    return true;
  }
  return checkSubTree(T1.left, T2) || checkSubTree(T1.right, T2);
}


/*
  4.11 Random Node
  You are implementing a binary tree class from scratch which, in addition to
  insert, find, and delete, has a method getRandomNode() which returns a random
  node from the tree. All nodes should be equally likely to be chosen. Design
  and implement an algorithm for getRandomNode, and explain how you would
  implement the rest of the methods.
 */

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(value) {
    this.root = new TreeNode(value);
    this.size = 0;
  }

  insert(value) {
    const treeNode = new TreeNode(value);
    // finds place to insert new node (recursive)
    this.size += 1;
  }

  getRandomNode() {
    if (root === null) {
      return null;
    }
    const randomInt = Math.random() * this.numOfNodes;
    const count = 0;
    let resultNode;

    function subroutine(node) {
      if (count === randomInt) {
        resultNode = node;
        return;
      }
      subroutine(node.left);
      subroutine(node.right);
    }

    subroutine(this.root);

    return resultNode;
  }
}

class Tree {
  constructor(value) {
    this.root = new TreeNode(value);
    this.size = 0;
  }

  getRandomNode() {
    if (root === null) {
      return null;
    }
    const randomInt = Math.random() * this.size();
    return root.getIthNode(randomInt);
  }

  getIthNode(i) {
    const leftSize = (this.left === null) ? 0 : this.left.size();
    if (i < leftSize) {
      return this.left.getIthNode(i);
    } else if (i === leftSize) { // if random integer is equal to current node's size property
      return this;
    } else {
      return this.right.getIthNode(i - (leftSize + 1)); // skipping left hand side's nodes
    }
  }
}

/*
  4.12 Paths with Sum
  You are given a binary tree in which each node contains an integer value
  (which might be positive or negative). Design an algorithm to count the number
  of paths that sum to a given value. The path does not need to start or end at
  the root or a leaf, but it must go downwards (traveling only from parent nodes
  to child nodes).
 */

function pathsWithSum(root, target) {
  let count = 0;

  function subroutine(node, sumSoFar) { // sumSoFar = []
    if (node === null) {
      return;
    }
    // TODO: refactor so we're not making a copy every time
    const newSums = sumSoFar.map((sum) => {
      return sum += node.value;
    });

    newSums.push(node.value);
    const index = newSums.indexOf(target);

    if (index !== -1 && index !== newSums.length - 1) {
      count += 1;
    }

    subroutine(node.left, newSums);
    subroutine(node.right, newSums);
  }

  subroutine(root, []);

  return count;
}
