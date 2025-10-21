## flexbox wrapping
- `nowrap, wrap, wrap-reverse`
- The `flex-flow` property is a shorthand property for setting both the `flex-direction` and `flex-wrap` properties.
```css
flex-flow: row wrap;
```

## flexbox justify-content
- The `justify-content` property is used to align the flex items when they do not use all available space on the main-axis (horizontally).
- Depends on flex-direction

## flexbox align-items
- The `align-items` property is used to align the flex items when they do not use all available space on the cross-axis (vertically).
- Depends on flex-direction

## flexbox flex
- The `flex` property is a shorthand property for the `flex-grow, flex-shrink`, and `flex-basis `properties.
```css
/* not growable, not shrinkable, initial length of 200px*/
flex: 0 0 200px;
```

## flex: 1
- `flex-grow:  1`
- `flex-shrink: 1`
- `flex-basis: 0`, default is `auto`
- also, we can write: `flex-basis: 100%` same as `flex: 1`

## flexbox responsive
```css
/* Responsive layout - makes a one column layout instead of a two-column layout */
@media (max-width: 800px) {
  .flex-container {
    flex-direction: column;
  }
}
```

## Overwrite parent
```css
.card:nth-child(2) {
  align-self: flex-start;
}
```

## Inheritance
- Inherited by default: `color, font-family, font-size, line-height`

- Not inherited by default: `margin, padding, border, background`

- Example
```html
<div style="color: blue;">
  <p>This text will be blue</p>
  <span>This span is also blue</span>
</div>
```

- Forcing inheritance
```css
p {
  border: inherit; /* p will inherit border from its parent */
}
```

## Cascade
- Cascade decides which CSS rule applies when multiple rules target the same element.

### Factors that determine priority

- importance
```css
p {
  color: red !important; /* overrides everything */
}
```
- **Specificity** – more specific selectors override less specific ones.

`Inline style > ID selector > Class/attribute/pseudo-class > Element`

```css
#myid { color: red; } /* wins over */
.myclass { color: blue; }
p { color: green; }
```

- Source order – last rule in CSS wins if specificity is same.
```css
p { color: red; }
p { color: blue; } /* this one applies */
```

- Hierarchy
- !important + inline
```html
<p style="color: red !important;">text</p>
```

- !important in CSS file (applies depending on specificity order).

- Inline styles (without !important).

- ID selectors (#id).

- Classes, attributes, pseudo-classes (.class, :hover, [attr]).

- Elements & pseudo-elements (p, h1, ::before).

- Universal selector * and inherited values (weakest).

### Best practice
- Avoid `!important` unless really needed.
- Structure your CSS with classes and IDs carefully to avoid conflicts.

## Transform
- lets us change the **shape, size**, and **position** of an element without affecting the normal flow of the page.
- It’s also GPU-accelerated, so it’s very smooth for animations.

### Translate (move)
```css
.box {
  transform: translateX(50px);   /* move right 50px */
  transform: translate(50px, 20px); /* move right 50px & down 20px */
}
```

### Rotate
```css
.box {
  transform: rotate(45deg); /* rotate 45 degrees */
}
```

### Scale (resize)
```css
.box {
  transform: scale(1.5); /* increase size by 1.5x */
}
```

### Skew (tilt)
```css
.box {
  transform: skewX(20deg); /* tilt horizontally */
}
```

### Combine multiple transforms
```css
.box {
  transform: translateX(50px) rotate(30deg) scale(1.2);
}
```

## opacity
- Controls transparency of an element.

- Ranges from 0 (fully invisible) to 1 (fully visible).

```css
.box {
  opacity: 1;   /* fully visible */
}
.box-half {
  opacity: 0.5; /* semi-transparent */
}
.box-hidden {
  opacity: 0;   /* invisible, but still takes space */
}
```

### Note
- opacity: 0 still keeps the element in the layout (it’s just invisible).
- Remove it entirely: use `display: none` or `visibility: hidden` or JS removeChild

## px vs rem
- **px** (pixels) → absolute unit.
  - Example: 16px always means exactly 16 pixels.
  - Doesn’t change based on user settings.

- **rem** (root em) → relative unit.

  - 1rem = font size of the root element (`<html>`), normally `16px`.

- By default (user can change this though), most browsers set `<html>` `font-size = 16px`, so:

##### 1rem = 16px

## Difference from em
- em is relative to the **parent element's** font size.
  - name came from the letter M in traditional typography
- rem is relative to the root (html) font size, so **it’s more consistent**.

## Container query
- Container queries are a modern CSS feature that let you style something based on the **size of a parent elemen**t instead of the size of the entire viewport.
- `@container`, similar to `@media`

## Position
- static (default)
- relative (in normal flow)
  - left, right, top, right movement possible
- absolute (not in normal flow)
  - normally under `relative` parent, works under `fixed`, `absolute` as well
  - If no ancestor is positioned, it’s relative to `<html>` (the page itself).
- fixed
  - navbar, sidebar
- sticky
  - A mix of relative + fixed.
  - Acts like relative until you scroll past a threshold (like top: 0), then it sticks like fixed
  - sticky headers
- inherit, initial, unset
  - unset → behaves like inherit if parent has a value, else initial.

#### absolute
- kinda like the element has gone
- doesn't affect other elements in page