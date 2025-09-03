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