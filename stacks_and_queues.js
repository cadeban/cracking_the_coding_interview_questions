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
  }
};


/* Three in One:
  Describe how you could use a single array to implement three stacks.
*/

/* Stack Min:
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
