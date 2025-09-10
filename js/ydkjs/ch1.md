## Defined
- JS is an implementation of the ECMAScript standard (version ES2019 as of this writing), which is guided by the TC39 committee and hosted by ECMA. It runs in browsers and other JS environments such as Node.js.

- JS is a multi-paradigm language, meaning the syntax and capabilities allow a developer to mix and match (and bend and reshape!) concepts from various major paradigms, such as procedural, object-oriented (OO/classes), and functional (FP).

- JS is a compiled language, meaning the tools (including the JS engine) process and verify a program (reporting any errors!) before it executes.

## Naming
- Don't use terms like "JS6" or "ES8" to refer to the language. Some do, but those terms only serve to perpetuate confusion. "ES20xx" or just "JS" are what you should stick to. ES2019.

## Web and JS

- `alert(..)` and `console.log(..)` are not defined by JS. But they look like JS. They are functions and object methods and they obey JS syntax rules. The behaviors behind them are controlled by the environment running the JS engine.
- Whether a `var` or `function` declaration in the top-level "global scope" of the console actually creates a real global variable (and mirrored `window` property, and vice versa!).
- `"use strict";`
- The term "**paradigm**" in programming language context refers to a broad (almost universal) mindset and approach to structuring code. Within a paradigm, there are myriad variations of style and form that distinguish programs, including countless different libraries and frameworks that leave their unique signature on any given code.
- Typical paradigm-level code categories include procedural, object-oriented (OO/classes), and functional (FP):

    - Procedural style organizes code in a top-down, linear progression through a pre-determined set of operations, usually collected together in related units called procedures.

    - OO style organizes code by collecting logic and data together into units called classes.

    - FP style organizes code into functions (pure computations as opposed to procedures), and the adaptations of those functions as values.

## Backwards and Forwards
- One of the most foundational principles that guides JavaScript is preservation of backwards compatibility.
- Backwards compatibility means that once something is accepted as valid JS, there will not be a future change to the language that causes that code to become invalid JS.