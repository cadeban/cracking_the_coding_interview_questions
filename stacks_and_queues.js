/* Stack Class */
function Stack() {
  this._stack = [];
}

Stack.prototype = {
  push: function(value) {
    this._stack.push(value);
  },
  pop: function() {
    return this._stack.pop();
  },
  peek: function() {
    return this._stack[this._stack.length - 1];
  },
  isEmpty: function() {
    return this._stack.length === 0;
  },
  size: function() {
    return this._stack.length - 1;
  },
};


/* Three in One:
  Describe how you could use a single array to implement three stacks.
*/

function ThreeStacks() {

}

/* 3.2 Stack Min:
  How would you design a stack which, in addition to push and pop, has a function which returns the minimum element? Push, pop, and min should all operate in O(1) time.
*/

function StackMin() {
  this._stack = new Stack();
  this._min = new Stack();
}

StackMin.prototype = {
  push: function(value) {
    if (this._min.isEmpty() || value < this._min.peek()) {
      this._min.push(value);
    }
    this._stack.push(value);
  },
  pop: function() {
    if (this._stack.isEmpty()) {
      throw Error;
    }
    if (this._stack.peek() === this._min.peek()) {
      this._min.pop();
    }
    return this._stack.pop();
  },
  min: function() {
    if (this._min.isEmpty()) {
      throw Error;
    }
    return this._min.peek();
  }
};

/*  3.3 Stack Of Plates
  Imagine a stack of plates. If the stack gets too high, it might topple.
  Therefore, in real life, we would likely start a new stack when the previous
  stack exceeds some threshold. Implement a data structure setOfStacks that
  mimics this. SetOfStacks should be composed of several stacks and should
  create a new stack once the previous one exceeds capacity. SetOfStacks.push()
  and SetOFStacks.pop() should behave identically to a single stack (that is,
  pop() should return the same values as it would if there were just a single
  stack).

  Follow Up:
  Implement a function popAt(index) which performs a pop operation on a specific substack.
*/

function SetOfStacks(capacity) {
  this._capacity = capacity || 3;
  this._currentStack = 1;
  this._stacks = {
    1: new Stack(),
  };
}

SetOfStacks.prototype = {
  push: function(value) {
    if (this._stacks[this._currentStack].size() === this._capacity ) {
      this._currentStack++;
      this._stacks[this._currentStack] = new Stack();
    }
    this._stacks[this._currentStack].push(value);
  },
  pop: function() {
    while(this._currentStack > 0 && this._stacks[this._currentStack].isEmpty()) {
      this._currentStack--;
    }
    return (!this._stacks[this._currentStack].isEmpty()) ? this._stacks[this._currentStack].pop() : null;
  },
  // popAt: function(index) {
  //   return this._stacks[index].pop();
  // },
  popAt: function(index) {
    //* is there a way to amortize this?
    var topOfIndex = this._stacks[index].pop(); //4
    /*Reshift latter stacks*/
    var tempStack = new Stack();
    while (index++ < this._currentStack) {
      while (!this._stacks[index].isEmpty()) {
        tempStack.push( this._stacks[index].pop() );
      }

      while (!tempStack.isEmpty()) {
        var addToStacks = tempStack.pop();
        if ( this._stacks[index - 1] && (this._stacks[index - 1].size() !== this._capacity) ) {
          this._stacks[index - 1].push(addToStacks);
        } else {
          this._stacks[index].push(addToStacks);
        }
      }
    }
    return topOfIndex;
  }
};

/**
 * 3.4 Queue Stack
 */

 function QueueStack () {
   this._firstStack = new Stack();
   this._secondStack = new Stack();
 }

 QueueStack.prototype = {
   enqueue: function(value) {
     this._firstStack.push(value);
   },
   dequeue: function() {
     if (this._firstStack.isEmpty && this._secondStack.isEmpty()) {
       throw Error;
     }
     if (this._secondStack.isEmpty()) {
       while (!this._firstStack.isEmpty()) {
         this._secondStack.push(this._firstStack.pop());
       }
     }
     return this._secondStack.pop();
   }
 };

/*
  3.5 Sort Stack
  Write a program to sort a stack such hat the smallest items are on the top.
  You can use an additional temporary stack, but you may not copy the elements
  into any other data structure (such as an array). The stack supports the
  following operations: push, pop, peek, and isEmpty.
 */

 //TODO: Add mergeSort version, which uses more than one temporary stack

 function sortStack( stack ) {
   if ( stack.isEmpty() ) {
     return null;
   }
   var tempStack = new Stack();
   var currentTop = stack.pop();

   while ( !stack.isEmpty() ) {
     var currentTop = stack.pop();
     while ( tempStack.peek() > currentTop ) {
       stack.push( tempStack.pop() );
     }
     tempStack.push( currentTop );
   }

   while ( !tempStack.isEmpty() ) {
     stack.push( tempStack.pop() );
   }

   return stack;
 }

/*
  3.6 Animal Shelter
  An animal shelter, which holds only dogs and cats, operates on a stictly
  "First In, First Out" basis. People must adopt either the "oldest" (based on
  arrival time) of all animals at the shelter, or they select whether they would
  prefer a dogt or a cat (and will receive the oldest animal fo that type). They
  cannot select which specific animal they would like. Create the data
  structures to maintain this system and implement operations such as enqueue,
  dequeueAny, dequeueDog, and dequeueCat. You may use the built-in LinkedList
  data structure.
 */
 function LinkedList() {
   this._head = null;
   this._size = 0;
 }

 LinkedList.prototype = {
   insert: function(value) {
       var newNode = { value: value, next: null, };
       // if empty, set head to new node
       if (this._head === null) {
         this._head = newNode;

       // otherwise, add to tail
       } else {
         var currentNode = this._head;
         while ( currentNode.next !== null ) {
           currentNode = currentNode.next;
         }
         currentNode.next = newNode;
       }
       this._size++;
     },
     // removes head only
     remove: function() {
       var currentNode = null;
       if (this._head !== null) {
         currentNode = this._head;
         this._head = this._head.next;
       }
       return currentNode.value;
     },
   peek: function() {
     return (this._head !== null) ? this._head.value : null;
   },
 };

 function Queue() {
   this._queue = new LinkedList();
 }

 Queue.prototype = {
   enqueue: function( value ) {
     this._queue.insert( value );
   },
   dequeue: function() {
     return this._queue.remove();
   },
   peek: function() {
     return this._queue.peek();
   },
   isEmpty: function() {
     return this._queue._head === null;
   },
 };

 function AnimalShelter () {
   this._catQueue = new Queue();
   this._dogQueue = new Queue();
   this._id = 0;
 }

 AnimalShelter.prototype = {
   enqueue: function(name, type) { // could have Dog or Cat classes
     var data = { name: name, type: type, id: this._id };
     (type === 'dog') ? this._dogQueue.enqueue(data) : this._catQueue.enqueue(data);
     this._id++;
   },
   dequeueAny: function() {
     // consider the possibility of none in each case
     return (this._dogQueue.peek() < this._catQueue.peek()) ? this.dequeueDog() : this.dequeueCat();
   },
   dequeueDog: function() {
     return this._dogQueue.dequeue();
   },
   dequeueCat: function() {
     return this._catQueue.dequeue();
   }
 };
