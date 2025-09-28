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

## JSX
JSX is a syntax extension for JavaScript that looks like HTML but actually compiles to **React function calls**.

Under the hood, this:
```jsx
const element = <h1>Hello</h1>;
```

is compiled to:
```js
const element = React.createElement("h1", null, "Hello");
```

So, JSX just makes writing UI easier and more readable.

### Embedding Expressions in JSX
You can embed JavaScript expressions inside { }.

```jsx
const name = "app";
const element = <h1>Hello, {name.toUpperCase()}!</h1>;
```

You can use any expression (variables, functions, calculations).
You cannot put statements (like `if, for`) directly — use them outside JSX.

## JSX Rules & Differences from HTML
- One Parent Element: Components must return a single root element.
- Use `className` instead of `class`
- Self-closing tags
- Attributes in camelCase: `onclick → onClick`, `tabindex → tabIndex`

### JSX with JS function
You can use inline functions:
```jsx
function App() {
   return (
      <h1>
         Hello, {(() => "app")()}
      </h1>
   );
}
```

## Rendering Elements
In React, “rendering” means taking your JSX and putting it into the DOM so users can see it.

In React 17 and below:
```jsx
const element = <h1>Hello, World!</h1>;
ReactDOM.render(element, document.getElementById("root"));
```

In React 18, the new API is:
```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(element);
```

### Issues with ReactDOM.render()
- It replaces the content of the root element.
- It does not support React 18’s concurrent features (like automatic batching, useTransition, Suspense improvements).
- Deprecated in React 18.

### Advantages of createRoot()
- Enables Concurrent Rendering (React can interrupt rendering for better responsiveness).
- Supports automatic batching → multiple state updates in one go.
- Future-proof (all new features rely on it).

#### In Short
- ReactDOM.render() → old, synchronous, React ≤17.
- ReactDOM.createRoot() → new, concurrent, React 18+.

## Components in React
Think of components as reusable pieces of UI (like Lego blocks).

Each component can be:
- Functional (modern, preferred)
- Class-based (legacy, still important to understand)

### Functional Components (Modern Approach)

- Just a JavaScript function that returns JSX.
- Can use hooks (useState, useEffect, etc.) for state & lifecycle.
- Simple, clean, and preferred in modern React.

Characteristics:
- Lightweight
- Hook support
- Easy to test & read

### Class Components (Legacy, but Important)

- Introduced earlier in React’s history.
- Used `this.state` for state & `this.setState()` to update.
- Had lifecycle methods like componentDidMount(), componentDidUpdate(), componentWillUnmount().

```jsx
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; // state inside constructor
  }

  increase = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increase}>Increase</button>
      </div>
    );
  }
}

export default Counter;
```

## Props (Properties) in React
Props = Inputs to a component (like function parameters).
- They are read-only (immutable).
- Used to pass data from parent → child components.
- You pass it like an HTML attribute.

```jsx
function User({ username }) {
  return <p>User: {username}</p>;
}
```

```jsx
class User extends React.Component {
  render() {
    return <p>User: {this.props.username}</p>;
  }
}
```

## Default Props
```jsx
function Button({ text }) {
  return <button>{text}</button>;
}

Button.defaultProps = {
  text: "Click Me",
};

<Button />  // Renders: "Click Me"
```

## PropTypes (Type Checking)
React doesn’t enforce types, but **prop-types** package helps. Runtime type checking.


```jsx
import PropTypes from "prop-types";

function Profile({ name, age }) {
  return (
    <p>
      {name} is {age} years old.
    </p>
  );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
};

Profile.defaultProps = {
  age: 18,
};
```

If you pass wrong type → React gives a **warning in console**, not an error.

#### props = external data, state = internal data

## React Fragments
A Fragment lets you group multiple elements without adding an extra DOM node (like a `<div>`).

Use Fragments for cleaner, semantic, and optimized DOM.

## Controlled Input
A controlled input is an `<input>, <textarea>, or <select>` element whose value is controlled by **React state**. The source of truth for the input’s value lives in React’s state. Whatever you type into the input updates the state, and then React **re-renders** with the updated value.

`value={name}` → input’s value comes from React state.

#### Controlled input = React state manages the value.

#### Uncontrolled input = DOM manages the value.
To get the value, you’d need **refs** (inputRef.current.value).

## Synthetic Events in React

In React, events (like onClick, onChange, onSubmit) are wrapped inside a `SyntheticEvent object`.

- It’s a cross-browser wrapper around native DOM events.

- Provides the same interface as native events (event.target, event.preventDefault(), etc.).

- React does this to:

   - Ensure consistent behavior across browsers.

   - Improve performance (by reusing event objects with pooling).

## Others
- `onChange={setName("name")}`, setName("name") runs immediately during render, not on change.