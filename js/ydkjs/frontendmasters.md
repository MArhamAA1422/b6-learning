## Info
- Basic building block of logic: Function
- An array is an ordered collection of values
- null & undefined both are empty values (absence of meaningful values), treat them similarly (recommendation)
- typeof null cannot be fixed due to potential web compatibility issues
- Dangerous: when the reader cannot tell what will happen
- prototype and this are vice versa in terms of understanding them
- bash language has **dynamic scope**, as bash is not compiled (no compile time scope), so it is justified
- abstract operation: ToPrimitive (for example: toNumber, toString, valueOf)

## Type coercion (avoid case)
- == with 0 or "" (or even " ")
- == with non-primitive
- == true or == false

## Closure
Closure is considered **one of the most important and prevalent** concepts in computer science, with nearly every modern programming language now incorporating it. It was revolutionary when introduced in JavaScript in the mid to late 90s and has become ubiquitous across programming paradigms. Closure predates computer science and originated in lambda calculus, a mathematical system that existed before programming languages. It was initially an academic concept before being adopted by programming languages.

## new Function()
Calling a function with "new" will cause these 4 things:
- create a brand new empty object
- link that object to another object
- call function with "this" set to the new object
- if function does not return an object, assume return of "this"

## 4 ways of invoking a function in JS (this)
1. Default binding
2. Explicit binding (call/apply/bind)
3. Implicit binding (with a context object)
4. Constructor binding (with new keyword)

In non-strict mode, when a function with 'this' is called without a context => The global object is used as the default binding, which is generally not the desired behavior.