## Intro to React
React is a JavaScript library (not a full framework) for building user interfaces (UI). It was created by Facebook (Meta) and is now open-source, used by millions of developers.

Core ideas:

- Component-based → UIs are broken into reusable, independent pieces (e.g., Button, Navbar, Card).

- Declarative → You describe what the UI should look like, React figures out how to update it.

- Virtual DOM → React efficiently updates only the parts of the page that change instead of reloading everything.

- Unidirectional Data Flow → Data flows downward from parent to child components, making apps more predictable.

## Why React
- Reusable Components → Write once, use anywhere (like LEGO blocks).
- Fast UI updates → Thanks to the Virtual DOM.
- Huge ecosystem, Cross-platform, Backed by Meta.

## React vs. Vanilla JS
In Vanilla JS, you directly manipulate the DOM:
```js
const element = document.createElement("h1");
element.innerText = "Hello, World!";
document.body.appendChild(element);
```
- Hard to maintain for large apps (lots of DOM updates).
- State management (tracking UI changes) is manual and error-prone.

In React, you just describe UI in components:
```js
function App() {
  return <h1>Hello, World!</h1>;
}
```
- React handles DOM updates automatically.
- State & props make handling changes easy.

## React vs. Other Frameworks

- React → Just the “V” (View) in MVC. You choose extra libraries (e.g., Redux for state, React Router for navigation).

- Angular → Full-fledged framework (routing, HTTP, state, everything included). Steeper learning curve.

- Vue.js → Similar to React, simpler syntax, smaller ecosystem than React.

- Svelte → Compiles at build time (no virtual DOM), very fast but newer ecosystem.