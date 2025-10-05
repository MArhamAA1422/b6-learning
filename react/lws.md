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

## State: A Component's Memory
- Component **data** that can be changed.
- Component's own database.
- Not props, it resides insides the component.
- **state is JS object**.
- **this.state**, **this.setState**
   - setState: React will be reactive and re-render.
```js
class Clock extends React.Component {
   // constructor(props) {
   //    super(props);
   //    this.state = { data: new Date() };
   // }  // we're not using props, then we've shortcut

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

#### shouldComponentUpdate(nextProps, nextStage)
- manually control re-rendering
- returns true/false based on conditions, true means re-render component
- `.bind()` returns **new function reference** each time, that can cause component rerendering even if we use this life cycle

## Solve issue with 'this' in callback
- We can use arrow function
- We can use `.bind()`
- Also, we can use presave outer "this"

## Handling Events

#### Prevent default
- don't go to the link that is clicked, submit button handle
- `event.preventDefault()`

## Conditional rendering
- trinary operator
- && operator
- use variable to construct the element

## Controlled vs Uncontrolled Component
- Controlled input has `value` attribute/property.
- (no value attribute) DOM manages uncontrolled one. (using **ref**)
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
Data flow from root to leaf. Some components can get prop but they don't require. Solution:

- HOC pattern (avoids PD)
- Render Prop pattern (avoids PD)
- Context API (actual solution)

## Higher Order Component
- Takes a component as parameter, returns another component.
- New component with necessary props.
- Naming convention: name starts with "with"
   - `withCounter.js`
   - `export default withCounter(ClickCounter)`

## Render Prop
Prop that defines render logic.

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
- Basically a storage system, a pattern.

### Procedures
- Create a Context, it provides 2 things:
   - Context Provider
   - Context Consumer
- Wrap parent with Context Provider
- Provide a value of the context as prop
- Wrap child with Context Consumer
- Consumer follows the render prop patter

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