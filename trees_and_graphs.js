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
