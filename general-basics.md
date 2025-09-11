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

- Browser merges them into Render Tree, does layout → paint → composite

- They are interpreted, not compiled, but browsers optimize heavily.

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