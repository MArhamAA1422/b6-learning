## Kickstart your TS setup

Anders Hejlsberg, the inventor of C# was also the inventor of TypeScript (around 2010, at Microsoft). A new language that was closer to JavaScript, but that enabled all the IDE features that JavaScript is missing? In many metrics, it is even more popular than JavaScript.

TypeScript wasn't invented to make JavaScript strongly typed. It was built to **allow amazing tooling** for JavaScript.

Imagine you're building an IDE, and you want to give people warnings when they mis-type a function name or an object property. If you don't know the shapes of the variables, parameters and objects in your code, you'd have to resort to guesswork.

But if you do know the types of everything in your app, you can begin implementing powerful IDE features like autocomplete, inline errors and automatic refactors.

So, TypeScript aims to provide just enough strong typing to make working with JavaScript more pleasant and productive.

### pnpm

pnpm is used the same way as npm, but it is more efficient. Instead of having individual node_modules folders for each project, pnpm **uses a single location on your computer** and hard links the dependencies from there. This makes it run faster and use less disk space.

TypeScript and its dependencies are contained within a single package, called typescript. `pnpm add -g typescript`



