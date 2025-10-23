## Debouncing and Throttling
This concept is super important in React, especially for optimizing performance in **input-heavy or event-heavy components** (like search boxes or scroll handlers).

### Debouncing
- "Wait until the user stops typing"
- Debouncing ensures that a function is executed only after a certain period of inactivity.
- When typing in a search box, you don't want to make an API call on every keystroke. Instead, wait until the user stops typing for, say, 500 ms, then trigger the search.

### Throttling
- "Allow function to run every X ms"
- Throttling ensures a function is executed at most once every specified time interval (e.g., once every 300 ms), no matter how many times the event fires.
- Handling scroll, resize, or mousemove events — which can fire dozens of times per second — without slowing the app.

Throttling ensures that a function is called **at most once during a specified time interval**, no matter how many times the event is triggered. Unlike debouncing, which waits until the action stops, throttling ensures that the function is executed at regular intervals while the action is still happening.

While it's useful to write your own debounce and throttle functions, you can also use the popular utility library `lodash`, which provides built-in implementations.

## Keeping Components Pure

A pure function:
- Minds its own business. It does not change any objects or variables that **existed before** it was called.
- Same inputs, same output. Given the same inputs, a pure function should always return the same result.

## UI as a tree

React uses trees to model the relationships between components and modules. A React render tree is a representation of the parent and child relationship between components.

## Some Definitions
- **State**: In React, data that changes over time is called state. **State as a Snapshot**

- **Event handlers**: Event handlers are your **own functions** that will be triggered in response to user interactions. Built-in components like `<button>` only support built-in browser events like onClick.

- **Batching**: React processes state updates after **event handlers** have finished running. This is called batching.

## Queueing a Series of State Updates

React waits until all code in the event handlers has run before processing your state updates. This is why the re-render only happens after all these setState() calls. This might remind you of a waiter taking an order at the restaurant.

React does not batch across multiple intentional events like clicks—each click is handled separately. Rest assured that React only does batching when it's generally safe to do. This ensures that, for example, if the first button click disables a form, the second click would not submit it again.

- An updater function (e.g. n => n + 1) gets added to the queue.
- Any other value (e.g. number 5) adds “replace with 5” to the queue, ignoring what's already queued.

In Strict Mode, React will run each updater function twice (but discard the second result) to help you find mistakes.

### Naming Convention in Updater Function
It's common to name the updater function argument by the first letters of the corresponding state variable. Or, state name, or prevState.

## Updating objects in state 

State can hold any kind of JavaScript value, including objects. But you shouldn't change objects and arrays that you hold in the React state directly. Instead, when you want to update an object and array, you need to create a new one (or make a copy of an existing one), and then update the state to use that copy. Usually, you will use the `... spread` syntax to copy objects and arrays that you want to change.

If copying objects in code gets tedious, you can use a library like **immer** to reduce repetitive code: useImmer()

## Managing State

With React, you won't modify the UI from code directly. For example, you won't write commands like "disable the button", "enable the button", "show the success message", etc. Instead, you will describe the UI you want to see for the different visual states of your component ("initial state", "typing state", "success state"), and then trigger the state changes in response to user input. This is similar to how designers think about UI.

## Resetting State

React lets you override the default behavior, and force a component to reset its state by passing it a **different key**, like `<Chat key={email} />`. This tells React that if the recipient is different, it should be considered a different Chat component that needs to be **re-created from scratch** with the new data (and UI like inputs).

## Passing Data Deeply with Context

Context lets a parent component provide data to the **entire tree below it**.

### Step 1: Create the context

First, you need to create the context. You’ll need to export it from a file so that your components can use it:

```js
/* LevelContext.jsx */
import { createContext } from 'react';
export const LevelContext = createContext(1);
```

### Step 2: Use the context

Import the useContext Hook from React and your context:
```js
/* Heading.jsx */
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

const level = useContext(LevelContext);
```

### Step 3: Provide the context (using value prop)
```js
/* Section.jsx */
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext value={level}>
        {children}
      </LevelContext>
    </section>
  );
}
```

This tells React: "if any component inside this `<Section>` asks for LevelContext, give them this level." The component will use the value of the **nearest `<LevelContext>` in the UI tree** above it.

So:
- You pass a level prop to the `<Section>`.
- Section wraps its children into `<LevelContext value={level}>`.
- Heading asks the closest value of LevelContext above with useContext(LevelContext).

### Context Overriding (Similar to CSS)

In React, the only way to override some context coming from above is to wrap children into a context provider with a different value.

Different React contexts don’t override each other. Each context that you make with createContext() is completely **separate** from other ones, and ties together components using and providing that particular context. One component may use or provide many different contexts without a problem.

### Alternatives to Context

- Start by passing props
- Extract components and pass JSX as children to them
   - For example, maybe you pass data props like posts to visual components that don’t use them directly, like `<Layout posts={posts} />`. Instead, make Layout take children as a prop, and render `<Layout><Posts posts={posts} /></Layout>`.

### Use cases of Context
- Theming
- Current account (even with multiple account for single user)
- Routing
- Managing state: Context is not limited to static values. If you pass a different value on the next render, React will update all the components reading it below!