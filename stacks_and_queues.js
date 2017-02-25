/* Stack Class */
class Stack {
  constructor() {
    this.stack = [];
  }

  push(value) {
    this.stack.push(value);
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  size() {
    return this.stack.length - 1;
  }
}


/* Three in One:
  Describe how you could use a single array to implement three stacks.
*/

class ThreeStacks {

}

/* 3.2 Stack Min
  How would you design a stack which, in addition to push and pop, has a
  function which returns the minimum element? Push, pop, and min should all
  operate in O(1) time.
*/

class StackMin {
  constructor() {
    this.stack = new Stack();
    this.min = new Stack();
  }
  push(value) {
    if (this.min.isEmpty() || value < this.min.peek()) {
      this.min.push(value);
    }
    this.stack.push(value);
  }
  pop() {
    if (this.stack.isEmpty()) {
      throw Error;
    }
    if (this.stack.peek() === this.min.peek()) {
      this.min.pop();
    }
    return this.stack.pop();
  }
  min() {
    if (this.min.isEmpty()) {
      throw Error;
    }
    return this.min.peek();
  }
}


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

class SetOfStacks {
  constructor(capacity) {
    this.capacity = capacity || 3;
    this.currentStack = 1;
    this.stacks = {
      1: new Stack(),
    };
  }

  push(value) {
    if (this.stacks[this.currentStack].size() === this.capacity) {
      this.currentStack += 1;
      this.stacks[this.currentStack] = new Stack();
    }
    this.stacks[this.currentStack].push(value);
  }
  pop() {
    while (this.currentStack > 0 && this.stacks[this.currentStack].isEmpty()) {
      this.currentStack -= 1;
    }
    return (!this.stacks[this.currentStack].isEmpty()) ?
            this.stacks[this.currentStack].pop() : null;
  }
  // popAt: function(index) {
  //   return this._stacks[index].pop();
  // },
  popAt(index) {
    //* is there a way to amortize this?
    const topOfIndex = this.stacks[index].pop();
    /* Reshift latter stacks */
    const tempStack = new Stack();
    while ((index += 1) < this.currentStack) { // TODO: Fix index assignment
      while (!this.stacks[index].isEmpty()) {
        tempStack.push(this.stacks[index].pop());
      }

      while (!tempStack.isEmpty()) {
        const addToStacks = tempStack.pop();
        if (this.stacks[index - 1] && (this.stacks[index - 1].size() !== this.capacity)) {
          this.stacks[index - 1].push(addToStacks);
        } else {
          this.stacks[index].push(addToStacks);
        }
      }
    }
    return topOfIndex;
  }
}

/**
 * 3.4 Queue Stack
 */

class QueueStack {
  constructor() {
    this.firstStack = new Stack();
    this.secondStack = new Stack();
  }
  enqueue(value) {
    this.firstStack.push(value);
  }

  dequeue() {
    if (this.firstStack.isEmpty && this.secondStack.isEmpty()) {
      throw Error;
    }
    if (this.secondStack.isEmpty()) {
      while (!this.firstStack.isEmpty()) {
        this.secondStack.push(this.firstStack.pop());
      }
    }
    return this.secondStack.pop();
  }
}

/*
  3.5 Sort Stack
  Write a program to sort a stack such hat the smallest items are on the top.
  You can use an additional temporary stack, but you may not copy the elements
  into any other data structure (such as an array). The stack supports the
  following operations: push, pop, peek, and isEmpty.
 */

 // TODO: Add mergeSort version, which uses more than one temporary stack

function sortStack(stack) {
  if (stack.isEmpty()) {
    return null;
  }
  const tempStack = new Stack();
  let currentTop = stack.pop();

  while (!stack.isEmpty()) {
    currentTop = stack.pop();
    while (tempStack.peek() > currentTop) {
      stack.push(tempStack.pop());
    }
    tempStack.push(currentTop);
  }

  while (!tempStack.isEmpty()) {
    stack.push(tempStack.pop());
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
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  insert(value) {
    const newNode = { value, next: null };
    // if empty, set head to new node
    if (this.head === null) {
      this.head = newNode;

    // otherwise, add to tail
    } else {
      let currentNode = this.head;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }
    this.size += 1;
  }
    // removes head only
  remove() {
    let currentNode = null;
    if (this.head !== null) {
      currentNode = this.head;
      this.head = this.head.next;
    }
    return currentNode.value;
  }

  peek() {
    return (this.head !== null) ? this.head.value : null;
  }
}

class Queue {
  constructor() {
    this.queue = new LinkedList();
  }
  enqueue(value) {
    this.queue.insert(value);
  }
  dequeue() {
    return this.queue.remove();
  }
  peek() {
    return this.queue.peek();
  }
  isEmpty() {
    return this.queue.head === null;
  }
}

class AnimalShelter {
  constructor() {
    this.catQueue = new Queue();
    this.dogQueue = new Queue();
    this.id = 0;
  }

  enqueue(name, type) { // could have Dog or Cat classes
    const data = { name, type, id: this.id };
    if (type === 'dog') {
      this.dogQueue.enqueue(data);
    } else {
      this.catQueue.enqueue(data);
    }
    this.id += 1;
  }

  dequeueAny() {
   // consider the possibility of none in each case
    return (this.dogQueue.peek() < this.catQueue.peek()) ? this.dequeueDog() : this.dequeueCat();
  }

  dequeueDog() {
    return this.dogQueue.dequeue();
  }

  dequeueCat() {
    return this.catQueue.dequeue();
  }
}
