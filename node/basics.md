## Intro
- In 2009, *Ryan Dahl* introduced Node.exe (similar to Chrome) with v8 inside
   - In node, we don't have document/window object, instead we have: `fs, http`
   - node = v8 + some additional modules that are missing in browser
   - or, **`node = v8 + c++`**
      - JS can talk to native machine because of c++
      - we can create webservers in JS
- Node is not a programming language or framework either, it's a **runtime environment** for executing JS code.
- NodeJS engine: call stack, Node APIs, event loop, callback queue
- JS doesn't have the power to access stuffs like Networking or other, but Node has (using C/C++ internally, aka **`libuv`**), Node has **Node API**
- Library like **Express** makes it easier to works with response writing (as a stream) with JSON
- For API server we can use Node for backend
- highly-scalable, data-intensive and real-time apps, node is ideal for I/O-intensive apps
- **non-blocking asynchronous** nature
- Don't use Node for CPU-intensive apps, for example: video encoding, img manipulation service

## Node JS Internal Working
- node = v8 + libuv
- v8 = c++ + js
- **libuv implements Event Loop, Thread Pool**

### node index.js
- First creation: **node process**
- Then, **Main Thread** inside the process
   - inside main thread: **`init project, top level code, require module, event callbacks register`**
   - inside main thread: start event loop
- Parallelly, **Thread Pool** inside the process, contains multiple thread, does CPU intensive tasks (for example: FS, crypto, compression)
   - any cpu/blocking task goes to Thread Pool
   - normally, there are 4 threads, we can change using: `process.env.UV_THREADPOOL_SIZE = 10`
   - event loop can offload CPU intensive tasks to thread pool
#### Event Loop's job (one by one check serially)
- expired timer callbacks
- IO polling - FS, output/result of file IO task
- setImmediate callbacks
- close callbacks
- continue if pending task

##### Promise
- Event loop checks in every transition(say, IO polling to setImmediate callbacks) is there any promise to resolve

#### Exception

setTimeout callback and setImmediate callback may give confusing output and it is non-deterministic, it depends on CPU performance mainly.

## Behind the scene (mental model)

- Regarding http and libuv, client to server
- libuv interacts with NIC of the computer

![node-mental-model](node-mental-model.png)

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

## JS Module System

- Files ending with `.mjs` are always treated as ES Modules (ESM) by Node.js.
- `.js` files can be either CJS or ESM, depending on the project setting.

### CommonJS (CJS)
- Used by default in Node.js before ES modules.
- Synchronous, file-based module system.
- `module.exports`, `require()`

#### Characteristics

- Synchronous loading (**good for backend, bad for browser**)
- **Loaded at runtime**
- Default in Node.js files ending with .cjs or without `"type": "module"` in package.json

#### Where used

- Almost all Node.js libraries before 2020
- Express, lodash, old versions of React scripts, etc.

### ES Modules (ESM)
- Modern JavaScript module system (ECMAScript 2015).
- Native in browsers & now in Node.js.
- `export`, `import`

#### Characteristics

- **Asynchronous loading**
- Static structure → better tree-shaking & optimization
- Mandatory file extensions in Node.js (.js, .mjs)
- Enabled when:
   - filename is .mjs
   - OR `"type": "module"` in package.json

#### Where used

- Modern browser apps
- Node.js 14+ with `"type": "module"`

### UMD (Universal Module Definition)

- A module format that works everywhere: Node.js, AMD, browser globals.
- Used for older libraries published on CDN or npm.
- If you publish a library for all environments (or even better, publish dual: ESM + CJS)

#### Where used

- jQuery, Moment.js (old versions)
- Libraries intended to work both in **Node + browser**.

### Node.js Module Resolution Rules
If using CommonJS:

`require('./file')` → resolves to:
   - file.js
   - file.json
   - file.node (native addon)
   - index.js inside folder

If using ESM:
- import "./file" needs extension
- **file.js must be written explicitly**
- No auto-extension guessing

## Versioning

a.b.c; Three parts:
- third (c) part / latest part: **minor** fixes (optional)
- second (b) part / latest running: **recommended** bug fix (security fix)
- first (a) part  / **major** lease: breaking updates

^ = install all Recommended and Minor fixes automatically

~ = install all Minor fixes only

#### Others
- we can provide range in versions
- we can use comparison operators
- we can use direct link
- we can use or (||) operator...

## Sever Side Rendering (SSR)

Server renders all and sends the ready stuffs to show in client side. Faster than CSR.

## Client Side Rendering (CSR)

Server sends only XML/JSON and client renders them.

## REST API vs RESTful API

A REST API is an API that follows some principles of REST, whereas a RESTful API must follow all REST rules, **including statelessness**, the proper use of HTTP methods and resource-based URLs. In short, every RESTful API is a REST API, but not every REST API is RESTful

#### REST API

- server client architecture
- always respect all http methods

## Express Middleware (kinda plugin)

```js
// express middleware example for POST request
app.use(express.urlencoded({ extended: false }));
```

Between client and server/(app.get function) there is a stuff called middleware. It takes req and can forward it or if find something wrong reverse back that req to client.

There can be multiple middlewares. Middleware functions can perform the following tasks:
- execute any code
- make changes to req and res objects
- end the request-response cycle
- call the next middleware function in the stack

Express uses `app.use` to define middleware normally

```js
app.use((req, res, next) => {
   console.log("hello from middleware");
   return res.json({ msg: "hello from middleware" });

   next();  // goes to next middleware
});
```