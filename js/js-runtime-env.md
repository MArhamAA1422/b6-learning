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