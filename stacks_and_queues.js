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
