## Intro
- react <=> redux
- state management
- Separate Store (for state, kinda DB)
   - Component can "subscribed to" that store and will be notified if state gets changed

## What is Redux
Redux is a flexible **state container** for JS apps that manages our application state **separately**

## How Redux Store works
- Button clicked: **action**, Event: **dispatch**, Resolve/Response: **reducer()**
```js
reducer( state, action ) {
   return newState;  // not updated state, immutable action
}
```