## defer

The defer attribute tells the browser not to wait for the script. Instead, the browser will continue to process the HTML, build DOM. The script loads “in the background”, and then runs when the DOM is fully built.

```js
<p>...content before script...</p>
<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
<!-- visible immediately -->
<p>...content after script...</p>
```

## async

The async attribute is somewhat like defer. It also makes the script non-blocking. But it has important differences in the behavior. In other words, async scripts load in the background and run when ready. The DOM and other scripts don’t wait for them, and they don’t wait for anything.

- Like `defer` the `async` attribute is only for external scripts
- Just like defer, the async attribute is ignored if the `<script>` tag has no `src`.

## Dynamic scripts

There’s one more important way of adding a script to the page. We can create a script and append it to the document dynamically using JavaScript:

```js
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script); // (*)
```
The script starts loading as soon as it’s appended to the document (*). Dynamic scripts behave as `“async”` by default.

That is:
- They don’t wait for anything, nothing waits for them.
- The script that loads first – runs first (“load-first” order).

This can be changed if we explicitly set `script.async=false`. Then scripts will be executed in the document order, just like defer.