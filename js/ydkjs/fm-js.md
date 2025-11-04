## Info
- What are the two core features of JavaScript mentioned: Going through code line by line (**thread of execution**), 2. Storing data and functions in computer memory
- What is an execution context in JavaScript: **A mini program or environment** created to run a function's code, consisting of a thread of execution and a local memory space
- What are the three core components of JavaScript's execution model: (1) Memory (to store data), (2) Functionality storage (to store code that can be triggered), and (3) Thread of execution (to go through code line by line, storing data and running stored functionality).
- What are two risky traps engineers often fall into when problem-solving: The researcher (spending too much time reading about a topic without writing code) and the Stack Overflow (copying code snippets without understanding them)

## Promise
- Used for cases where single req/res is involved
- Not ideal for multiple event/hit, like websocket (you can receive multiple messages from the server)
- `Promise.finally( () => {} )` must run in any situation, `try-catch-finally` in async-await
- `Promise.then( () => {} )` to fullfil

### Promise Constructor
- new Promise()
- **receives an executor** (function with two params)
- reject should return an error: `reject(new Error("Error"))`

### Promise Creation
- new Promise()
- Promise.resolve(ANY_JS_VALUE), Promise.reject()
- async function test() { return "promise"; }  // always returns a promise, here, `Promise<String>`

```js
async function PromiseTest() {
   if (SOMETHING) {
      return "Done";  // resolve
   } else {
      throw new Error("Error");  // reject
   }
}
```

### Error catching in promise
- Promise.catch( () => {} )
- try-catch in async-await

### await usage
- inside a async function
- on ES module (top level await)
- in browser console debugger

### Promise API
- Promise.all([])  // run promises in parallel, one fails all fail
- Promise.any([])  // first resolve
- Promise.race([])  // first response (resolve of reject)
- Promise.allSettled([])  // diagnosis