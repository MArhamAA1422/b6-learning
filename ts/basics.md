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
- PascalCase is preferred.
- we can use `union`, enum is not recommended
- enum adds extra codes after compilation, that could be buggy

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

Using intersection we can combine multiple type.

```js
type A = {
  //
};

type B = A & {
  //
};
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

```js
function move(dir: "west") {
  //
}
```

## Template Literal Type
```js
type Class = "a" | "b";
type Hero = `group ${Class}`;  // 'group a' | 'group b'
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

`type` is better than `interface`, no declaration merging, 99.9% => `type`

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

## Type narrowing
- `unknown`
- `any`
- `in`
- type predicates: `is`
- exhaustive check: `default` in switch
- guard clauses: `||`


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

## Functions
### Optional parameters
- Optional parameters must come after required parameters.
```js
function fn(a: number, b?: string): number {}  // b is optional here
```

### Explicit return
- library code
- complex function
- code used by others

### Other than that: inferred
- implicit return
- code used by me

### Arrow function
```js
(a: number, b: boolean) => string
```

### Function Overloading
- Sometimes, a function can behave differently depending on argument types.
- TypeScript supports function overloading with multiple signatures.

```js
// Overload signatures
function format(input: string): string;
function format(input: number): string;

// Implementation
function format(input: string | number): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else {
    return input.toFixed(2);
  }
}

console.log(format("app")); // "app"
console.log(format(3.14159)); // "3.14"
```

Rules:
- You define multiple signatures (only declarations, no body).
- Then a **single implementation** handles all cases with union types.

## OOP

### Access Modifiers
- Public (default): Accessible anywhere.
- Private: Accessible only inside the class. Not accessible outside or in subclasses.
```js
class BankAccount {
  private balance: number;

  constructor(balance: number) {
    this.balance = balance;
  }
}
```
- Protected: Like private, but accessible inside subclasses too.

### Readonly Properties
- Can only be assigned once (at declaration or **in constructor**).
- Prevents accidental modification.

```js
readonly a: number = 10;
```

### Static Properties
- Belongs to the class itself, not instances.
- Useful for **constants, counters, utility methods**.

### Implementing Interfaces in Classes
- Interfaces define a **contract**. A class must implement all members.
- In class it enforces contract & structure

```js
interface Shape {
  area(): number;
}

class Circle implements Shape {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

let circle = new Circle(5);
console.log(circle.area()); // 78.54
```

## Utility Types
### Single Source of Truth
We can derive multiple types from one 'main' types. `extends` in interface.

### Partial Utility Type
`Partial<type>`

### Required, Readonly Utility Types

### Record Utility Type
Change the shape of a type. The `Record<K, T>` utility type creates a type with a set of properties K of type T.

One of the more practical use cases for **Record** is to ensure that all specified keys in a *union* are present in the object.

```js
type Role = 'a' | 'b';
type Sample = Record<Role, number>;

const firstSample: Sample = {  // OK
  a: 1,
  b: 2,
}

const secondSample: Sample = {  // ERROR
  a:1,
  // b: 2,
}
```

### Pick Utility Type
The `Pick<K, T>` creates a new type by selecting a subset of properties from an existing type.

```js
interface Product {
  id: string;
  name: string;
  price: number;
}

type ProductSummary = Pick<Product, "id", "name">;

const productList: ProductSummary[] = [
  { id: "p1", name: "p1-name" },
  { id: "p2", name: "p2-name" },
];
```

### Omit Utility Type
Opposite of Pick

## Generics
One of the most powerful features for making **reusable and type-safe code**. Always in this form `<>`

For example: `Array<number>`

### What are Generics?
Generics allow you to create components (functions, classes, etc.) that work with **any type**, while still enforcing **type safety**.
Think of them as placeholders (<T>) for types.

- Without generics:
```js
function identity(arg: any): any {
  return arg;
}
```
  - Problem: Using any loses type information.

- With generics:
```js
function identity<T>(arg: T): T {
  return arg;
}

let num = identity<number>(42);   // T = number
let str = identity("Hello");      // T = string (inferred)
```
  - Now the function is type-safe and reusable.

### Generic Functions

Example: Reusable swap function
```js
function swap<T, U>(a: T, b: U): [U, T] {
  return [b, a];
}

let result = swap("apple", 10);
console.log(result); // [10, "apple"]
```

Example: Generic array function
```js
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

console.log(getFirst([1, 2, 3]));      // number
console.log(getFirst(["a", "b", "c"])); // string
```

### Generic Constraints
Sometimes you need to restrict what type can be used. Using `extends`.

Example: Ensure type has a .length property
```js
function logLength<T extends { length: number }>(arg: T): number {
  console.log(arg.length);
  return arg.length;
}

logLength("Hello");     // works (string has length)
logLength([1, 2, 3]);   // works (array has length)
// logLength(42); Error: number has no length
```

```js
interface HasCost {
  cost: number,
}
function applyDiscount<T extends HasCost>(vals: T[]) {}
```

```js
function testEmails<T extends string>(arr: string) {}
```

### Extending Types
Generics can extend interfaces or other types.

```js
interface Person {
  name: string;
}

function greet<T extends Person>(person: T): void {
  console.log("Hello, " + person.name);
}

greet({ name: "app", age: 25 }); // ✅ works
// greet({ age: 25 }); Error: must have `name`
```

## Type manipulation: Mapped Types
Mapped types let you transform existing types into new variations.
(TypeScript gives us built-in helpers like `Partial, Required, Readonly`.)

### Partial<T>
**Makes all properties optional**.

```js
interface User {
  id: number;
  name: string;
}

type PartialUser = Partial<User>;

let user1: PartialUser = { name: "app" }; // id is optional now
```

#### Use cases

- Updating Objects (very common use case)
  - updates may contain only some fields
- Building objects step by step
```js
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

let draft: Partial<Todo> = {};  // start empty
draft.title = "Learn TypeScript";
```
- Optional configuration objects
- Combining `Partial` with other utilities
  - You can even create deep partials (all nested objects optional)
  ```js
  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };

  interface Profile {
    id: number;
    info: {
      name: string;
      age: number;
    };
  }

  let partialProfile: DeepPartial<Profile> = {
    info: { name: "app" } // age optional now
  };
  ```
- Partial<T> is great for update functions, config objects, and drafts. It saves you from writing separate optional interfaces.

### Required<T>
Makes all properties required.
```js
interface User {
  id?: number;
  name?: string;
}

type FullUser = Required<User>;

let user2: FullUser = { id: 1, name: "app" }; // both required
```

### Readonly<T>
Prevents properties from being changed.

```js
interface User {
  id: number;
  name: string;
}

type ReadonlyUser = Readonly<User>;

let user3: ReadonlyUser = { id: 1, name: "app" };
// user3.id = 2; Error: cannot assign to readonly property
```

## Error Handling
In TS, error has type `unknown` (for safety).
```js
if (err instanceof Error) {
  console.error("Caught error:", err.message);
} else {
  console.error("Unknown error", err);
}
```
#### Why unknown and not any?
Because TypeScript forces you to safely check what the error is before using it — this prevents runtime crashes.

### Custom Error Classes
You can define your own error types (very useful for domain-specific logic).
```js
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateUsername(username: string) {
  if (username.length < 3) {
    throw new ValidationError("Username must be at least 3 characters long");
  }
  return true;
}

try {
  validateUsername("ab");
} catch (err) {
  if (err instanceof ValidationError) {
    console.error("Validation failed:", err.message);
  } else {
    console.error("Unexpected error:", err);
  }
}
```

### Handling Errors with Type Guards
- `instanceof`, Check if error is an instance of a custom class
- `typeof`, Useful for checking primitive types in error values
```js
if (typeof err === 'string') {}
```

#### Summary
- `try...catch` works the same as JS, but TS treats errors as unknown for safety.
- Custom error classes help structure error handling (e.g., ValidationError, NetworkError).
- Use type guards (instanceof, typeof) to safely narrow down error types.