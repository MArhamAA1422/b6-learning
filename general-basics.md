## ES6 এবং টুলিং
ES6 হল ECMA Script 6 এর ছোট ফর্ম। আর ECMA Script এর ফুল ফর্ম হচ্ছে **European Computer Manufacturer’s Association**. একমা স্ক্রিপ্ট একটি কোম্পানি যারা জাভাস্ক্রিপ্ট এর স্ট্যান্ডার্ড মেইনটেইন করে এবং rules সেট করে। Brendan Eich ১৯৯৫ সালে জাভাস্ক্রিপ্ট প্রথম তৈরী করেন। প্রথমে এটার নাম ছিল Mocha, পরে হয় LiveScript, এবং শেষে এটা JavaScript নাম এ রূপ নেয়। এরপর ১৯৯৭ সালে Netscape এটাকে Ecma International এর কাছে উপস্থাপন করে, এবং ECMAScript(ECMA-262) স্ট্যান্ডার্ড তৈরী হয়। JavaScript, ActionScript, JScript, TypeScript সবাই ই ECMAScript এর সাবসেট।

### টুলিং
যেহেতু জাভাস্ক্রিপ্টে একটা বিশাল বিপ্লব হয়েছে, এবং ফ্রন্টএন্ড, ব্যাকএন্ড, ইভেন নেটিভ মোবাইল এপ্স তৈরী  করতে জাভাস্ক্রিপ্টকে ব্যবহার  করা হচ্ছে, কোড লেখা থেকে শুরু করে ডিবাগিং ,টেস্টিং , ডিপ্লোয়িং সব জায়গায় অনেক রকমের টেকনোলজির দরকার হয়। শুধু একটি টেকনোলজি সব উদ্দেশ্য সাধন করে না। তাই প্রত্যেক স্টেপ এ বিভিন্ন রকমের প্রোগ্রাম এন্ড টেকনোলজির প্রয়োজন হয়। এইগুলাকেই  জাভাস্ক্রিপ্ট  টুলিং বলা হয়।

- Static Type Checking এর জন্য: TypeScript, Flow

- Code Linting এর জন্য: ESLint, JSLint (Linting হচ্ছে সেই প্রসেস যেখানে কোড এর কোয়ালিটি এবং ফরমেটিং চেক করা হয় এবং সে অনুযায়ী ওয়ার্নিং দেয়া হয়)

- Code Formatters: Prettier 

- Package Managers: NPM, Yarn, Bower

- Task Runners: Gulp, Grunt

- Module Bundlers: Webpack, Rollup

- Build Tools: Webpack, Parcel

- Transpiler: Babel (সোর্স টু সোর্স যেমন TypeScript টু Pure JS করাকে কে **ট্রান্সপাইল**  বলে)

- Debuggers: Chrome Dev Tools, Code Editors like VS Code, Jetbrains WebStorm, etc.

## open a webpage (under the hood)
- html parsing: DOM Tree
    - Browser reads HTML line by line.
    - It creates a Document Object Model (DOM) → a tree-like structure of all elements (`<div>, <p>, <button>` etc.).
- css parsing: CSSOM Tree
    - tells styles for each element
- DOM + CSSOM = Render Tree
- Layout (Reflow)
    - Browser calculates where each element should be placed on the page.
- Painting
    - Browser fills in pixels (text, colors, borders, images).

- Compositing
    - Browser layers everything correctly and shows the final page to you.

- HTML & CSS
    - They don’t have loops, if-else, or memory control = so not Turing complete.

## In short
- HTML = structure becomes DOM

- CSS = style becomes CSSOM

- HTML/CSS is rendered by an engine

- Browser merges them into Render Tree, does layout → paint → composite

- They are interpreted, not compiled, but browsers optimize heavily.

- They (HTML, CSS) don’t “execute” by themselves — they need a **rendering engine** (like **Chrome’s Blink**, Firefox’s Gecko, Safari’s WebKit).

- There are environments that embed a browser engine or reimplement it:
    - **Electron.js**
    - Mobile Apps (React Native)

- CLI (NodeJS)
    - **jsdom**: parse HTML & emulate DOM.

    - **parse5**: parse HTML.

    - **postcss**: parse & transform CSS.

## Performance Basics

- Repaints/Reflows are expensive → changing layout (width, height, position) is slower than changing colors or opacity.

- CSS selectors are optimized left-to-right → #id is fastest, long chains (div ul li a) are heavier.

- Use fewer DOM elements → deep nesting slows layout.

- Animations → prefer transform & opacity (GPU accelerated).

## Browser
- localstorage, timer, UI, locationAccess, URL, JS Engine (inside there is a callstack)
- Part of Browser (not JS)
    - WEB APIs (window): `setTimeout, DOM APIs, fetch, localStorage, console, location`
    - Browser gives access to JS Engine through WEB APIs
    - `window.fetch()` = `fetch()`, same for others

## Concurrency Model in JS
For example: `startTimeout` callback will be waiting in callback queue to finish execution of the GEC in call stack.

## Higher order functions
- A function that takes another function or return a function.
- Functional programming
- DRY
- Single Responsibility
```js
const rad = [1, 2, 3];
const area = function (r) {
    return Math.PI * r * r;
}

// every array will get this function, can access it, using prototype
Array.prototype.calculate = function(logic) {  // custom map
    const output = [];
    for (let i = 0; i < this.length; i++) {
        output.push(logic(this[i]));
    }
    return output;
}

console.log(rad.calculate(area));
```