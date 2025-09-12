## Mark-and-Sweep Algorithm
GC starts from roots → in JS, the global object (window in browsers, global in Node.js), plus things like local variables currently on the call stack.

### Mark Phase
- **Starting from roots**, the GC marks all reachable objects.

- It follows references (pointers) → like a graph traversal (BFS/DFS).

- Any object reachable from a root gets a “marked = alive” flag.

### Sweep Phase
- Now the GC scans through the **heap** (all allocated objects).

- If an object is not marked → it means no root can reach it.

- That object’s memory is freed (recycled).

### Compact Phase (optional)
Some engines also compact memory after sweeping →
to avoid fragmentation (holes in memory).

## Performance Aspects
- Pause-the-world: GC may stop JS execution while collecting.

- Optimizations:

    - Incremental GC: do marking in chunks.

    - **Generational GC**: most objects die young → collect “young space” more often.

    - Concurrent GC: run in parallel with execution.