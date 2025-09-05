## var vs let
- scope
    - var → **function-scoped** (or global if outside a function).
    - let → block-scoped (limited to { ... }).
- redeclaration
    - **var allows, let doesn't**
    - **we can reassign let**
- hoisting
    - var is initialized as undefined.
    - let is hoisted but not initialized → you get Temporal Dead Zone (TDZ) error if used before declaration.
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
- NaN, Infinity

## Functions
- A function is an **object** **with callable** behavior.
