## JS Runtime Environment
JS Engine, API (connecting outside world), Event Loop, Callback Q, MicroTask Q

## JS Engine
- Heart of JS runtime env
- First JS engine: SpiderMonkey
- not a machine (not a hardware)
- just a piece of code (software)
    - v8 is written in C++
- Components
    - Interpreter
    - Compiler
    - GC
    - Optimizer (connected to compiler)
    - Memory Heap (connected to GC)
    - a call stack

## In RAM
- The Call Stack (a data structure) lives in the JS Engine’s memory space (RAM).
- The GEC is the first frame pushed onto the Call Stack.

## Execution Context
- everything in js happens inside at EC (like a box, a DS)
- **Memory component** or Var env
    - variables, functions
- **Code component** or Thread of Execution
- js is synchronous single-threaded language

## How JS code is executed
- first **global execution context**, যা `main()` দ্বারা রিপ্রেসেন্ট করা হয়
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

## When a JS code runs
- a GEC will be created
- a Global Object (window, global) will be created
- a "this" will be created, pointing the GO
- all these will be created by JS engine
    - like engine creates GEC, then GEC creates others
- window/this can access global scope
- function declarations go to HEAP memory (memory creation phase)
- window (global object) lives outside your code, provided by the runtime (say, browser). The GEC just points to it, and *this* in global scope is a reference to it.

## Function Execution Context (Creation Phase Browser)
- arguments: Local Object
- this: window
- a: undefined

## Call Stack
- a stack, managing execution contexts
- bottom element: GEC (global execution context)
- other contexts will be pushed/popped in this stack
- maintains the order of execution of EC
- other names: (EC, program, control, runtime, machine) stack

## Memory vs Call Stack
- Memory (Heap / Variable Environment)
    - Stores objects, arrays, functions, variables.
    - Managed by the engine’s Heap.
- Call Stack
    - A stack data structure → tracks which execution context is running.
    - Each context = one "stack frame".
    - Lives in RAM, managed by the engine.
- Everything in RAM
    - The JS Engine (like V8) is a program **written in C++** that manages this memory.

#### localStorage an API in browser, different in NodeJS

### Same API both in browser and NodeJS
- setTimeout
- console

## Garbage Collector
- **Mark & Sweep Algorithm**

## Optimization (compilation)
- inlining
- copy elision
- inline caching

## V8 Engine
- JS source code > parser > AST > Ignition (interpreter) > Bytecode
Ignition > Turbofan (compiler) > Optimized MC > Bytecode
- GC: Orinoco, Oilpan