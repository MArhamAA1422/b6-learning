## input
- radio

```html
<input type="radio" id="option-1" name="options" value="option-1">
<label for="option-1">option-1</label>
```
- `id` should match with `for`
- `name` is important for switch between multiple radio options check
    - `name` is equal for all `radio` options

- color selection
```html
<input type="color" id="favcolor" name="favcolor">
```

- file selection: browse
```html
<input type="file" id="myfile" name="myfile">
```

- data to server (not visible)
```html
<input type="hidden" id="custId" name="custId" value="3487">
```

- number quantity selection
```html
<input type="number" id="quantity" name="quantity" min="0" max="100" step="10" value="30">
```

- range (slider)
```html
  <label for="vol">Volume (between 0 and 50):</label>
  <input type="range" id="vol" name="vol" min="0" max="50">
```

