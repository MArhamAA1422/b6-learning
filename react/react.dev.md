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