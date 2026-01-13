// 1. remove falsy values
const filtered = arr.filter(Boolean)

// 2. convert any value to boolean
console.log(!!"anything")  // just place !! before

// 3. resizing any array
arr.length = 6

// 4. flattening a multi dimensional array (MD => 1D)
arr.flat(Infinity)  // by default only 1 level flat, so we use Infinity

// 5. short conditionals / short circuiting
a === b && console.log("some")

// 6. replace all occurances of a string
quote.replace(/library/gi, "framework")

// 7. log values with variable names smartly
console.log({ something })

// 8. measuring performance
const start = performance.now()
const end = performance.now()