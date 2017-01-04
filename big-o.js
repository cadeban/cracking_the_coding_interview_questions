// VI.1 Linear to the size of b, because we are looping from 0 - b in the for loop,
//  yet only making constant use of of a when we access it to add to sum. Therefore,
//  b is the only input size that matters.

// VI.2 Linear to the size of b, because every time we call the power method,
//  we're subtracting one from b until we reach 0.

// VI.3 Constant. The function is all math, and doesn't require any incrementing.

// VI.4 a/b, since we will be performing operations dependent on how many times b
//   goes into a.

// VI.5 Logarithmic, since we're dividing where we need to search in half each time.

// VI.6 Sqrt(n) ***

// VI.7 linear?

// VI.8 linear?

// VI.9 Quadratic, because for each item in the array passed to copyArray, we're
// invoking appendToNew, which is also a linear operation since it's iterating over
// the input.

// VI.10 n/10 *** (log n ??)
