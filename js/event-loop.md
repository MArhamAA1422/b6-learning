## Intro
```js
setTimeout(function cb() {
    console.lg("callback");
}, 5000);
```
- `setTimeout` calls WEB API and get access to the **Timer** feature of browser.
- Then, a callback `cb` will be registered in WEB API environment, starts 5000 timer.
- Now, we need `cb` inside the call stack (JS Engine) to be executed.
- GEC has been popped from call stack.

## Callback queue or Task queue
- After the timer ends, `cb` goes to the call stack through callback queue.

## Event Loop
- Moves stuffs from callback queue to call stack.
- Continuously check whether the call stack is empty, if empty put stuff from microTask/callback queue to call stack.
    - even no GEC, full empty

## Another example
- `addEventListener` with a button.
- WEB API > window > DOM API will handle.
- A callback will be registered. Even if the code execution are done the callback will be there (in a hope that someone clicks the button).
- When someone clicks the button in webpage the callback will be pushed into the callback queue. Then, event loop will send it to the call stack.

## MicroTask queue
- similar to callback queue
- faster ending functions will be stored here
- `fetch` callback (promise) will be there
- **All promise callbacks will be there.**
- **Mutation Observer** (From DOM) will be there.
- Higher priority then callback queue.