## Everything is OBJECT in JS
- All non-primitives(object, array, function, date, regex) are objects in JS.
  - This is because JS was designed to be dynamic and flexible, not strictly typed like Java or C++.
```js
let arr = [10, 20, 30];
console.log(typeof arr); // "object"
console.log(Object.getOwnPropertyNames(arr)); 
// ["0", "1", "2", "length"]
```
- In JS, functions are first-class objects:

  - They can be assigned to variables.

  - Passed as arguments.

  - Returned from other functions.
- Internally, a function is an object with a callable `[[Call]]` property.
```js
console.log(typeof greet); // "function" (special subtype)
console.log(greet instanceof Object); // true
```

- All objects in JS inherit from `Object.prototype`, unless explicitly changed.
  - That’s why you can call methods like `.toString()` on almost anything.
  ```js
  let arr = [];
  console.log(arr.toString()); // "" (empty string)
  console.log(Function.prototype.toString); // [Function: toString]
  ```

### Why
- Flexibility → Dynamic behavior (e.g., you can add properties to arrays/functions).
```js
function greet() {}
greet.language = "JavaScript";
console.log(greet.language); // "JavaScript"
```

- Uniformity → Instead of multiple separate structures, everything “complex” behaves like an object.

- Prototype-based inheritance → Instead of class-based inheritance (originally), JS uses prototypes, and prototypes are objects.

## Use strict mode (from ES5)
আমরা যখন স্ট্রিক্ট মোড ব্যবহার করি, তখন জাভাস্ক্রিপ্ট কোড কোন ভুল সিনট্যাক্স ছাড়া এক্সিকিউট করে এবং কোড আরও সিকিউর করে। `"use strict";`
- global declaration
- function declaration

Use cases:
- আমরা জানি জাভাস্ক্রিপ্টে ভেরিয়েবলের নামের আগে ভেরিয়েবল কি-ওয়ার্ড ব্যবহার না করলে এটি বাই-ডিফল্ট উইন্ডো অবজেক্টের আন্ডারে এক্সিকিউট হয়। একই কোড যখন আমরা “use strict” ব্যবহার করে এক্সিকিউট করবো, আমরা একটা Uncaught ReferenceError পাবো।

- জাভাস্ক্রিপ্টে আমরা রিজার্ভড কি-ওয়ার্ডগুলো ব্যবহার করতে পারি ভেরিয়েবলের নাম হিসাবে। কিন্তু “use strict” মোডে এটি সম্ভব নয়।

- ফাংশনের ভিতরে “this” এর ভ্যালু সব সময় উইন্ডো অবজেক্ট হয়। 
কিন্তু “use strict” মোডে ফাংশনের ভিতরে “this” এর ভ্যালু undefined হবে।

- Deleting a variable (or object) is not allowed. `delete x;`

## Scope
- জাভাস্ক্রিপ্টে একমাত্র তখনই Scope তৈরি হয়, যখন আমরা কোন function ইনভোক বা কল করি। - Local scope
- Global, Local scope

## Data Types
- Primitive ডাটা টাইপ
  - String, Number, Boolean, Null, undefined, BigInt, Symbol
  - immutable
  - আমরা কোন প্রিমিটিভ ডাটা টাইপকে অন্য কোন ভেরিয়েবলে অ্যাসাইন করি, তখন তার **ভ্যালু কপি** হয়ে নতুন ভেরিয়েবলে অ্যাসাইন হয়।

- Non-primitive or reference
  - Arrays, Objects, Functions
  - mutable
  - আমরা যখন কোন নন-প্রিমিটিভ ডাটা তৈরি করি, তখন সেই ডাটার জন্যে মেমোরিতে একটা অ্যাড্রেস তৈরি হয় এবং সেই অ্যাড্রেসটাকে মনে রেখে কোন এক জায়গায় ভ্যালুগুলোকে স্ট্রোর করে রাখে।
  - যখন আমরা কোন রেফারেন্স ডাটাকে অন্য কোন ভেরিয়েবলে অ্যাসাইন করি, তখন তার **রেফারেন্স কপি** হয়। Changing one will change others.
  - নন-প্রিমিটিভ ডাটা তাদের রেফারেন্স দ্বারা তুলনা করে।

## User Input
### In Browser (frontend)
```js
let name = prompt("Enter: ");
console.log("Hello, " + name);
```

### In NodeJS (cmd)
```js
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter your name: ", function(name) {
  console.log("Hello, " + name);
  rl.close();
});
```

Also, `async/await` (cleaner way in Node.js).

## Hoisting
- JavaScript needs to know all variable names in advance to manage scope.

- Hoisting allows the engine to:

    - Recognize the variable exists in this scope.

    - Set up memory for it.

    - Enforce TDZ, preventing accidental usage before initialization.

- Essentially, hoisting is about “creation phase”, not “usable yet”.

- var: undefined
- function: **actual function** body (no issue)
- reason: memory phase
- function expression: behaves like variable not function, can cause error
```js
console.log(fn);  // undefined
var fn = () => {};
```
- In memory phase: let/const placed in “**Temporal Dead Zone (TDZ)**” until the code actually declares them.
    - <uninitialized>

## var vs let
- scope
    - var → **function-scoped** (or global if outside a function).
    - let → block-scoped (limited to { ... }).
      - each time new copy of let variable is created, new memory location
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
    - সিম্বল প্রপার্টির কলিসন এড়ানোর জন্য অনেক উপকারী। ধরি আমাদের একটা অবজেক্ট আছে Person। দুইটি  প্রোগ্রাম Person অব্জেক্টটি  মডিফাই  করতে চায়  এবং Id নামের একটি প্রপার্টি এড করতে চায় । এখন দুইটি  প্রোগ্রাম একই নামের প্রপার্টি এড  করতে গেলে প্রপার্টি এর ভ্যালু ওভাররাইড বা পরিবর্তন করে ফেলবে । এই সমস্যা আমরা সিম্বল ব্যবহার করে সমাধান করতে পারি। সিম্বল ব্যবহার করে আমরা একটা ইউনিক প্রপার্টি তৈরী করে ব্যবহার করতে পারি।
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
    ```js
    let id = Symbol(“id”);
    let person = {
      name: “Jack”,
      // adding symbol as a key
      [id]: 123 // not “id”: 123
    };
    console.log(person); // {name: “Jack”, Symbol(id): 123}
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

## new (constructor pattern)
আমরা যখন কন্সট্রাক্টর প্যাটার্ন ইউজ করার সময় new কীওয়ার্ড ইউজ করি তখন সাধারণত ৪ টা জিনিস হয়। সেগুলো হচ্ছেঃ

- একটি সম্পূর্ণ নতুন অবজেক্ট তৈরি হয়
- নতুন অবজেক্টের প্রোটোটাইপ হিসেবে ফাংশনের প্রোটোটাইপ সেট হয়
```js
function Car(color) {
this.color = color;
};
 
Car.prototype.getColor = function(){
console.log(“Color of the car is “+this.color)
}
 
let mercedes = new Car(“Red”);
mercedes.getColor() // Output: Color of the car is Red
```
- this এর ভ্যালু হিসেবে নতুন অবজেক্টটি সেট হয়
- নতুন তৈরি করা অবজেক্টটি অটোমেটিক রিটার্নড হয়

## Array Methods
- `reduce()`
    - Reduces an array to a single value by applying a function step by step.
    - sum, min/max
    - first param (accumulator, currentValue), second param(initial value)
    - accumulator can be an OBJECT also (anything?)
    - iterate over the array and come up with one single value
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

- advanced manipulation: chaining `arr.filter().map()`

## More Array methods
- `Array.from()` এটি Array অবজেক্টের একটি স্ট্যাটিক মেথড যেটি মূলত iterable বা পুনরাবৃত্তিযোগ্য কোন ভেরিয়েবল থেকে নতুন একটি অ্যারে তৈরীতে ব্যবহৃত হয়।
```js
let str = "Vivasoft";
let arr = [1, 2, 3];
console.log(Array.from(str)); // ["V", "i", "v", "a", "s", "o", "f", "t"];
console.log(Array.from(arr, (x) => x * x)); // [1, 4, 9]
```

- `Array.isArray()`
```js
console.log(Array.isArray(new Array())); // true
```

- `Array.prototype.at()` at() মেথডের মজার একটি ব্যাপার হচ্ছে এটি নেগেটিভ ইনডেক্স অনুযায়ী কাজ করতে পারে তবে সেটা উল্টো দিক থেকে।
```js
let arr = [92, 46, 71, 87, 39];
console.log(arr.at(0)); // 92
console.log(arr.at(-1)); // 39
console.log(arr[-1]); // undefined
```

- `Array.prototype.concat()`
```js
let arr1 = [1, 2, 3];
let arr2 = [4, 5];
let final = arr1.concat(arr2);  // [1, 2, 3, 4, 5]
```

- `Array.prototype.fill()` এই মেথডটির মাধ্যমে আমরা কোন অ্যারের সবগুলো উপাদান বা একটি নির্দিষ্ট রেঞ্জের মধ্যে উপাদান গুলোকে একটি ভ্যালু দ্বারা এ্যাসাইন করে থাকি। `fill(value, from, to)`

```js
let arr = [29, 13, 71, 30, 55];
arr.fill(3);
console.log(arr); // [3,3,3,3,3]
arr.fill(4, 2);
console.log(arr); // [3,3,4,4,4]
arr.fill(5, 3, 4);
console.log(arr); // [3,3,4,5,4]
```

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

## Pure Function
Pure ফাংশন হল একটি Deterministic ফাংশন যার মানে হল যদি ওই **ফাংশনে একই ইনপুটের জন্য সর্বদা একই আউটপুট থাকবে**। একটি Pure ফাংশনের অবশ্যই নিচের বৈশিষ্ট্যগুলো থাকতে হবে।

- সর্বদা নিজের আর্গুমেন্টের উপর নির্ভর করবে।
- ফাংশনটি নিজের Scope এর বাইরে কোন ভারিয়েবলের মান পরিবর্তন করবে না।
- ফাংশনটি কোন side effects তৈরি করবে না।

```js
let val1 = 6;
let val2 = 4;

function imPure() {  // accessing outer scope, val1/val2 changes => output changes
	return val1 * val2;
}
```

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
- IIFE জাভাস্ক্রিপ্টের অন্যতম জনপ্রিয় একটি ডিজাইন প্যাটার্ন। এটি **ইফি** বলেই উচ্চারণ করে।
- Before import/export, IIFEs were a way to create private modules.
- For setting up configurations, event listeners, etc.
- `(function(){})();`
```js
(() => {
	// code goes here...
})();
```

### Why IIFE?
যখন আপনি একটি ফাংশন ডিফাইন বা ডিক্লেয়ার করেন, জাভাস্ক্রিপ্ট ইঞ্জিন গ্লোবাল অবজেক্টের সাথে ফাংশনকে যোগ করে। একইভাবে, যদি আপনি ফাংশনের বাইরে একটি ভেরিয়েবল ডিক্লেয়ার করেন, জাভাস্ক্রিপ্ট ইঞ্জিন ঐ ভেরিয়েবলকে গ্লোবাল অবজেক্টের সাথে যোগ করে। যদি আপনার প্রোগ্রামে অনেক গ্লোবাল ভেরিয়েবল এবং ফাংশন থাকে, তাহলে আপনার প্রোগ্রাম **ইনইফিশিয়েন্টলি মেমোরি** ব্যবহার করতে পারে এবং আপনার গ্লোবাল ভেরিয়েবল এবং ফাংশনগুলি অন্য কোন **লাইব্রেরীর সাথে কনফ্লিক্ট** করতে পারে যদি ঐ লাইব্রেরীতে একই নামে ভেরিয়েবল এবং ফাংশন থাকে। ফাংশন এবং ভেরিয়েবলগুলিকে গ্লোবাল অবজেক্ট কনফ্লিক্ট করা থেকে বিরত রাখার একটি উপায় হল IIFE ব্যবহার করা।

### Named IIFE
```js
(function doneSome() {
  // code
})();
```

### Advantages of IIFE
- অপ্রয়োজনীয় গ্লোবাল ভেরিয়েবল এবং ফাংশন তৈরি করে না।
- IIFE তে ডিফাইন করা ফাংশন ও ভেরিয়েবল অন্য ফাংশন এবং ভেরিয়েবলের সাথে কনফ্লিক্ট করে না। এমনকি তাদের একই নাম থাকলেও।
- জাভাস্ক্রিপ্টের কোড অর্গানাইজ করে।
- জাভাস্ক্রিপ্ট কোড মেইন্টানাবল করে।

```js
var math = (() => {
    function add(a, b) {
        return a+b;
    }
    function sub(a, b) {
        return a-b;
    }

    return {
        add,
        sub
    }
})();

// math.add(1, 2);
```

## Lexical scope
- Inner can access vars from outer.

#### undefined != not defined

## Closure
- A closure is formed when a function "remembers" the variables (with reference) from its lexical scope, even after the outer function has finished running.
- **function + its lexical scope**
- the actual **reference** (latest updated value) of the variables are bound in closure
- single function can have multiple closures
- if we need closure: just create a outer function
- callback scope

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
```js
function counter() {
  var count = 0;
  return function incCounter() {
    count++;
    console.log(count);
  }
}
const counter1 = counter();
counter1();  // 1
counter1();  // 2
const counter2 =  counter();
counter2();  // 1
```
- Maintain state (like counters, caches).
- Callbacks & async code rely on closures.
- Used heavily in functional programming and event handlers.

```js
function Counter() {  // constructor function
  var count = 0;
  this.incCounter = function() {
    count++;
    console.log(count);
  }
  this.decCounter = function() {
    count--;
    console.log(count);
  }
}

const counter = new Counter();
counter.incCounter();
counter.decCounter();
```

## Cons of Closure
- Memory consumption
- Memory leak if not handled properly

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
  - inside any function
- In non-strict mode, if *this* is `undefined` or `null` *this* **will be replaced** by global object (window/global).
- Arrow functions do not have their own *this* — **they inherit it from the lexical scope**.
- “this” এর ভ্যালু কি হবে সেটা নির্ভর করে **কোথায় এবং কিভাবে** কল হচ্ছে তার উপর ভিত্তি করে।
- কোন ফাংশন কল করার সময় ফাংশনের নামের ডটের আগে যে অবজেক্ট নামটা থাকবে তার ভ্যালুই দেখাবে।
- this সেই object কে refer করে যা বর্তমানে ফাংশনটিকে কল করছে।
- *this* inside **DOM** elements => refers to HTML elements

## call(), apply(), bind()
- All three are used to manually set *this*.
- Sharing methods between objects.
  - using overriding the *this*
  ```js
  const std = {
    name: "app",
    print: function() {
      //
    }
  }
  std.print();

  const std2 = {
    name: "lab"
  }

  // std.print();  // error
  std.print.call(std2);  // we've changed *this*
  ```
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

```js
function Person(fName, lName, age) {
	this._firstName = fName;
	this._lastName = lName;
	this._age = age;
}

function Student(fName, lName, age, roll, section) {
	Person.call(this, fName, lName, age);
	this._roll = roll;
	this._section = section;
}

let std1 = new Student("Saroar Hossain", "Shahan", 25, 99, "B");
```

- এখন ধরেন আপনার Student ক্লসে কয়টা প্যারামিটার হতে পারে তা আপনার জানা নেই। ঐ সমস্যার সমাধান কিভাবে করবেন? খুব সহজ একটা সমাধান আছে। আমরা জানি যে, জাভাস্ক্রিপ্টে **arguments** নামে একটা বিল্ড-ইন অবজেক্ট আছে। এইটা অবজেক্ট হলেও আসলে কাজ করে Array এর মত করে এবং Apply মেথড যেহেতু Array নিয়ে কাজ করে, তাহলে তো আমরা arguments অবজেক্ট দিয়েই এই কাজটি করে ফেলতে পারি খুব সহজে।

```js
function Person(fName, lName, age) {
	this._firstName = fName;
	this._lastName = lName;
	this._age = age;
}

function Student(fName, lName, age, roll, section) {
	Person.apply(this, arguments);
	this._roll = roll;
	this._section = section;
}

let std1 = new Student("Saroar Hossain", "Shahan", 25, 99, "B");
```

## Callback
- A callback function is a function **passed as an argument** to another function, to be executed later, usually after some operation finishes (like I/O, network, timer).
- কলব্যাক ফাংশনের মানে এক কথায় এটা এমন একটা ফাংশন যেটা আরেকটা ফাংশন এক্সিকিউট হওয়ার পর এক্সিকিউট হয়।
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

- Asynchronous code inside synchronous environment.
- Will ba called.

## Callback Hell
- When you have many nested callbacks, the code becomes hard to read, maintain, and debug. This is called callback hell.

## Promise
- A Promise is **an Object** representing the **eventual completion** or failure of an asynchronous operation.
- A Promise represents a value that may be available now, later, or never.
- Requires callback.
- Immutable.
- Returns an Object (with data).
- It has three states: 
    - Pending - initial
    - Fulfilled - done
    - Rejected - fail
- Control of the code/execution, callback has an issue on that.
- **Attaching callbacks**, not sending callbacks.
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

## Chaining promises
- Each `.then()` returns a new Promise, allowing chaining.
- Always write `return` to flow the data correctly.
- Solves callback hell.
```js
new Promise((resolve) => resolve(2))
  .then((num) => num * 2)   // 4
  .then((num) => num + 1)   // 5
  .then(console.log);        // 5
```
```js
createOrder(cart)
  .then((orderId) => {
    return proceedToPayment(orderId);
  })
  .then((paymentInfo) => {
    return showOrderSummary(paymentInfo);
  });
```

```js
myPromise
  .then((data) => {
    console.log(data); // runs if resolved
  })
  .catch((err) => {
    console.error(err); // runs if rejected
  })
  .finally(() => {
    console.log("Done"); // runs always
  });
```

```js
createOrder(cart)
  .then(function(order) {
    //
  })
  .catch(function(error) {
    console.log(error, " for createOrder");
  })
  .then(function() {
    console.log("No matter what happes, this will be called");
  });
```

## Promise APIs
All take array of promises.

### Promise all
- Waits for all promises to be fulfilled.
- If any reject → whole Promise.all rejects. ASAP Error Message.
```js
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

Promise.all([p1, p2]).then(console.log); // [1, 2]
```
### Promise allSettled
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

### Promise race
- Resolves or rejects as soon as any one promise finishes.
```js
const p5 = new Promise(res => setTimeout(res, 500, "fast"));
const p6 = new Promise(res => setTimeout(res, 1000, "slow"));

Promise.race([p5, p6]).then(console.log); // "fast"
```

### Promise any
- wait for first success (fulfilled), in between reject doesn't matter
- if all promise fail
  - **AggregateError**: list of all errors for all promises

#### Promise.all is great for parallel requests, race for timeouts, allSettled for complete info.

## Async/Await
- Async function **always returns promise**. If there is no promise auto creation (wrapping) and return promise.
- Write `await` in front of a promise. (only inside a async function)
```js
async function handlePromise() {
  const val = await p;
  console.log("print after 'p' is resolved");  // different from normal promise
}
```
- Error handling: try-catch block
- Classic way of error handling
```js
// async function always returns promise, so we can write like this
asyncFunction().catch(err => console.log(err));
```

## Notes on Promise
- While resolving promise the resolver function will be popped from call stack, after resolved it will be pushed again.
  - that function execution is suspended
- Normal Promise and async promise may not provide same result in execution.

## JSON
- `JSON.parse()` Converts a JSON string into a JavaScript object.
- `JSON.stringify()` Converts a JavaScript object into a JSON string.

## fetch API
Returns a promise with **response** object. This response is a readable stream. Than, we can get the value using `Response.json()`. Again, this is a promise. Finally, we can get the result by resolving this promise.

```js
const data = await fetch(URL);
const jsonValue = await data.json();
console.log(jsonValue);
```

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
ডম(DOM) বা অন্যকথায় ডকুমেন্ট অবজেক্ট মডেল(Document Object Model) হচ্ছে **XML বা HTML ডকুমেন্ট এর জন্যে একটা প্রোগ্রামিং ইন্টারফেস।** এটা হচ্ছে আমাদের পেজ(HTML বা XML পেজ) কে এমনভাবে রিপ্রেজেন্ট করে যাতে এটাকে সহজেই প্রোগ্রামিং ল্যাংগুয়েজ দিয়ে মডিফাই করা যায়। বেশীরভাগ মেজর ব্রাউজারগুলোই The **W3C DOM এবং WHATWG DOM** এর স্ট্যান্ডার্ড মেইন্টেইন করে।

There are two methods to traverse downwards:
- querySelector or querySelectorAll
- **children**

There are two methods to traverse upwards:
- **parentElement**
- **closest**

```js
const firstListItem = document.querySelector('li')
const list = firstListItem.parentElement
const list1 = firstLink.closest('.list')
```

Some methods:

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
- provides the browser API for interacting with the web browser.
- Unlike DOM, which deals with the HTML structure, BOM deals with browser features like `windows, frames, history, location, and dialogs`.
- Key BOM objects: `window, navigator, screen, history, location, alert, confirm, prompt`

## window object
Window Object একটি ব্রাউজারে একটি খোলা উইন্ডো উপস্থাপন করে। যদি একটি ডকুমেন্ট এ ফ্রেম থাকে (<iframe> ট্যাগ), ব্রাউজার HTML ডকুমেন্ট এর জন্য একটি উইন্ডো অবজেক্ট এবং **প্রতিটি ফ্রেমের জন্য একটি অতিরিক্ত উইন্ডো অবজেক্ট** তৈরি করে।
- Property
  - `closed, console, document, frames, history, innerHeight, location, name, screen, self, status, top` and more.

## document object
HTML DOM ডকুমেন্ট অবজেক্ট হল আপনার ওয়েব পেজের অন্য সব অবজেক্টের মালিক। document object আপনার ওয়েব পৃষ্ঠা প্রতিনিধিত্ব করে। ডকুমেন্ট অবজেক্ট মডেল (DOM) ওয়েব পৃষ্ঠাগুলিকে স্ক্রিপ্ট বা প্রোগ্রামিং ভাষার সাথে সংযুক্ত করে একটি document গঠন উপস্থাপন করে – যেমন HTML একটি ওয়েব পৃষ্ঠাকে প্রদর্শন করে – মেমরিতে। DOM একটি লজিক্যাল ট্রি সহ একটি document উপস্থাপন করে। ট্রি প্রতিটি শাখা একটি নোডে শেষ হয় এবং **প্রতিটি নোডে object** থাকে। নোডের সাথে ইভেন্ট হ্যান্ডলারও সংযুক্ত থাকতে পারে। `alert(), confirm(), prompt(), open()`

## Query selectors
```js
let element = document.querySelector('*');  // first element of document
let element = document.querySelectorAll('*');

let autoplay = document.querySelector('[autoplay]');  // attribute

let listItems = document.querySelectorAll('ul.nav > li');  // child combinator, direct child

let listItem = document.querySelectorAll('li:nth-child(2)');  // psudo-classes

let links = document.querySelector('p::first-line');  // :: document এ অন্তর্ভুক্ত নয় এমন entities represent করে৷
```

### querySelector
একটি querySelector দিয়ে, আপনি একটি CSS Selector উপর ভিত্তি করে একটি উপাদান নির্বাচন করতে পারেন। querySelectorAll দিয়ে, আপনি সমস্ত উপাদান নির্বাচন করতে পারেন। querySelector(“css-selectors”) আপনাকে CSS Selector প্যাটার্নের উপর ভিত্তি করে যেকোনো উপাদান নির্বাচন করতে দেয়।

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

## Event Capturing and Bubbling
DOM ইভেন্টগুলি **ইভেন্ট প্রোপাগেশন** 3টি পর্যায় বর্ণনা করে: **ক্যাপচারিং ফেজ** – ইভেন্টটি এলিমেন্ট চলে যায়। **টার্গেট ফেজ** – ইভেন্ট টার্গেট এলিমেন্টে পৌঁছেছে। **বাবলিং পর্যায়** – ঘটনাটি এলিমেন্ট থেকে উঠে।
- Capture phase — window, document এবং root element থেকে শুরু করে ইভেন্ট টার্গেট এলিমেন্টের ancestor মধ্য দিয়ে নিচে নেমে যায়।
  - ইভেন্ট ক্যাপচারিং হলো ইভেন্ট-এর প্রোপাগেশন যেটা এর রুট ইলিমেন্ট থেকে টার্গেট এলিমেন্ট পর্যন্ত গিয়ে থামে।
- Target phase — ব্যবহারকারী যে element টিতে ক্লিক করেছেন তাতে ইভেন্টটি ট্রিগার হয়।
- Bubble phase — অবশেষে, root element, document এবং window পর্যন্ত target element এর ancestor এর মাধ্যমে event টি bubble up হয়ে যায়।

### Event Bubbling & Delegation
- Bubbling: Event starts from the innermost element → goes up to parents. ইভেন্ট বাবলিং হলো ইভেন্ট-এর প্রোপাগেশন যেটা এর অরিজিন থেকে উপরে রুট ইলিমেন্ট পর্যন্ত গিয়ে থামে। অর্থাং যখনি কোনো একজন ইউজার পেজের কোনো একটা বাটনে ক্লিক করে তথন সেই বাটনের আন্ডারে যে ইভেন্ট হ্যান্ডেলার টা আছে সেই ইভেন্ট টা তার প্যারেন্ট, তার প্যারেন্ট, আবার তার প্যারেন্ট এভাবে সে রুট ইলিমেন্ট Html পর্যন্ত ইভেন্ট-এর প্রোপাগেশন বা প্রচার চালায় । **ইভেন্ট টি তার উপরের সব ইলিমেন্ট** কে জানিয়ে দেয় যে, কেউ একজন তাকে ক্লিক করেছে। আপনি চাইলে বাবলিং টাকে রোধ করতে পারেন, জাস্ট `event.stopPropagation` মেথড ব্যবহার করে।

### Delegation
Attach **a listener to a parent** instead of every child.

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

addEventListener() ফাংশনের তৃতীয় argument হিসেবে আমরা যে true/false ভ্যালু দিয়েছি সেটা বাই ডিফল্ট false থাকে অর্থাৎ nested element ক্লিক করার ক্ষেত্রে সেটা বাই ডিফল্ট event bubbling করে থাকে। বিষয়টি যদি অন্যভাবে বলি তাহলে বলা যায় যে **তৃতীয় আর্গুমেন্টে জিজ্ঞাসা করা থাকে এই event টি প্রথমে capture** করা হবে নাকি হবে না।

```js
blueDiv.addEventListener(‘click’, () => {
console.log(‘Blue box clicked.’);
}, true)
```

## Persistent Storage: localStorage
- Part of the Web Storage API (BOM).

- Stores key–value pairs in the browser.

- Data persists even after closing or refreshing the browser (until explicitly cleared).

- এটি ব্রাউজার রিস্টার্ট এবং এমনকি OS রিবুট হওয়ার পরেও ডাটার মেয়াদ শেষ হয় না।

- লোকাল স্টোরেজের অবজেক্ট Iterable নয়। তবে একটি উপায় হল অ্যারের উপর তাদের লুপ করা। Or, `for key in localStorage`.

- Stored as **strings** (you need to JSON.stringify/JSON.parse for objects).

- Size limit: **~5–10 MB** depending on browser.
    - If exceeded → QuotaExceededError

- Unlike cookies: it's not sent with every HTTP req.

- `setItem(key, val), getItem(key), removeItem(key), clear()`

- SQLite (Chromium-based browsers like Chrome, Edge, Opera) – localStorage is stored in **SQLite databases on disk**.

- Per Origin → Each website (scheme + domain + port) has its own isolated storage.

- Persistence → Saved to disk, survives browser restarts.

- Synchronous API → Operations like getItem, setItem are *blocking*, unlike **IndexedDB** (async).

- Dict/HashMap at API level. Browsers use efficient hashing + indexing in their DB engines to retrieve keys quickly.

```js
const user = { name: "app", age: 25 };

// Save object
localStorage.setItem("user", JSON.stringify(user));

// Get object back
const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser.name); // app
```

- localStorage: persists until manually cleared whereas **sessionStorage**: persists only for the current tab/session.

## Recursive Object Iteration
- Useful when you deal with nested objects (like API responses, configs, or tree structures).
```js
function iterate(obj) {
  for (let key in obj) {
    if (Array.isArray(obj)) {
        obj.forEach((item, i) => {
        console.log(`Index ${i}:`);
        iterate(item);
        });
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      // If value is an object, go deeper (recursive call)
      console.log("Entering:", key);
      iterate(obj[key]);
    } else {
      // If value is primitive, print directly
      console.log(`${key}: ${obj[key]}`);
    }
  }
}

iterate(person);
```

### OOP
- Object Literal
```js
const user = {
  name: "app",
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};
user.greet();
```
- Encapsulation
```js
class BankAccount {
  #balance = 0; // private field

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount();
acc.deposit(100);
console.log(acc.getBalance()); // 100
// console.log(acc.#balance); ❌ Error (private)
```

- Abstraction
```js
class Car {
  startEngine() {
    console.log("Engine started");
  }

  drive() {
    this.startEngine(); // internal details hidden
    console.log("Car is moving");
  }
}

const c = new Car();
c.drive(); // Car is moving (doesn't need to know engine details)
```

- Inheritance
```js
class Animal {
  speak() {
    console.log("Some sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Woof!"); // overriding
  }
}

const d = new Dog();
d.speak(); // Woof!
```

- Polymorphism
```js
const animals = [new Dog(), new Animal()];
animals.forEach(a => a.speak());
// Woof!
// Some sound
```

- Static methods & props
    - Belong to the class itself, not instance.
    ```js
    class MathUtils() {
        static add(a, b) {
            return a + b;
        }
    }

    console.log(MathUtils.add(2, 3));  // 5
    ```

- getters & setters
    - get, set with same func name
    - Because dot access is dumb — it directly gets/sets values without any extra rules.
      - With getters/setters, you can add logic, validation, transformation, computed results — all while keeping a clean obj.prop syntax.
```js
class User {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name.toUpperCase();
  }

  set name(newName) {
    this._name = newName;
  }
}

const u = new User("app");
console.log(u.name); // app
u.name = "lab";
console.log(u.name); // lab
```

- Object Prototypes
    - Every object has a hidden `[[Prototype]]`.
    - Classes & inheritance rely on this chain.
    ```js
    function Person(name) {
        this.name = name;
    }
    Person.prototype.greet = function() {
        console.log("Hello " + this.name);
    };

    const p = new Person("app");
    p.greet();
    console.log(p.__proto__ === Person.prototype); // true
    ```
- Mixins (JS-specific)
    - Since JS supports single inheritance, you can mix in extra functionality.
```js
const canFly = { fly() { console.log("Flying"); } };
const canSwim = { swim() { console.log("Swimming"); } };

class Animal {}
Object.assign(Animal.prototype, canFly, canSwim);

const duck = new Animal();
duck.fly();  // Flying
duck.swim(); // Swimming
```