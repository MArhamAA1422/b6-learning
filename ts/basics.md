## Intro
- TS = JS with Type Checking (annotation)
- We can write JS in TS
- Medium to Large Project: TS
- Simple Project: JS

## Drawbacks
- compilation
- discipline in coding

## Transpilation
- Compile and convert into JS.
- `tsc code.ts`
  - compile and this will result `code.js`
  - by default, each code in TS will convert into ES5 (JS)
- To fix default compilation (JS) target
  - `tsc --init` => tsconfig.json => update **target** => (CTRL + space) => To get valid options.
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