## JS Engine
A JavaScript engine will always consist of a **Call Stack** and a **Memory Heap** and will run on one thread (The JavaScript engine **itself runs in several threads** (processes) that do different things: compressor for example, garbage collection, etc.)

## Compilation (JIT)
Computers fundamentally understand machine code, which can be represented as **assembly language**. Therefore, all software must eventually be converted into a format the computer can execute directly. There are three common approaches to this conversion process:
- Compilation
- Interpretation
- Just-in-time compilation

### Compilation (Ahead of time compilation)
In this method, all the code is converted to machine language at once, and then **written to a file in assembly**, so that the computer can run the software, which can happen even a long time after the file was created.

### Interpretation
In this method, the Interpreter goes through the code in an initial pass and then executes it line by line. During the runtime, while running line by line, the code is also **compiled into machine language**.

In the past, JavaScript was primarily an interpreted language, which led to certain performance limitations. As web developers discovered, interpreting JavaScript line by line made it challenging to implement optimizations effectively. **This is partly due to JavaScript’s dynamic nature, where data types can change at runtime.** For example, *if a variable is consistently used as a Boolean, an interpreter may still allocate more memory than necessary because it cannot make assumptions about the variable’s type.*

Over time, advances in JavaScript engines, such as just-in-time compilation (JIT), have been introduced to address these inefficiencies, resulting in significant performance improvements.

### Just-in-time compilation
In this approach, the entire code is translated into machine language in a single step and is executed immediately afterward. During the conversion process, no intermediate files are created; instead, the code is directly compiled into machine language and executed without delay. This method streamlines the execution process by combining the compilation and execution steps, thereby enhancing the overall efficiency of code processing and execution.

JIT compilation also offers advantages over ahead-of-time compilation, as it can perform **optimizations based on runtime information** that would not be available during a traditional compilation process.

## Steps involved in JIT (inside JS Engine)
1. Parsing (AST)
2. Compilation
3. Execution (happens in call stack)
4. Optimization => go to step 2 (cycle)