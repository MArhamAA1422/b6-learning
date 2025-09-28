## Kickstart your TS setup

Anders Hejlsberg, the inventor of C# was also the inventor of TypeScript (around 2010, at Microsoft). A new language that was closer to JavaScript, but that enabled all the IDE features that JavaScript is missing? In many metrics, it is even more popular than JavaScript.

TypeScript wasn't invented to make JavaScript strongly typed. It was built to **allow amazing tooling** for JavaScript.

Imagine you're building an IDE, and you want to give people warnings when they mis-type a function name or an object property. If you don't know the shapes of the variables, parameters and objects in your code, you'd have to resort to guesswork.

But if you do know the types of everything in your app, you can begin implementing powerful IDE features like autocomplete, inline errors and automatic refactors.

So, TypeScript aims to provide just enough strong typing to make working with JavaScript more pleasant and productive.

### pnpm

pnpm is used the same way as npm, but it is more efficient. Instead of having individual node_modules folders for each project, pnpm **uses a single location on your computer** and hard links the dependencies from there. This makes it run faster and use less disk space.

TypeScript and its dependencies are contained within a single package, called typescript. `pnpm add -g typescript`


## IDE Superpowers

TypeScript works the same no matter what IDE you use. When you open VS Code, the **TypeScript server starts in the background**. It will be active as long as you have a TypeScript file open.

Awesome VS Code features that are powered by the TypeScript server:
- autocomplete
   - TypeScript knows what type everything is inside your app. Because of that, it can give you suggestions when you're typing - speeding you up enormously.
   - This is really powerful for exploring APIs you might not be familiar with, like the `HTMLAudioElement` API in this case.
- TypeScript Error Checking
   - The thing TypeScript is most famous for is its errors. These are a set of rules which TypeScript uses to make sure your code is doing what you think it's doing.
   - Reading errors bottom-to-top can be a helpful strategy when dealing with multi-line TypeScript errors.
- JSDoc Comments
   - JSDoc is a syntax for adding documentation to the types and functions in your code. It allows VS Code to show additional information in the popup that shows when hovering. This is extremely useful when working with a team, Here's an example of how a logValues function could be documented:
```js
/**
 * Logs the values of an object to the console.
 *
 * @param obj - The object to log.
 *
 * @example
 * ```ts
 * logValues({ a: 1, b: 2 });
 * // Output:
 * // a: 1
 * // b: 2
 * ```
 */

const logValues = (obj: any) => {
  for (const key in obj) {
    console.log(`${key}: ${obj[key]}`);
  }
};
```
- Navigating with Go To Definition and Go To References
   - The TypeScript server also provides the ability to navigate to the definition of a variable or declaration. In VS Code, you can right click and select "Go to Definition" from the context menu on either platform.
- Rename Symbol
- Automatic Imports
- Quick Fixes

TypeScript's IDE server is not just running on TypeScript files, but on JavaScript files too. That means that some of TypeScript's amazing IDE experience is also available in JavaScript.


## TypeScript In The Development Pipeline

In this chapter we'll get the TypeScript CLI up and running, and see how it fits into the development pipeline. As an example, we'll be looking at using TypeScript to build a web application. But TypeScript can also be used anywhere JavaScript can - in a Node, Electron, React Native or any other app.

`tsc --watch`

While Vite and other tools handle the actual transpilation of TypeScript to JavaScript, they don't provide type checking out of the box. This means that you could introduce errors into your code and Vite would continue running the dev server without telling you. It would even allow you to push errors into production, because it doesn't know any better.

So, we still need the TypeScript CLI in order to catch errors. But if Vite is transpiling our code, we don't need TypeScript to do it too.

### TS as Linter
Inside the `tsconfig.json` file, there's an option called `noEmit` that tells `tsc` whether or not to emit JavaScript files.


## Essential Types and Annotations

### Basic Annotations

One of the most common things you'll need to do as a TypeScript developer is **to annotate your code**. Annotations tell TypeScript what type something is supposed to be.

Annotations will often use a `:` - this is used to tell TypeScript that a variable or function parameter is of a certain type.

One of the most important annotations you'll use is for **function parameters**.

### Basic Types
string, number, boolean, symbol, bigint, null, undefined

#### Function Parameters Always Need Annotations

TypeScript can't tell from a function parameter alone what type it's supposed to be. When you don't annotate it, it defaults the type to `any` - a scary, unsafe type.

### any

When TypeScript doesn't know what type something is, it assigns it the any type.

This type breaks TypeScript's type system. It turns off type safety on the thing it's assigned to.

This means that anything can be assigned to it, any property on it can be accessed/assigned to, and **it can be called like a function**.

```js
let anyVariable: any = "This can be anything!";
anyVariable(); // no error
anyVariable.deep.property.access; // no error
```

### Object Literal Types

```js
const talkToAnimal = (animal: { name: string; type: string; age: number }) => {
  // rest of function body
};
```

This curly braces syntax is called an object literal type.

### Type Aliases

```js
type Animal = {
  name: string;
  type: string;
  age?: number;
};
```

This is what's called a type alias. It's a way to give a name to a type, and then use that name wherever we need to use that type.

```js
type Id = string | number;
```

Using a type alias is a great way to ensure there's a single source of truth for a type definition.


### Arrays
`string[]` or `Array<string>`

### Tuples
Tuples let you specify an array with a fixed number of elements, where each element has its own type. Creating a tuple is similar to an array's square bracket syntax - except the square brackets contain the types instead of abutting the variable name:

```js
let tup: [string, number] = ['app', 6];
```

Tuples are useful for **grouping related information together** without having to create a new type.


#### Named Tuples
```js
type MyTuple = [album: Album, playCount: number];
```

The inline approaches are useful, but it is preferred extracting them out to **a new type**.


### Not All Functions Can Receive Types
Most functions in TypeScript can't receive types.

For example, let's look at `document.getElementById` that comes in from the DOM typings.

```js
const audioElement = document.getElementById<HTMLAudioElement>("player");  // ERROR
```

`.getElementById` contains no angle brackets `(<>)` in its hover, which is why we can't pass a type to it.

So, to fix our code above we could replace `.getElementById` with `.querySelector` and use the #player selector to find the audio element:
```js
const audioElement = document.querySelector<HTMLAudioElement>("#player");
```

So, to tell whether a function can receive a type argument, hover it and **check whether it has any angle brackets**.

### Default Parameters
```js
const fn = (
   a: string,
   b: number = 5,
) => {
   // fn body
}
```

### Function Types

We've used type annotations to specify the types of function parameters, but we can also use TypeScript to describe the types of functions themselves.

```js
type Mapper = (item: string) => number;
```

This is a type alias for a function that takes in a string and returns a number.

We could then use this to describe a callback function passed to another function:

```js
const mapOverItems = (items: string[], map: Mapper) => {
  return items.map(map);
};
```

### Void Type
`console.log()` doesn't return anything.

### Typing Async Functions

```js
const getUser = async (id: string): Promise<User> => {
  const user = await db.users.get(id);
  return user;
};
```


## Unions, Literals, and Narrowing

Let's pause for a moment to introduce a couple more types that play an important role in TypeScript, particularly when we talk about 'wide' and 'narrow' types.

#### The Widest Type: `unknown`
Root of all other types.
```js
const fn = (input: unknown) => {}

// Anything is assignable to unknown!
fn('hello')
fn(42)
fn(true)
fn({})
fn([])
fn(() => {})
```

### What's the Difference Between unknown and any?
They're both wide types, but there's a key difference.

`any` doesn't really fit into our definition of 'wide' and 'narrow' types. It breaks the type system. It's not really a type at all - **it's a way of opting out of TypeScript's type checking**.

`any` can be assigned to anything, and anything can be assigned to `any`. `any` is **both narrower and wider** than every other type.

`unknown`, on the other hand, is part of TypeScript's type system. It's wider than every other type, so it can't be assigned to anything.

```js
const handleWebhookInput = (input: unknown) => {
  input.toUppercase();  // ERROR: 'input' is of type 'unknown'.
}

const handleWebhookInputWithAny = (input: any) => {
  // no error
  input.toUppercase()
}
```

This means that `unknown` is a safe type, but `any` is not. `unknown` means "I don't know what this is", while `any` means "I don't care what this is".

### The Narrowest Type: never
If `unknown` is the widest type in TypeScript, `never` is the narrowest.

`never` represents something that will `never` happen. It's the very bottom of the type hierarchy. You cannot assign anything to `never`, except for `never` itself. However, you can assign `never` to anything.

### never vs void
Let's consider a function that never returns anything:
```js
const getNever = () => {
  // This function never returns!
}
```
When hovering this function, TypeScript will infer that it returns `void`, indicating that it essentially returns nothing.
```js
// hovering over `getNever` shows:
const getNever: () => void
```

However, if we throw an error inside of the function, the function will never return:
```js
const getNever = () => {
  throw new Error('This function never returns')
}
```
With this change, TypeScript will infer that the function's type is **never**:
```js
// hovering over `getNever` shows:
const getNever: () => never
```

### Type Narrowing
`instanceof, unknown, type guards, if`

