## Inlining
Replacing a function call with the body of the function itself.

Why?
- Function calls have overhead (stack frame, jump, return). Inlining removes that overhead.

But engines don’t inline blindly:
- Too big functions aren’t inlined.
- Functions that change shape (polymorphic) may not be inlined.

## Copy Elision (a.k.a Return Value Optimization)
Avoiding unnecessary copies of objects.

## Inline Caching (IC)
Huge optimization in dynamic languages like JS.

Problem: 
- JS is dynamic → property lookups are expensive.

### Inline Caching solution:

- First time → engine records where "name" is stored in the object’s memory shape (hidden class).

- Next calls → it directly jumps to that memory slot.

Property access becomes almost as fast as in static languages like C++.

But → if objects change shape (adding/removing properties), IC gets “megamorphic” (slow).

## Visual Analogy
- Inlining = Instead of “calling a friend for a recipe”, you copy the recipe into your notebook.

- Copy elision = Instead of writing the recipe twice (once in your friend’s notebook, once in yours), you directly write it in yours.

- Inline caching = Instead of searching your kitchen every time for “salt”, you remember its exact shelf location.

## Why these matters for JS
JavaScript is dynamic & interpreted, but engines (like V8) make it near C++ speed thanks to these tricks:

- Functions → inlined.

- Objects → optimized with hidden classes + IC.

- Returns → avoid copies.