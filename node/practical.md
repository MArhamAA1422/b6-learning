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