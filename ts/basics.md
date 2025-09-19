## Intro
- TS = JS with Type Checking (annotation)
- We can write JS in TS
- Medium to Large Project: TS
- Simple Project: JS

## Why TS
- **Static Typing**: You can define types for variables, function parameters, and return values.

- Without TS, if you accidentally pass a number to greet("Alice"), you won’t catch it until runtime. With TS, you’ll get a compile-time error.

- **Error Prevention**: Most bugs in JS happen due to unexpected types. TS helps catch them early.

- **Better Tooling**: Editors like VS Code can give intelligent autocomplete, hints, and refactoring with TS.

- **Scalability**: Big projects (React apps, Node.js backends) become easier to maintain when types are enforced.

## Drawbacks
- compilation
- discipline in coding

## Transpilation
- Compile and convert into JS.
- `tsc code.ts`
  - compile and this will result `code.js`
  - by default, each code in TS will convert into ES5 (JS)
- To fix default compilation (JS) target
  - `tsc --init` => tsconfig.json => update **target** => (CTRL + space) => To get valid ES options.
  - rootDir, outDir, removeComments, noEmitOnError (don't generate JS if there are errors)

## Debugging
- Inside `tsconfig.json` => sourceMap
- Run & Debug (vs code) => launch.json => "preLaunchTask": "tsc "; => Launch Program

## Code Example
```ts
let a: number = 123_456_789;

let s = "typescript";  // let s: string
```
## any type
```ts
let a;  // it can be any type if we not initialize
a = 10;
a = 'a';
```
```ts
// not recommended
function anyArgument(doc: any) {
  //
}
```

## array declaration
```ts
let arr: number[];
arr = [];
arr[0] = 5;
```

## Tuples
```ts
let user: [number, string] = [1, 'app'];
```
Here, we can use all methods of number `user[0].`, all methods of string `user[1].`

Issue
- here we can write: `user.push(1)`
  - it shouldn't be happened, but compiler won't mind for now.

## Enum
PascalCase is preferred.

```ts
const enum Size { Small = 1, Medium, Large };
let mySize: Size = Size.Medium;
```

Use `const` to generate more optimized JS.

## Function
```ts
function fn(v: number): number {
  return 0;
}
```

We can have `noUnusedLocals, noUnusedParameters, noImplicitReturns` in `tsconfig.json`.

Strict Parameters.

```js
function calc(inc: number, tax?: number): number {  // also, tax = 10
  if (tax || 10 < 10) return inc;
  return inc*10;
}
calc(5);
```

## Object
```ts
let emp: {
    readonly id: number,
    name: string

    retire: (date: Date) => void

} = {
    id : 1,
    name: 'app',
    retire: (date: Date) => {
        console.log(date);
    }
};
```

## Type
```js
type Emp = {
  readonly id: number,
  name: string,
  retire: (data: Date) => void
}

let emp: Emp = {
  id: 1,
  name: 'app',
  retire: (date: Date) => {
    console.log(date);
  }
}
```

## Union types
```js
function kgToLbs(wg: number | string): number {
  // Narrowing
  if (typeof wg === 'number') {
    return wg*2.2;
  } else {
    return parseInt(wg)*2.2;
  }
}
```

## Intersection types
```js
let wg: number & string;  // both number and string
```
```js
type Draggable = {
  drag: () => void
}
type Resizable = {
  resize: () => void
}
type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
  drag: () => {},
  resize: () => {}
}
```

## Literal Types
Limiting the input.

```js
type Quantity = 50 | 100;  // 50 or 100, nothing else
let quantity: Quantity = 100;
```

## Nullable Types
- TS is very strict with `null` and `undefined`
- `strictNullChecks` in tsconfig.json

```js
function test(name: string | null | undefine) {
  if (name) {
    //
  } else {
    //
  }
}
test(null);
```

## Optional Chaining
```js
// optional property access operator
customer?.data;
```
```js
// optional element access operator
arr?.[0]
```
```js
// optional call (function)
let log: any = null;
log?.('a');
```

## Symbol
```js
let sym1: symbol = Symbol("id");
let sym2: symbol = Symbol("id");

console.log(sym1 === sym2); // false (always unique)

let obj = {
  [sym1]: "secret"
};

console.log(obj[sym1]); // "secret"
```

## BigInt
```js
let big1: bigint = 9007199254740991n;  // valid
let big2: bigint = BigInt("900719925474099145678");

console.log(big1 + 10n);  // 9007199254741001n

let x: number = 10;
let y: bigint = 20n;

// console.log(x + y); Error in TS
```

## Array<T>
Array<T> is the generic type notation for arrays.
- `string[] = Array<string>`

```js
let nums: Array<number> = [1, 2, 3];
let names: string[] = ["Alice", "Bob", "Charlie"];
```

```js
type User = {
  id: number;
  name: string;
};

let users: Array<User> = [
  { id: 1, name: "app" },
  { id: 2, name: "lab" }
];

console.log(users[0]?.name);  // object could be undefined
```

## Interface
Interfaces define the **shape of an object** (what properties it should have, and their types).

- Interfaces can be extended (inheritance).
- Only used for **object shapes, classes, and contracts**.

```js
interface User {
  id: number
  name: string
  isAdmin?: boolean  // optional property
}

let user: User = {
  id: 1,
  name: 'app'
}

console.log(user);
```

## Declaration Merging (interface)
```js
interface User {
  id: number;
}
interface User {
  name: string;
}

const u: User = { id: 1, name: "app" }; // both merged
```

## Type Aliases (type)
- Type aliases let you name any type (**not just objects**).
- They’re more flexible than interfaces.
- Can represent unions, intersections, primitives, tuples, etc.
- More general-purpose than interfaces.

## interface vs type
Feature	| interface	| type
|-|-|-|
Use case	| Object shapes, contracts	| Objects + unions + primitives, tuples
Extending	| Can extend other interfaces	| Can use intersection (&) to combine
Declaration merging	| Supported (you can redeclare same interface and it merges)	| Not supported
Flexibility	| Limited to objects/classes	| Very flexible

## Type Assertion
- Type Assertion tells TypeScript: “Trust me, I know the type better than you.”

- It does not change the runtime value, only how TypeScript treats it at compile time.

```js
let someValue: unknown = "Hello, TS";
let strLength: number = (someValue as string).length;
```

Another way: using `<>`

```js
let value: unknown = "JS TS";
let strLen = (<string>value).length;
```

Note: The <> syntax does not work in .tsx (React/JSX) files, because it conflicts with JSX tags. That’s why as is safer.

### When to use?
- When TS can’t infer type but you’re sure
```js
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
```
Without assertion, getElementById returns `HTMLElement | null`.
But you know it’s a <canvas>, so you assert it.

- When narrowing from a broader type
```js
type Bird = { fly: () => void };
type Fish = { swim: () => void };

let pet: Bird | Fish = { swim: () => console.log("swim") };
(pet as Fish).swim();
```

- For DOM work, JSON parsing, third-party libraries
```js
let json = '{"id": 1, "name": "app"}';
let user = JSON.parse(json) as { id : number; number: string };
```

### Type Assertion ≠ Type Casting
- It doesn’t actually convert the type at runtime. It only **changes how TS checks** your code.
- If your assertion is wrong, it may cause runtime errors even if TS compiles fine.

## Type Inference in TypeScript
TypeScript has a powerful type inference system. This means you don’t always need to explicitly declare the type of a variable, parameter, or return value — TypeScript will figure it out automatically based on how the code is written. Once inferred, you can’t assign a different type.

```js
let mixed = [1, "hello", true]; 
// inferred as (string | number | boolean)[]
```

## When to Use Explicit Typing?

- When the type is not obvious

- When you want to improve readability

- For **function parameters** (always good practice)

- When working with APIs / complex objects

#### Implicit typing: TypeScript infers types automatically.

#### Explicit typing: You manually set the type.

Inference happens from **variable initialization, function return values, array elements, and context**.

