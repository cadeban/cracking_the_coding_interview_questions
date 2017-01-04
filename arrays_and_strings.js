// 1.1 Is Unique: Determine if a string has all unique characters.
// What if you can't use additional data structures?

// Pseudocode:
/*
  Naive:
    function isUnique(string){
      // counter object = {}
      // loop through string
         // if object has current item as property
           // return false
        // else
          // set current item as a property on counter object
      // return true
    }

  Without Additional Stuctures:
    function isUnique(string) {
      // sort string in place
      // loop through string until length - 2
        // if current item matches next item
          // return false
      // return true
    }
*/
