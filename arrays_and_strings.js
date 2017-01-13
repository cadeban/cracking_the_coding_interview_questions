// 1.1 Is Unique: Determine if a string has all unique characters.
// What if you can't use additional data structures?
/*
  Naive:
    function isUnique(string){
      counter object = {}
      loop through string
         if object has current item as property
           return false
        else
          set current item as a property on counter object
      return true
    }

  N Log N sort:
    function isUnique(string) {
      mergeSort(string)
      loop through string until length -2
        if current item matches next item
          return false
      return true
    }

  Without Additional Stuctures (not possible to do with JS, since strings are immutable):
    function isUnique(string) {
      turn string into array and then sort string in place
      loop through string until length - 2
        if current item matches next item
          return false
      return true
    }
*/

// 1.2 Check Permutation: Given two strings, write a method to decide if one is
// a permutation of the other.

/*
  Questions: String is all caps? Spaces? Any time/space constraints?

  Naive:
  function checkPermutations(stringA, stringB) {
    sort stringA
    sort stringB
    return stringA === stringB
  }

  function checkPermutations(stringA, stringB) {
    mergeSort stringA
    loop through stringB
      binarySearch through stringA for current character in stringB
        if stringA does not have the current character
          return false
    return true
  }

  function checkPermutations(stringA, stringB) {
    translate stringA into a hash
    loop over stringB
      if current character is not in hash
        return false
    return true
  }

 */

// 1.3 URLify: Write a method to replace all spaces in a string with '%20'. You
// may assume that the string has sufficient space at the end to hold the
// additional characters, and that you are given the "true" length of the string.

/*
  function URLify(string) {
    turn string into an array
    loop over stringArray
      if current chracter equals empty space
        replace with '%20'
    return joined string
  }

*/

// 1.4 Palindrome Permutation: Given a string, write a function to check if it
// is a permutation of a palindrome. A palindrome is a word or phrase that is
// the same forwards and backwards. A permutation is a rearrangement of letters.
// The palindrome does not need to be limited to just dictionary words.

/*

  Questions to ask: Does capitalization matter? What about spaces? Are there
  any time or space constraints?

  Definition:
    there should be at max only one odd number of character frequency. everything
    else should be even

    // naive

      function checker(counter, string) { (previously isOdd)
        let odds = 0;
        loop over counter
          if current item is odd
            increment odds
        return false if odds > 1; otherwise return true
      }

      function palindromePermutation(string) {
        let counter = {}
        loop over string
          if counter does not have current item
            set current item on counter to 0
          increment counter

        return checker(counter, string)
      }

  // without additional data structures

    function palindromePermutation(string) {
      let countOdds = 0;
        loop over string (i)
          let currentCount = 0;
          loop over string (j)
            if i !== j && string[i] === string[j]
              increment currentCount
          if count is not even
            increment countOdds
        if countOdds > 1
          return false
      return true
    }

*/

// 1.5 One Away: There are three types of edits that can be performed on strings:
// insert, remove, or replace a character. Given two strings, write a function to
// check if they are one edit or zero edits away. (i.e. pale, ple -> true)

/*

  Questions: Does capitalization matter? Any time/space constraints?
  Examples: 'pale', 'ple' -> true

  // naive implementation:

    function oneAway(stringA, stringB) {
      // insert, remove, replace

      if stringA.length - stringB.length > 1
        return false
      loop through longerString (i)
        let splicedLongerString = longerString.splice(i, i+1)
        if splicedLongerString === smallerString
          return true
        if splicedLongerString === smallerString.splice(i, i+1)
          return true

       return false
    }

  // better implementation:

    function oneAway(stringA, stringB) {
      // insert, remove, replace
      let checkers = {
        replaceCheck: function(stringA, stringB) {
          let diffCount = 0
          loop through stringA (i)
            if stringA[i] !== stringB[i]
              increment diffCount
            if diffCount > 1
              return false
          return true
        },
        insertRemoveCheck = function(stringA, stringB){
          set new variable diffCount to 0
          set longerString to stringA if stringA.length > stringB.length;
            otherwise, set it to stringB
          loop over longerString (i)
            // handle first and last element
            if smaller string[i-1], smaller string [i], or smaller string[i + 1] !== longerString[i]
              increment diffCount
            if diffCount > 1
              return false
          return true
        }
      };

      if stringA.length - stringB.length > 1
        return false

      if lengths match
        return checkers.replaceCheck(stringA, stringB);

      if lengths don't match
        return checkers.insertRemoveCheck(stringA, stringB);
    }

*/

// 1.6 String Compression: Implement a method to perform basic string compression
// using the counts of repeated characters. For example, the string aabcccccaaa
// would become a2b1c5a3. If the 'compressed' string would not become smaller
// than the original string, your method should return the original string. You
// can assume the string has only uppercase and lowercase letters (a-z).

/*

  Questions: Any time/space complexity constraints?
  Examples: aabcccccaaa -> a2b1c5a3, abc -> a1b1c1

  function stringCompression(string) {
    let compressedString = '';
    let count = 1
    loop over string starting from index 1
      if current item matches the previous item
        increment count
      else
        add prev. item and count to the end of compressedString
        reset count to one

    if compressedString.length < string.length
      return compressedString
    else
      return string
  }

  // maybe consider an unrolled linked list?

*/

// 1.7 Rotate Matrix: Given an image represented by an NxN matrix, where each
// pixel in the image is 4bytes, write a method to rotate the image by
// 90 degrees. Can you do this in place?

/*

  Questions:
  Example:
  [
    [1,  2,  3,  4],
    [5,  6,  7,  8],
    [9,  10, 11, 12],
    [13, 14, 15, 16]
  ]
  becomes:
  [
    [13, 9,  5, 1],
    [14, 10, 6, 2],
    [15, 11, 7, 3],
    [16, 12, 8, 4]
  ]

       i  j
  1:  [0][0] -> 16 [0][3]
  5:  [1][0] -> [0][2]
  9:  [2][0] -> [0][1]
  13: [3][0] -> [0][0]

  2:  [0][1] -> [1][3]
  6:  [1][1] -> [1][2]
  10: [2][1] -> [1][1]
  14: [3][1] -> [1][0]

  4:  [0][3] -> [3][3]

  naive: (O)n^2
    function rotateMatrix(matrix) {
      let newMatrix = [];
      loop backward over matrix (i)
        let row = []
        loop over matrix (j)
          push item at matrix[j][i] into row
        push row into newMatrix

      return newMatrix
    }

  in place:

    function rotateMatrix(matrix) {
      let mapping = {0: 3, 1: 2, 2: 1: 3: 0 }
      currentI = 0
      currentJ = 0
      current item = null 1
      next item = null 4
      rotated = 0
      while rotated <= 16
        set current item to element at matrix[currentI][currentJ] (matrix[0][0] === 1)
        set next item to matrix[currentJ][mapping[currentI]] (matrix[0][3] === 4)

        set matrix[currentj][mapping[currentI]] to current item (1)

        set currentI to currentj
        set currentJ to iMapping[i]
        rotated++

      return matrix
    }

    function rotateMatrix(matrix) {
      let mapping = {0: 3, 1: 2, 2: 1: 3: 0 }
      currentI = 0
      currentJ = 0
      current item = null 1
      next item = null 4
      rotated = 0
      while rotated <= 16
        set current item to element at matrix[currentI][currentJ] (matrix[0][0] === 1)
        set next item to matrix[currentJ][mapping[currentI]] (matrix[0][3] === 4)

        set matrix[currentj][mapping[currentI]] to current item (1)

        set currentI to currentj
        set currentJ to iMapping[i]
        rotated++

      return matrix
    }

    function rotateMatrix(matrix) { ***
      if (matrix.length === 0 || matrix.length !== matrix[0].length) {
        return false;
      }

      const n = matrix.length;

      for (let layer = 0; layer < n / 2; layer++) { // loop over the length of the matrix
        let first = layer; // 0 -> 1 -> 2 -> 3
        let last = n - 1 - layer; 4 - 1 - layer

        for (let i = first; i < last; i++) { // loop from i to first
          let offset = i - first;

          let top = marix[first][i];
          // left -> bottom
          matrix[first][i] = matrix[last-offset][first];

          // bottom -> left
          matrix[last-offset][first] = matrix[last][last - offset]

          // right -> bottom
          matrix[last][last-offset] = matrix[i][last]

          // top -> right
          matrix[i][last] = top // right <- saved top
        }
        return true;
      }
    }
*/

// 1.8 Zero Matrix: Write an algorithm such that if an element in an MxN matrix
// is 0, its entire row and column are set to 0.

/*

  Questions: in place? time/space constraints?
  Example:
  [
    [0,  2,  3,  4],
    [5,  0,  7,  8, 10],
    [9,  1, 11, 12, 13, 14]
  ]

  function zeroMatrix(matrix) {
    let zeroIndices = {} -> [1, 1]
    loop over matrix's rows
      loop over items in current row
        if current item is 0
          add [row, col] to zeroIndicies

    loop through zeroIndices (prop)
      replace matrix[prop[0]] with row of 0s
      loop through zero Matrix's rows
        replace matrix[row][zeroIndices[prop][1]] with 0

    return matrix
  }

  function zeroMatrix(matrix) {
    let longest row = [0, 0]
    loop over matrix's row's
      if current row's length is greater than longest row's[1]
        set longest row [0] to current row
        set longest row [1] to current row's length

    append array of nulls with a length of longest row [1] to matrix's row

    loop over matrix's rows
      loop over items in current row
        if current item is 0
          append 0 to current row
          mark index in matrix's last row (index === current item's col)

    loop over matrix's rows
      set current row's

      if current row's last item === 0
      set row to 0s

    return matrix
  }

*/

// 1.9 String Rotation: Assume you have a method isSubstring which checks if one
// word is a substring of another. Given two strings, s1 and s2, write code to
// check if s2 is a rotation of s1 using only one call to isSubstring
// (i.e. 'waterbottle' is a rotation of 'erbottlewat')

/*
  Questions: Time/space complexity?
  Example: 'waterbottle' -> 'erbottlewat', 'abc' -> 'cab'

  isSubstring(string, frag) {
    // returns boolean if frag is in string
  }

  function stringRotation(s1, s2) {
    startIndex
    loop through s2 (current index = i)
      if current item === s1[0]
        if !subString( s2.substring(i), s1 ) || !subString( s2.substring(0, i), s1)
          return false

    return true
  }

  function stringRotation(s1, s2) {
    startIndex
    loop through s2 (current index = i)
      if current item === s1[0]
        if !subString( s2.substring(i), s1 ) || !subString( s2.substring(0, i), s1)
          return false

    return true
  }

  function stringRotation(s1, s2) {
    startIndex

    if s1 and s2 aren't the same length
      return false

    return subString(s1+s1, s2);
  }

*/
