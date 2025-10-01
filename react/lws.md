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
Save stuffs, if in need provide the necessary one. If react wants to update exact element, React needs the previous and future stage of update, so that it can compare. But it is problematic in DOM. So, React creates separate world, only works with **JS OBJECT**. React creates a replica of DOM as JS OBJECT in browser, named VIRTUAL DOM.

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
- Performance is not the main concert in React, we can achieve it with Vanilla JS. Main point is manual DOM manipulation. React (data manipulation, not DOM).