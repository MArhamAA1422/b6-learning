## Configuration

`npm init`
- inside `package.json` we can create something like:
```js
"scripts": {
   "start": "node main.js"
}
```
- then, `npm start`

## File Handling

```js
fs.writeFileSync("./test.txt", "Hello World");
const result = fs.readFileSync("./contacts.txt", "utf-8");
```

Async:

```js
fs.writeFile("./test.txt", "Hello World Async", (err) => {});
fs.readFile("./contacts.txt", "utf-8", (err, result) => {
   if (err) {}
   else {  // result }
});
```

#### File Handling without Overwriting

```js
fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
```

Usage: creating log (say, user) file

#### Others
- copy: `fs.cpSync("./test.txt", "./copy.txt");`
- delete: `fs.unlinkSync("./copy.txt");`
- info: `fs.statSync("./test.txt");`
- new dir creation: `fs.mkdirSync("my-docs");`

## HTTP Server
```js
const http = require('http');

const myServer = http.createServer((req, res) => {
   console.log('New req res');
   res.end('Hello From Server');
});

myServer.listen(8000, () => console.log('server started'));
```

## Express

Express provide `myHandler` in `http.createServer(myHandler)`

```js
const app = express();  // app => handler function

app.get('/', (req, res) => {
   return res.send("hello from home page");
});

// const server = http.createServer(app);

// in express
app.listen(8000, () => console.log("server started"));
```

### Benefits
- builtin stuffs like url module, http module
- in place HTTP method callbacks
- routing is easy, code is modulated

## API Route Convention

- /users => send html, html document render
- /api/users => send raw json

### Dynamic Path Parameters

GET /api/users/:id

## Same Route (shortcut)

```js
app.route('/api/users/:id')
.get((req, res) => {})
.post((req, res) => {});
```