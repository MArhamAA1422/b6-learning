## Debouncing and Throttling
This concept is super important in React, especially for optimizing performance in **input-heavy or event-heavy components** (like search boxes or scroll handlers).

### Debouncing
- "Wait until the user stops typing"
- Debouncing ensures that a function is executed only after a certain period of inactivity.
- When typing in a search box, you don’t want to make an API call on every keystroke. Instead, wait until the user stops typing for, say, 500 ms, then trigger the search.

### Throttling
- "Allow function to run every X ms"
- Throttling ensures a function is executed at most once every specified time interval (e.g., once every 300 ms), no matter how many times the event fires.
- Handling scroll, resize, or mousemove events — which can fire dozens of times per second — without slowing the app.

Throttling ensures that a function is called **at most once during a specified time interval**, no matter how many times the event is triggered. Unlike debouncing, which waits until the action stops, throttling ensures that the function is executed at regular intervals while the action is still happening.

While it’s useful to write your own debounce and throttle functions, you can also use the popular utility library `lodash`, which provides built-in implementations.

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

React does not batch across multiple intentional events like clicks—each click is handled separately. Rest assured that React only does batching when it’s generally safe to do. This ensures that, for example, if the first button click disables a form, the second click would not submit it again.

- An updater function (e.g. n => n + 1) gets added to the queue.
- Any other value (e.g. number 5) adds “replace with 5” to the queue, ignoring what’s already queued.

In Strict Mode, React will run each updater function twice (but discard the second result) to help you find mistakes.

### Naming Convention in Updater Function
It’s common to name the updater function argument by the first letters of the corresponding state variable. Or, state name, or prevState.

## Updating objects in state 

State can hold any kind of JavaScript value, including objects. But you shouldn’t change objects and arrays that you hold in the React state directly. Instead, when you want to update an object and array, you need to create a new one (or make a copy of an existing one), and then update the state to use that copy. Usually, you will use the `... spread` syntax to copy objects and arrays that you want to change.

If copying objects in code gets tedious, you can use a library like **immer** to reduce repetitive code: useImmer()

