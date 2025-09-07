## Hoisting
- JavaScript needs to know all variable names in advance to manage scope.

- Hoisting allows the engine to:

    - Recognize the variable exists in this scope.

    - Set up memory for it.

    - Enforce TDZ, preventing accidental usage before initialization.

- Essentially, hoisting is about “creation phase”, not “usable yet”.

## var vs let
- scope
    - var → **function-scoped** (or global if outside a function).
    - let → block-scoped (limited to { ... }).
- redeclaration
    - **var allows, let doesn't**
    - **we can reassign let**
- hoisting
    - var is initialized as undefined.
    - let is hoisted but not initialized → you get **Temporal Dead Zone** (TDZ) error if used before declaration.
        - let is hoisted so JS knows the variable exists in the scope, but TDZ prevents unsafe access until it’s actually declared.
    ```js
    console.log(a);  // undefined
    var = 5;

    console.log(b);  // ReferenceError
    let b = 5;
    ```
- global object property
    - If you declare a **var** at the top level (outside any function), it becomes a property of the global object (`window` in browsers).
    - **let does not**
    ```js
    var x = 100;
    let y = 200;

    console.log(window.x); // ✅ 100
    console.log(window.y); // ❌ undefined
    ```
## const
- **block scope**
```js
const b = 30;
b = 40;   // ❌ TypeError
```
- no rebind
```js
const person = { name: "Arham" };
person.name = "Alice";  // ✅
// person = {}          // ❌

const nums = [1, 2, 3];
nums.push(4);           // ✅
// nums = [9, 8, 7];    // ❌
```

## falsy values
- `false, 0, "", null, undefined, NaN`
- `-0 (negative), 0n (bigint)`

## Everything else is truthy
- **Objects** → {}, [], new Date()
- **Functions** → function() {}

### In JavaScript, truthiness/falsiness is not about “content”, it’s about data type rules when values are converted to Boolean.

## switch
- Strict comparison (===)
    - switch uses strict equality (no type coercion).
    ```js
    let x = "5";
    switch (x) {
        case 5:   // number
            console.log("Number 5");
            break;
        default:
            console.log("Not matched");
    }
    // Output: "Not matched"
    ```
- `break` is important
    - Without break, execution continues into the next case → called **fall-through**.

## Loops
- `for...of`
    - Iterates over values of an **iterable** (arrays, strings, maps, sets, etc.).
    ```js
    let arr = ["a", "b", "c"];
    for (let value of arr) {
        console.log(value);
    }
    ```
- `for...in`
    - Iterates over keys (properties) of an object.
    ```js
    let person = { name: "name", age: 10 };
    for (let key in person) {
        console.log(key, person[key]);
    }
    ```
## Primitive Types
- BigInt
    - For integers bigger than `Number.MAX_SAFE_INTEGER (2^53 - 1)`.
    - Created by adding `n` at the end or using `BigInt()`.
    ```js
    let big = 1234567890123456789012345678901234567890n;
    console.log(big + 2n); // works only with other BigInts

    // Mixing with Number throws error
    // console.log(big + 1); ❌ TypeError
    ```
    - cryptography, IDs, financial calculations
- String
    - **` `** (template literal).
        - let greeting = `Hello, ${name}`; // template literal
    - **Immutable.**
- Null
    - Type is **object** (weird historical bug).
- Symbol
    - Unique and immutable identifier, often used as object keys.
    - No two symbols are equal.
    ```js
    let id1 = Symbol("id");
    let id2 = Symbol("id");
    console.log(id1 === id2);  // false
    ```
    ```js
    const user = {};
    const id = Symbol("id");  // unique key
    user[id] = 123;

    console.log(user[id]);    // 123
    console.log(user.id);     // undefined
    console.log(Object.keys(user)); // Symbol not listed
    ```
    - Normally, you don’t call `Symbol.iterator` directly. It’s used internally by:
        - for...of loops
        - The spread operator `...`
        - Destructuring
- NaN, Infinity

## Object methods
- `Object.keys(obj), Object.values(obj)`
- `Object.entries(obj)`
```js
console.log(Object.entries(user));
// [["name", "name"], ["age", 10], ["country", "BD"]]

for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}
// name: name
// age: 10
// country: BD
```

```js
// Add a non-enumerable property to "user" object
Object.defineProperty(user, "secret", {
  value: "hidden",
  enumerable: false
});

// Output: "hidden"
```

```js
const parent = { country: "Bangladesh" };
const child = Object.create(parent);
child.name = "child_nam";

console.log(Object.keys(child)); 
// ["name"] → own enumerable property only

console.log(child.country); 
// "Bangladesh" → accessible (inherited)
// but not listed in Object.keys()
```

## Object Property Descriptor Flags
- writable
- configurable
- enumerable

## Array Methods
- `reduce()`
    - Reduces an array to a single value by applying a function step by step.
```js
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10
```

- `join()`
    - Joins all array elements into a **string**, separated by the given separator.
```js
const arr = ["a", "b", "c"];
console.log(arr.join());    // "a,b,c"
console.log(arr.join("-")); // "a-b-c"
```

- `shift()`
    - Removes the first element of the array and returns it.
```js
const fruits = ["apple", "banana", "mango"];
console.log(fruits.shift()); // "apple"
console.log(fruits);         // ["banana", "mango"]
```

- `sort()`
    - Sorts array elements in place (changes the original array).
    - By default, **sorts as strings**.
```js
const nums = [10, 2, 5, 1];
console.log(nums.sort());        // [1, 10, 2, 5] → string sort
console.log(nums.sort((a,b) => a - b)); // [1, 2, 5, 10] → numeric sort
```

- `every()`
    - Checks if all elements pass the test. Returns true / false.
```js
const nums = [2, 4, 6];
console.log(nums.every(n => n % 2 === 0)); // true
console.log(nums.every(n => n > 3));       // false
```

- `some()`
    - Checks if at least one element passes the test.

- `find()`
    - Returns the first element that matches a condition.
    - If not found → undefined.
```js
const nums = [5, 10, 15];
console.log(nums.find(n => n > 8));  // 10
console.log(nums.find(n => n > 20)); // undefined
```

- `findIndex()`
    - Returns the index of the first element that matches a condition.
    - If not found → -1.

- `slice()`
    - Returns a shallow copy of a portion of an array into a new array.
    - Does NOT modify the original array.
    ```js
    const fruits = ["apple", "banana", "mango", "orange", "grape"];

    // From index 2 till end
    console.log(fruits.slice(2)); 
    // ["mango", "orange", "grape"]

    // Negative index: last 2 elements
    console.log(fruits.slice(-2)); 
    // ["orange", "grape"]

    // Between -4 and -1 (exclusive)
    console.log(fruits.slice(-4, -1)); 
    // ["banana", "mango", "orange"]

    console.log(fruits); 
    // ["apple", "banana", "mango", "orange", "grape"] → original unchanged

    ```

- `splice()`
    - changes the original array (adds/removes elements).

## String methods
- `trim()`
    - Removes whitespace from start and end.
- `includes()`
    - Returns true if substring is found.
- `substring(st, en)`
    - Similar to slice(), but
        - Does not allow negative indexes.
        - If start > end, it swaps them.
- `substr(st, len)`
    - Takes start index and length (not end).
    - Negative start works.

## set
- unique, Order is preserved (insertion order).
- not sorted
- methods: `.add(v), .has(v), .delete(v), .size()`
```js
let set = new Set();
let set = new Set([1, 2, 3]);
```

## map
- Stores key-value pairs.
- Keys can be any type (object, function, etc).
- sorted on keys
- Methods: `.set(key, value), .get(key), .has(key), .delete(key), .size`

## WeakMap
- Like Map, but with **only objects as keys**.
- Keys are held weakly → if object is garbage-collected, entry disappears.
- No `.size`, no iteration (for security + GC reasons).
```js
let wm = new WeakMap();
let obj = { id: 1 };
wm.set(obj, "Sensitive Data");
console.log(wm.get(obj));   // "Sensitive Data"
obj = null;   // object no longer referenced
// At some point, garbage collector removes entry automatically
```

## flatMap()
- First maps each element, then flattens the result by 1 level.
```js
let arr = [1, 2, 3];
// map → double each number, flatten → expand arrays
let result = arr.flatMap(x => [x, x * 2]);
console.log(result);  // [1, 2, 2, 4, 3, 6]
```

## Functions
- A function is an **object** **with callable** behavior.

## Arrow function: explicit return
- `const f = () => { return value; }` → explicit return

## Arrow function: implicit return
- `const f = () => value;` → implicit return
- To return an object literal, wrap it in **parentheses ()**
```js
// implicit return with object
const makeUser = (name, age) => ({ name, age });
console.log(makeUser("Arham", 22)); 
// { name: "Arham", age: 22 }
```

## IIFE
- Before import/export, IIFEs were a way to create private modules.
- For setting up configurations, event listeners, etc.
- `(function(){})();`

## Lexical scope
- Inner can access vars from outer.

## Closure
- A closure is formed when a function "remembers" the variables from its lexical scope, even after the outer function has finished running.

```js
function makeCounter() {
  let count = 0;   // private variable

  return function() {   // inner function (closure)
    count++;
    return count;
  };
}

const counter1 = makeCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2

const counter2 = makeCounter();
console.log(counter2()); // 1  (separate closure!)
```

```js
for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 1, 2, 3 (closure keeps i for each loop)
```

## Why closure
- Data privacy (hide variables from outside).
- Maintain state (like counters, caches).
- Callbacks & async code rely on closures.
- Used heavily in functional programming and event handlers.