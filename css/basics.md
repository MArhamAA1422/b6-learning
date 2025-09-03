## flexbox wrapping
- `nowrap, wrap, wrap-reverse`
- The `flex-flow` property is a shorthand property for setting both the `flex-direction` and `flex-wrap` properties.
```css
flex-flow: row wrap;
```

## flexbox justify-content
- The `justify-content` property is used to align the flex items when they do not use all available space on the main-axis (horizontally).

## flexbox align-items
- The `align-items` property is used to align the flex items when they do not use all available space on the cross-axis (vertically).

## flexbox flex
- The `flex` property is a shorthand property for the `flex-grow, flex-shrink`, and `flex-basis `properties.
```css
/* not growable, not shrinkable, initial length of 200px*/
flex: 0 0 200px;
```

## flexbox responsive
```css
/* Responsive layout - makes a one column layout instead of a two-column layout */
@media (max-width: 800px) {
  .flex-container {
    flex-direction: column;
  }
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
- Specificity – more specific selectors override less specific ones.

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
- Remove it entirely: use `display: none` or `visibility: hidden`