## Execution Context
- everything in js happens inside at EC (like a box)
- **Memory component** or Var env
    - variables, functions
- **Code component** or Thread of Execution
- js is synchronous single-threaded language

## How JS code is executed
- first **global execution context**
- memory creation phase
    - each var = **undefined**
    - whole block of the function
- code execution phase
    - actual value of each var
    - function invocation
        - functions are the heart of JS
        - a **new execution context** will be crated inside code component (again, memory, code components, phase: memory creation, code execution)
        - every var (including arguments) = undefined in memory creation phase
        - return back to the invoker execution context
        - delete the execution context (for function)
- finally whole global execution context will be deleted

## Callstack
- a stack, managing execution contexts
- bottom element: GEC (global execution context)
- other contexts will be pushed/popped in this stack
- maintains the order of execution of EC
- other names: (EC, program, control, runtime, machine) stack 

## Hoisting
- var: undefined
- function: actual function body (no issue)
- reason: memory phase
- function expression: behaves like variable not function
```js
console.log(fn);  // undefined
var fn = () => {};
```

## When a JS code runs
- a GEC will be created
- a Global Object (window, global) will be created
- a "this" will be created, pointing the GO
- all these will be created by JS engine
- window/this can access global scope
