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
const person = { name: "app" };
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
console.log(makeUser("app", 22)); 
// { name: "app", age: 22 }
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

## Spread & Rest
- spread: expands items out
- rest: gathers items in

### spread
- Expands (spreads out) an iterable (array, string, object, etc) into individual elements.
```js
const arr = [1, 2];
const arr2 = [0, ...arr, 3];  // [0, 1, 2, 3]
```
```js
const user = { name: "app", age: 22 };
const clone = { ...user, country: "BD" };
```

### rest
- Collects multiple elements into a single array/object.
- Used in function parameters or destructuring.
```js
function log(...args) {}
```
```js
const [first, ...rest] = [10, 20, 30, 40];
const { name, ...details } = { name: "app", age: 22, country: "BD" };
```

## Type coercion: implicit, explicit
- Type coercion = converting a value from one type to another.
- Implicitly (JS does it automatically)
- Explicitly (you do it manually)

```js
console.log("5" + 2);   // "52"
console.log("5" - 2);   // 3
console.log("5" * "2"); // 10     (both strings → numbers)
console.log(1 == "1");  // true   (loose equality does coercion)
```

```js
console.log([] + []);    // ""   (empty string)
console.log([] + {});    // "[object Object]"
console.log({} + []);    // "[object Object]"
console.log(null + 1);   // 1   (null → 0)
console.log(undefined + 1); // NaN (undefined → NaN)
```

## this
- Its value depends on how a function is called, not where it’s written.
- In non-strict mode, this refers to the global object (**window in browsers, global in Node**).
- In strict mode, this is **undefined**.
- Arrow functions do not have their own *this* — **they inherit it from the lexical scope**.

## call(), apply(), bind()
- All three are used to manually set *this*.
- `call()`
    - Calls a function with a specified this and arguments listed individually.
    ```js
    function greet(age) {
        console.log(this.name + " is " + age);
    }

    const user = { name: "app" };
    greet.call(user, 22); // "app is 22"
    ```
- `apply()`
    - Like call(), but arguments are passed **as an array**.
- `bind()`
    - Returns a new function with *this* permanently set.
    - Doesn’t call immediately.
    ```js
    const boundGreet = greet.bind(user);
    boundGreet(22); // "app is 22"
    ```

## Callback
- A callback function is a function **passed as an argument** to another function, to be executed later, usually after some operation finishes (like I/O, network, timer).
```js
function greet(name) {
  console.log("Hello " + name);
}
function processUser(name, callback) {
  callback(name);  // execute the callback
}
processUser("app", greet); // "Hello app"
```
- Asynchronous callback
```js
setTimeout(() => {
    console.log("second line, after 2s");
}, 2000);
console.log("first line");
```

## Callback Hell
- When you have many nested callbacks, the code becomes hard to read, maintain, and debug. This is called callback hell.

## Promise
- A Promise represents a value that may be available now, later, or never.
- It has three states:
    - Pending - initial
    - Fulfilled - done
    - Rejected - fail
```js
const myPromise = new Promise((resolve, reject) => {
  let success = true;
  
  setTimeout(() => {
    if (success) {
      resolve("Operation successful!");
    } else {
      reject("Operation failed!");
    }
  }, 1000);
});
```

```js
myPromise
  .then((value) => {
    console.log(value); // runs if resolved
  })
  .catch((err) => {
    console.error(err); // runs if rejected
  })
  .finally(() => {
    console.log("Done"); // runs always
  });
```

## Chaining promises
- Each `.then()` returns a new Promise, allowing chaining.
```js
new Promise((resolve) => resolve(2))
  .then((num) => num * 2)   // 4
  .then((num) => num + 1)   // 5
  .then(console.log);        // 5
```

## Promise all
- Waits for all promises to fulfill.
- If any reject → whole Promise.all rejects.
```js
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

Promise.all([p1, p2]).then(console.log); // [1, 2]
```
## Promise allSettled
- Waits for all promises, regardless of fulfill/reject.
- Returns an array of objects with {status, value/reason}.
```js
const p3 = Promise.resolve("success");
const p4 = Promise.reject("error");

Promise.allSettled([p3, p4]).then(console.log);
/*
[
  { status: "fulfilled", value: "success" },
  { status: "rejected", reason: "error" }
]
*/
```

## Promise race
- Resolves or rejects as soon as any one promise finishes.
```js
const p5 = new Promise(res => setTimeout(res, 500, "fast"));
const p6 = new Promise(res => setTimeout(res, 1000, "slow"));

Promise.race([p5, p6]).then(console.log); // "fast"
```

#### Promise.all is great for parallel requests, race for timeouts, allSettled for complete info.

## JSON
- `JSON.parse()` Converts a JSON string into a JavaScript object.
- `JSON.stringify()` Converts a JavaScript object into a JSON string.

## ES6+
- Template Literals
    - backticks, interpolation, multi-line string
- Arrow func
- let, const
- Destructuring
- Default params
```js
function greet(name = "Guest") {
  console.log(`Hello ${name}`);
}
greet(); // Hello Guest
```
- rest & spread operator
- Enhanced obj literals: shorter syntax for methods and props
```js
const name = "app";
const user = {
  name,          // instead of name: name
  greet() {      // method shorthand
    console.log("Hello");
  }
};
```
- Modules: export, import
- Promises
- Classes
```js
class User {
  constructor(name) { this.name = name; }
  greet() { console.log(`Hi ${this.name}`); }
}

const u = new User("app");
u.greet(); // Hi app
```
- Optional Chaining & Nullish Coalescing
    - Optional chaining `(?.)` avoids errors if property doesn’t exist.
    - Nullish coalescing `(??)` provides default for null/undefined.
    ```js
    const user = { name: "app" };
    console.log(user?.age);       // undefined
    console.log(user.age ?? 18);  // 18
    ```
- for...of, for...in loops

## DOM
- appendChild
    - Creates a new element and adds it as the last child.
    ```js
    const p = document.createElement("p"); // create a <p> element
    p.textContent = "Hello!";
    container.appendChild(p); // add it to container
    ```
- insertBefore
    - Inserts an element before a specific child.
    ```js
    const span = document.createElement("span");
    span.textContent = "Start here";
    container.insertBefore(span, p); // insert before <p>
    ```
- remove
    - `container.removeChild(p); // removes <p> from container`
    - `p.remove();   // modern: direct remove`
- styling with JS
    - inline
    ```js
    span.style.color = "red";
    span.style.backgroundColor = "blue";
    ```
    - multiple styles at once (object assignment)
    ```js
    Object.assign(span.style, {
        color: "blue",
        padding: "10px",
        border: "1px solid black"
    });
    ```
- Use camelCase in JS instead of kebab-case (e.g., backgroundColor instead of background-color).

## BOM (Browser Object Model)
- Provides objects and methods to interact with the browser itself (not the document content).
- Unlike DOM, which deals with the HTML structure, BOM deals with browser features like `windows, frames, history, location, and dialogs`.
- Key BOM objects: `window, navigator, screen, history, location, alert, confirm, prompt`

## Events and Event Listeners
- An event is an action that happens in the browser.
```html
<button onclick="alert('Clicked!')">Click Me</button>

<button id="btn">Click Me</button>
<script>
  const btn = document.getElementById("btn");
  btn.onclick = function() {  // only one event handler per event type
    alert("Button clicked!");
  };
</script>

<!-- BEST -->
<button id="btn">Click Me</button>
<script>
  const btn = document.getElementById("btn");
  
  btn.addEventListener("click", () => {
    alert("Clicked with addEventListener!");
  });
  
  // Multiple listeners possible
  btn.addEventListener("click", () => {
    console.log("Another action!");
  });
</script>
```

- Event object (event)
```js
btn.addEventListener("click", function(event) {
  console.log(event.type); // "click"
  console.log(event.target); // <button> element
});
```
    - Use `e.preventDefault()` to stop unwanted default behavior.

### Event Bubbling & Delegation
- Bubbling: Event starts from the innermost element → goes up to parents.
- Delegation: Attach a listener to a parent instead of every child.
```HTML
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
<script>
  const list = document.getElementById("list");
  list.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
      console.log("Clicked:", e.target.textContent);
    }
  });
</script>
```