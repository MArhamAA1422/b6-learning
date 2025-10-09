## Intro
- Syntactically Awesome Style Sheets
- Programming language flavor in CSS
   - variables
   - functions
   - module
   - inheritance
- SAAS is a CSS pre-processor, **compiled into CSS**
- `.sass`: indented like python, `.scss`: like normal CSS

## Variables
- `$varName: value;`
```css
$myFont: Helvetica, sans-serif;
body {
   font-family: $myFont;
}
```

## Nesting (most powerful in SASS)
```css
nav ul {
   margin: 0;
}
nav li {
   display: block;
}

/* in SASS */
nav {
   ul {
      margin: 0;
   }
   li {
      display: block;
   }
}
```

```css
a:link {
   color: red;
}
a:visited {
   color: green;
}

/* in SASS */
a {
   &:link {
      color: red;
   }
   &:visited {
      color: green;
   }
}
```

## Nested Properties
- font-family, font-size, common is font
```css
body {
   font: {
      family: sans-serif;
      size: 18px;
   }
   text: {
      align: center;
      transform: lowercase;
   }
}
```

## Import
`@import "variables";` `variables.scss`

## Partials
- By default, Sass transpiles all the .scss files directly.
- SASS will not transpile filename that starts with **an underscore**.

## Mixin
- Directive lets you create CSS code that is to be reused throughout the website.
```css
@mixin name {
   property: value;
   property: value;
}
```
```css
@mixin imp-text {
   color: red;
   font-size: 25px;
}

.danger {
   @include imp-text;
   background-color: green;
}
```

- Passing variables to a mixin
```css
@mixin bordered($color, $width) {
   border: $width solid $color;
}

.myNotes {
   @include bordered(red, 2px);  // call mixin
}
```

- Using mixin for vendor prefixes
```css
@mixin transform($property) {
   -webkit-transform: $property;
}

.mybox {
   @include transform(rotate(20deg));
}
```

- If-Else
```css
@mixin theme-switcher($theme) {
   @if $theme == "light" {
      background-color: red;
   } @else {
      background-color: green;
   }
}
```

- Loop, Interpolation
```css
$sizes: 32px, 48px, 72px;

@each $size in $sizes {
   .icon-#{$size} {
      font-size: $size;
   }
}
```

#### a-b == a_b in naming