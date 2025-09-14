## Intro
```js
setTimeout(function cb() {
    console.lg("callback");
}, 5000);
```
- `setTimeout` calls WEB API and get access to the **Timer** feature of browser.
- Then, a callback `cb` will be **registered in WEB API environment**, starts 5000 timer.
- Now, we need `cb` inside the call stack (JS Engine) to be executed.
- GEC has been popped from call stack.

## Callback queue or Task queue
- After the timer ends, `cb` goes to the call stack through callback queue.

## Event Loop
- Event loop (ইভেন্ট লুপ) জাভাস্ক্রিপ্টের একটি সিক্রেট machenism যার মাধ্যমে জাভাস্ক্রিপ্ট single-threaded প্রোগ্রামিং ল্যাঙ্গুয়েজ হওয়া সত্ত্বেও বাহ্যিক ভাবে multi-threaded প্রোগ্রামিং ল্যাঙ্গুয়েজের মত কাজ করে।
- Moves stuffs from callback queue to call stack.
- Continuously check whether the call stack is empty, if empty put stuff from microTask/callback queue to call stack.
    - even no GEC, full empty
- Event Loop = "**traffic controller**" for JS execution.
- Ensures async tasks don’t block main code.
- Makes JS suitable for highly interactive apps & servers.

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
- **Higher priority** then callback queue.

## Starvation
- One function in microTask queue creating multiple others (recursively) tasks.
- Now, the function in callback queue aren't getting any chance to execute.
- Starvation = when some tasks never get CPU time because higher-priority tasks keep running forever.

#### blocking: while (true), starvation: inf promises

## Mutation Observer
- It’s a built-in **JavaScript API** that lets you watch for changes in the DOM (like when an element is added, removed, or modified).
- Whenever something changes, it notifies you.
- MutationObserver is efficient than `setInterval` → browser tells you only when something really changed.
```js
// Select the element you want to observe
const target = document.getElementById("myDiv");

// Create a new observer
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.log("Change detected:", mutation);
  });
});

// Tell it what to watch
observer.observe(target, {
  childList: true,   // watch for child add/remove
  attributes: true,  // watch for attribute changes
  subtree: true      // watch inside child elements too
});

// Example: Trigger a change
target.setAttribute("class", "new-class");
```