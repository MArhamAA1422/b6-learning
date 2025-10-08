## Intro
React is famous for amazing Developer Experience.
- Render/re-render UI & React to user io
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
   - `<SampleComp>childrenHTML</SampleComp>`

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

## State: A Component's Memory
- Component **data** that can be changed.
- Component's own database.
- Not props, it resides inside the component.
- **state is JS object**.
- **this.state**, **this.setState**
   - setState: React will be reactive and re-render.
```js
class Clock extends React.Component {
   // constructor(props) {
   //    super(props);
   //    this.state = { data: new Date() };
   // }  // if we're not using props, then we've shortcut

   state = { data: new Date() };

   componentDidMount() {
      this.clockTimer = setInterVal(() => this.tick(), 1000);
   }

   componentWillUnmount() {
      clearInterval(this.clockTimer);
   }

   tick() {
      this.setState({
         date: new Date(),
      });
   }

   render() {
      return (
         <span>{this.sate.data.}</span>
      );
   }
}
```

## Using state correctly
- Do not modify state directly, use setState, React understands setState
- State update maybe asynchronous
   - React may **batch multiple setState()** calls into a single update for performance
   - **For current state use function with parameters**
   ```js
   this.setState(function(state, props) { return state + props; });
   ```
- **State update & merged**
   - when setState() is called, React merges the object provided into the current state
   - so, we can update properties/state individually
- Don't update reference type, make a copy of them, then update. Otherwise an unintended rendering will happen cause state is changed.
- **The Data Flows Down**
   - Unlike Vue/Angular, React provides **one way data flow**, that's another big reason for the popularity of React.
   - A component may choose to **pass its state down as props** to its child components.
   - Top-down data flow, from top to bottom

## Life Cycle

#### componentDidMount()
- DOM is present in Page, then it will be called.

#### componentWillUnmount()
- Before DOM leaves, this will be called.

#### componentDidUpdate(prevProps)

#### shouldComponentUpdate(nextProps, nextState)
- manually control re-rendering
- returns true/false based on conditions, true means re-render component
- `.bind()` returns **new function reference** each time, that can cause component rerendering even if we use this life cycle

## Solve issue with 'this' in callback
- We can use arrow function
- We can use `.bind()`
- Also, we can use pre-saved outer "this"

## Handling Events

#### Prevent default
- For example: don't go to the link that is clicked, submit button handle
- `event.preventDefault()`

## Conditional rendering
- ternary operator
- && operator
- use variable to construct the element

## Controlled vs Uncontrolled Component
- Controlled input has `value` attribute/property.
- (no value attribute) DOM manages uncontrolled one. (also, can use **ref**)
- For controlled input, React takes the responsibility, but also it requires **state**.

```jsx
export default class Form extends React.Component {
   state = {
      title: "js",
   };
   handleChange = (e) => {
      this.setState({
         title: e.target.value,
      });
   }
   render() {
      const { title } = this.state;
      return (
         <div>
            <form>
               <input type="text" value={title} onChange={this.handleChange}/>
            </form>
         </div>
      );
   }
}
```

## Inheritance vs Composition
- React encourages to use Composition
- Inheritance is only in `React.Component` for class components
- In inheritance
   - components are tightly coupled, dependent
   - components should be independent
- In composition
   - receive props
   - `<Emoji> {(addE) => <Text addE={addE} />} </Emoji>`

## Style in React
- In JSX we need to provide style as **Object**
- background-color => backgroundColor
```jsx
const style = { backgroundColor: white, color: black }
return (
   <p style={style}>Sample Text with Style</p>
);
```

## Props Drilling
Data flow from root to leaf. Some components may get prop but they don't require. Solution:

- HOC pattern (avoids PD)
- Render Prop pattern (avoids PD)
- Context API (actual solution)

## Higher Order Component
- Takes a component as parameter, returns another(updated) component.
- New component with necessary props.
- Naming convention: name starts with "with"
   - `withCounter.js`
   - `export default withCounter(ClickCounter)`

## Render Prop
Prop that defines render logic. Function involved in props.

```jsx
<User render={(cond) => cond ? 'a' : 'b'} />
```

`this.prop.children`
```jsx
<Counter>
   {(counter, incCount) => {
      <ClickCounter count={counter} incCount={incCount} />
   }}
</Counter>
```

## Context API
- Provide props to only relevant components anywhere in the Component Tree.
- Basically a storage system, a design pattern.
- If provider's value changes, all consumers will also be re-rendered.

### Procedures
- Create a Context, it provides 2 things:
   - Context Provider
   - Context Consumer
- Wrap parent with Context Provider
- Provide a value of the context as prop
- Wrap child with Context Consumer
- Consumer follows the render prop pattern

We can build our own context class:
```js
class Context {
   constructor(value) {
      this.value = value;
   }

   Provider = function({ children, value }) {
      this.value = value;
      return children;
   }

   Consumer = function({ children }) {  // Here, children is a render prop
      return children(this.value);
   }
}

export function createContext(value = null) {
   const context = new Context(value);
   return {
      Provider: context.Provider,
      Consumer: context.Consumer,
   };
}

// SampleContext
export const SampleContext = createContext();

// uses
<SampleContext.Provider />
<SampleContext.Consumer />
```

## Context in Class component
- `ClassName.contextType = SampleContext;`, then we can use the context using "this"
- It will be a **static property**
- Easier than render prop

## Context in Function component
- **useContext()**
- `const context = useContext(SampleContext);`
- No need of **Provider**, **Consumer** use

## Modern React (Intro to Hooks)
## Historical Context
- May 29, 2013: released react v0.3.0
   - No, JS class support
   - React.createClass({}), render() in object prop
- Jan 17, 2015: ES6 class declarations
- Jan 27, 2015: React Native Classes v0.13.0
   - extends React.Component
- Feb 16, 2019: React Hooks v16.8 (modern react)

## Issues Before Hooks and Solutions
- complex state: **useState**
- lifecycle methods (side effect, data from server): **useEffect**
- sharing same logic: **customHook**
- duplicate code: **useEffect**

#### React simplified stuffs with *Simple JS Function* instead of OOP
#### Wordpress first introduced HOOKS

## Some points of Hooks
- Hooks are optional & classes won't be removed from React
- Hooks can't be used inside class component
- Hooks just provide a more direct API to the already known react concepts
- Functions as stateful components

## useState
- setState re-renders the component, but only the **return part**, not whole component stuffs.
- we can implement our own useState function
- For object state, we should provide full update, useState doesn't merge updates individually
   - Solution: use object spread operator: `...obj,` then write the individual update
- How to use Previous state (React uses batch update for better UI)
   - **use callback function with prevState** as parameter
- Whenever a component’s state or props change, React schedules a render.

## useEffect
- Working with side effects
- Starts working after the UI loaded: rendering > VDOM > DOM > useEffect
- React's main duty: Render JSX, Manage State & Props, React to Events/Inputs, Evaluating State/Props Change
- Anything other than that: side effects
   - fetching data from any API
   - updating the DOM
   - setting any subscriptions/timers
- Without dependency array, useEffect will run for each re-render
- Life cycle method can be written once, but useEffect can be multiple in same component
- Empty dependency array ([]) == componentDidMount

### componentWillUnmount with useEffect
- for cleanUp purpose
- useEffect can return something
- Before leaving from DOM we can return an anonymous function from useEffect that will only work in the time of leave
```jsx
useEffect(() => {
   console.log('starting timer');
   const interval = setInterval(tickFunc, 1000);

   // do the cleanup
   return () => {
      console.log('component unmounted');
      clearInterval(interval);
   };
})
```

## useCallback & useMemo
- Help in performance optimization.
- Stop unnecessary re-rendering
- `useMemo` is not a hook

### Memo
- Like HOC
- component caching
```js
export default React.memo(Title);  // Title is a component
```
- Function is a object (reference) type, so in prop it would cause component re-render, even if we use memo.
   - **Solution**: useCallback

### useCallback
- Has dependency array like useEffect
- Memoize the function ref, cache function body
- Memoize a **callback function** and only forgets while the dependencies of the callback function get changed
```js
const incByOne = useCallback(() => {
   setCount((prev) => prev + 1);
}, []);
```

### useMemo
- Memoize **function return value**
- Has dependency array
- Forgets while the dependencies of the function get changed
```js
const isEvenOrOdd = useMemo(() => {
   for (let i = 0; i < 1000000000; i++) {}  // costly operations
   return count1 % 2 == 0;
}, [count1]);  // count1 is outside the function
```

## useRef
- Take control on DOM (or any React) element. `someRef.current`
- Stays in memory even if component does re-render
- Returns an object
- We can update useRef using current: `eleRef.current = updateValue`

```jsx
const inputRef = useRef(null);
useEffect(() => {
   // component did load
   console.log(inputRef.current);
}, []);

<input ref={inputRef} />
```

## forwardRef
Need ref of something out of the component.
```jsx
<Input ref={inputRef} text="some" />
```
```jsx
function Input({text}, parRef) {
   return <input ref={parRef} text={text} />
}
const forwardedInput = React.forwardRef(Input);  // call with "ref" as parameter
export default forwardedInput;
```

## useReducer
- A hook that is used for **state management** purpose.
- useState() is built based on useReducer()
- useReducer is the alternative of useState
- `Array.prototype.reduce()`
```js
useReducer(reducer, initialValue)  // same as array.reduce()
newState = reducer(currentState, action)
```
- returns a tuple - `[newState, dispatch]`
- `dispatch` a function that provides action

```js
const initialState = 0;
const reducer = (state, action) => {
   switch(action) {
      case 'increment':
         return state+1;
      case 'decrement':
         return state-1;
      default:
         return state;
   }
}

function CounterComp() {
   const [count, dispatch] = useReducer(reducer, initialState);
   return (
      <button onClick={() => dispatch('increment')} />
   );
}
```

- If we need to provide some more information (multiple complex operations, multiple states), we can set **action and state as OBJECT**

 ## useReducer in global context
 - we can use context API
 ```jsx
export const counterContext = React.createContext();
function GrandParentComp() {
   const [count, dispatch] = useReducer(reducer, initialState);
   return (
      <counterContext.Provider value={{ countDispatch: dispatch }}>
         <ComponentA />
      </ counterContext.Provider>
   );
}
```

```jsx
import { counterContext }
function ComponentA() {
   const countContext = useContext(counterContext);
   return (
      <button onClick={() => countContext.countDispatch('increment')}>
   );
}
```

## When useReducer instead of useState
- Multiple state changes are related
- State data type: non-primitive
- complex logic
- scope of state is GLOBAL

## Custom Hooks
- Typical JS function, name stars with 'use' (so that React could identify it as a hook)
- Simplistic way of **logic share** among function components

## Styling React Components
- `import '../assets/css/src.css'`, global CSS
- CSS Module
   - specific for a particular component, React won't apply it to global scope
   - name: `CompName.module.css`, then `import styles '../assets/css/Logo.module.css'`.
   - Now, **styles** is a JS object.
   - `<Element className={styles.logo} />`
   - Multiple elements push
      - Using template string: `className={`${style.prop} border`}`
      - Using array: `className={[style.prop, 'border'].join(' ')}`
- Inline Style
   - Must provide as a object
   - `<Element style={{ fontSize: 16px }} />`
- Styled Component package
   - CSS as react component
   - npm install
   - naming convention: `Container.styles.js`
   ```js
   import styled from 'styled-components';
   const Container = styled.div`
      display: flex;
   `;
   export default Container;
   ```
   - send props: `<Tag color='black'>EXCLUSIVE</Tag>`
   ```js
   const Tag = styled.span`
      display: flex;
      color: ${(props) => props.color}
   `;
   ```
   - Nested CSS (parent to child)
   ```js
   export const ButtonContainer = styled.div`
      margin-top: 10px;
      & a {
         display: inline-block;
      }
   `;
   ```
   - Styling custom component
   ```js
   import Title from '../Title';
   export const StyledTitle = style(Title)`
      color: white;
   `;
   ```

## React Router
- `npm i react-router-dom`
- `BrowserRouter` as `Router`
- `<Route exact path="/" component={Home} />`
- `<Link to='/home'>`
- Every routing/navigation should be inside `<Router>` in React
- A special version of `<LinK>` that will add styling attributes to the rendered element when it matched the curren URL: `<NavLink>`
- `<Switch> <Route /> </Switch>`

### Dynamic Link
- Using `/:`, route parameter
- `<Route exact path="/posts/:category/:topic" component={Posts} />`
- We can get the route path in component **props**.

### Passing Props
```jsx
<Route exact path="/service">
   <Services batch="6" />
</Route>
```
- Also we can use render prop pattern
```jsx
<Route exact path="/home" render={() => <Home />} />
```

### Redirection
- If user is logged in, redirect to home page.
```jsx
<Route exact path="/login">
   {isLoggedIn ? <Redirect to="/dashboard" /> : <Home />}
</Route>
```

## Router Hooks
#### useParams
```jsx
const parameters = useParams();  // returns a object
```
#### useHistory
#### useLocation