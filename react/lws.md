## Intro
React is famous for amazing Developer Experience.
- UI handling, huge project maintain: hard for Vanilla JS or jQuery

```js
const domContainer = document.querySelector('#root');
const myElement = React.createElement('div', null, "Hello World");

ReactDOM.render(myElement, domContainer);
```
React has it own world like browser. It's markup language is **JSX**. Only focused in FrontEnd. Works with UI.

## Rendering process in browser
- HTML => parser => DOM
- CSS => parser => CSSOM
- DOM + CSSOM => Render Tree (element, style, coordinate) => Painting => Display
- Repainting/Reload is slow in browser, **DOM is fast**.

### Solution
- Batch Update
   - Combine element then put in DOM, single DOM operation
- Reduce DOM operation

## Virtual DOM
Save stuffs, if in need provide the necessary one. If react wants to update exact element, **React needs the previous and future stage** of update, so that it can compare. But it is problematic in DOM. So, React creates separate world, only works with **JS OBJECT**. React creates a replica of DOM as JS OBJECT in browser, named VIRTUAL DOM.

## How Virtual DOM works
- We can think Virtual DOM as a Tree. Nodes = component (element).
- React maintains previous and updated tree (stage) of any change.
- Using a very efficient algorithm React identifies the changes.
   - Diffing algorithm or **Reconciliation** algorithm.
- React maintains **ID** or **KEY** for each element.
- We can observer VDOM in browser using: Rending > Paint flashing

## Virtual DOM slow?
- Rerendering also happens in VDOM, but still it is faster than repainting.
- Rerendering in VDOM is not costly.
- Negligible impact.
- Not slow, not fastest, but fast enough.
- Performance is not the main concert in React, we can achieve it with Vanilla JS. **Main point is manual DOM manipulation**. React (data manipulation, not DOM).

## DOM element include
- createElement
- appendChild

## React element vs DOM element
- React element is a **valid JS object**, but DOM's one is not.

## JSX
- We create VDOM using JSX in React.
- **Interpolation**: JS inside HTML

## JSX to VDOM (JS) object

```jsx
const element = (
   <h1 className="heading" tabIndex={index}>
      Hello World
   </h1>
)
```

```js
element = {
   type: 'h1',
   props: {
      className: 'heading',
      tabIndex= 0,
      children: 'Hello World',
   },
}
```

## Security from Server response
- React system: Stuffs in `{}` will be escaped, won't be executed.
```jsx
const element = {
   <span class="text">{apiResponse}</span>
}  // apiResponse could include malicious code
```

### React element is the smallest stuff.

## React is Platform Agnostic
- Element creation procedure is same in mobile or web.
- Only change: ReactDOM, ReactNative

## React Element
- React element is **immutable**.
- We'll **change data**, not element (React element), then UI'll be changed.

## Component
- A function that returns a React Element.
- `<ComponentName />`
- **Never change props inside components**.
   - Issue: React component will re-render whenever props change. Eventually **cause infinite loop**. As, props change is inside the component.

## Class Component
- Function component cannot change itself, it requires **props** from outside.
- Class component is powerful, **it is stateful**, it can change itself.
- Given by React.
- React can identify Class Component like Function Component using `React.Component`.
- Class has its own `render` function. **ReactDOM will execute that**.
- **this.props**
- **this.props.children**
   - `<Sample>childrenHTML</Sample>`

```jsx
class Sample extends React.Component {
   render() {
      return (
         //
      );
   }
}

ReactDOM.render(<Sample />, document.getElementById('root'));
```