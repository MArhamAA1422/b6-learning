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
