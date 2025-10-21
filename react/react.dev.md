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
**State**: In React, data that changes over time is called state.

**Event handlers**: Event handlers are your own functions that will be triggered in response to user interactions. Built-in components like `<button>` only support built-in browser events like onClick.

