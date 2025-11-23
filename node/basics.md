## Intro
- In 2009, *Ryan Dahl* introduced Node.exe (similar to Chrome) with v8 inside
   - In node, we don't have document/window object, instead we have: `fs, http`
   - node = v8 + some additional modules that are missing in browser
- Node is not a programming language or framework either, it's a **runtime environment** for executing JS code.
- NodeJS engine: call stack, Node APIs, event loop, callback queue
- JS doesn't have the power to access stuffs like Networking or other, but Node has (using C/C++ internally, aka **`libuv`**), Node has **Node API**
- Library like **Express** makes it easier to works with response writing (as a stream) with JSON

## Behind the scene (mental model)

- Regarding http and libuv, client to server
- libuv interacts with NIC of the computer

![node-mental-model](node-mental-model.png)

## How Node.js works
- highly-scalable, data-intensive and real-time apps, node is ideal for I/O-intensive apps
- **non-blocking asynchronous** nature
- Don't use Node for CPU-intensive apps, for example: video encoding, img manipulation service

## Modules
- Every node application has at least one module or file called `main`
- node has `module` object and it's not a part of `global` object

### Module Wrapper Function
- Node wraps each file/module in a wrapper function at runtime
```js
(function (exports, require, module, __filename, __dirname) {
   ///
})()
```

## Builtin-Modules in Node.js
### Path Module
```js
var pathObj = path.parse(__filename);
```

### OS Module
- `os.totalmem()`
- `os.freemem()`

### Events
- Event = A signal that something has happened
- Event is one of the core parts of Node

#### EventEmitter (class)

**Bunch of node core functionalities are based/built on EventEmitter**

```js
const EventEmitter = require('events');  // Here all uppercase starting means it's a convention that it represents a class

emitter = new EventEmitter();

// Register a listener
emitter.on('messageLogged', function() {
   console.log('Listener called');
});

// Raise an event
emitter.emit('messageLogged');
```

#### Event Arguments
```js
emitter.on('messageLogged', (arg) => {
   console.log('Listener called', arg);
});

emitter.emit('messageLogged', { id: 1, url: 'http://' });
```

### HTTP

Networking stuffs.

```js
const http = require('http');

const server = http.createServer();  // it's an EventEmitter!

server.on('connection', (socket) {
   console.log('New connection...');
});

server.listen(3000);

console.log('Listening on port 3000...');
```

Actually, we should write the above like this:

```js
const server = http.createServer((req, res) => {
   if (req.url === '/') {
      res.write('Hello World');
      res.end();
   }

   if (req.url === '/api/courses') {
      res.write(JSON.stringify([1, 2, 3]));
      res.end();
   }
});

server.listen(3000);
```

In real application we don't write those using http, callback (req, res). Because it becomes complex when we add more routes. Instead we can use frameworks like **Express**.
