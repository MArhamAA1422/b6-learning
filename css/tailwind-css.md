## Intro
- Tailwind is a utility-first CSS framework.

- Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.

- It's fast, flexible, and reliable — with zero-runtime.

- `tailwind.config.js`

- Tailwind relies on CSS variables heavily internally, so if you can use Tailwind in your project, you can use native CSS variables.

- Not recommend using CSS modules and Tailwind together.

- Tailwind uses rem for the default breakpoints, so if you are adding additional breakpoints to the defaults, make sure you use rem as well.

- Follow official doc.


## colors

In Tailwind, colors are defined in shades from 50 (lightest) → 900 (darkest).

- `bg-red-100` = very light pinkish red

- `bg-red-500` = medium/standard red

- `bg-red-900` = very dark red

### 500 is like the "base shade" (most balanced)

## theme
- @theme is a CSS directive introduced in Tailwind CSS v4 (still in beta as of mid-2025).

- It lets us access Tailwind’s design tokens (colors, spacing, fonts, etc.) directly inside CSS.

- @theme = way to pull values from Tailwind’s theme into your own CSS.

- **As a function**

```css
.my-box {
  padding: @theme(spacing.4);   /* same as p-4 */
  background: @theme(colors.blue.500); /* same as bg-blue-500 */
  border-radius: @theme(borderRadius.lg); /* same as rounded-lg */
}
```

- **As a block**

- `@theme { --my-token: value; }`

```css
/* custom color token */
<style type="text/tailwindcss">
    @theme {
        --color-any: white;
    }
</style>
```

```html
<div class="bg-[--color-any] text-white p-4 rounded-lg">
  Test Clifford
</div>
<div class="bg-any text-white p-4 rounded-lg">
  Test Clifford
</div>
```

## Compatibility
```cssax-[600px
@import "tailwindcss";
@import "./typography.css";
```

- `typography.css`
```css
.typography {
  font-size: var(--text-base);
  color: var(--color-gary-700);
}
```

## Responsive Design
```html
<!-- Width of 16 by default, 32 on medium screens, and 48 on large screens -->
<img class="w-16 md:w-32 lg:w-48" src="..." />
```

- Use the `@container` class to mark an element as a container, then use variants like `@sm` and `@md` to style child elements based on the size of the container:

```HTML
<div class="@container">
  <div class="flex flex-col @md:flex-row">
    <!-- ... -->
  </div>
</div>
```

- Just like breakpoint variants, container queries are mobile-first in Tailwind CSS and apply at the target container size and up.

Breakpoint | Prefix	Minimum width	| CSS
| - | - | - |
sm	| 40rem (640px)	 | @media (width >= 40rem) { ... }
md	| 48rem (768px)	 | @media (width >= 48rem) { ... }
lg	| 64rem (1024px) | @media (width >= 64rem) { ... }
xl	| 80rem (1280px) | @media (width >= 80rem) { ... }
2xl	| 96rem (1536px) | @media (width >= 96rem) { ... }

- `@container`
```html
<!-- Use the @container class to mark an element as a container, then use variants like @sm and @md to style child elements based on the size of the container: -->

<div class="@container">
  <div class="flex flex-col @md:flex-row">
    <!-- ... -->
  </div>
</div>
```

- By default, Tailwind includes container sizes ranging from 16rem (256px) to 80rem (1280px). (1rem = 16px)

## Others
- `@theme` → define or read design tokens (colors, spacing, etc.).

- `@variant` → create custom variants (like hover:, dark:, or your own).

- `@source` → tell Tailwind where to look for class names in your project.

```html
<!-- arbitrary value -->
<div class="max-[10px]"></div>
```

## Flexbox
### flex-basis
- Utilities for controlling the initial size of flex items.

- `class="basis-<num>" = flex-basis: calc(var(--spacing)*<num>)`

### flex-direction
- `flex-row`

### flex-wrap
- `flex-nowrap`

### flex
- Utilities for controlling how flex items both grow and shrink
`flex-<num>`
- `flex-1` to allow a flex item to grow and shrink as needed, ignoring its initial size.

```html
<!-- custom -->
<div class="flex-(--my-flex) ...">
  <!-- ... -->
</div>
```

### flex-grow, flex-shrink
- `class="grow"`
- Use `grow-0` to prevent a flex item from growing.

### order
- Utilities for controlling the order of flex and grid items.

- `order-2`, `order-first`, negative: `-order-1`

### grid-template-columns
- `grid-cols-<number>` = `grid-template-columns: repeat(<number>, minmax(0, 1fr));`

- `grid-cols-none` = `grid-template-columns: none;`

- `class="grid grid-cols-4 gap-4"`

### place-content
- Utilities for controlling how content is justified and aligned at the same time.

- `place-content-center` = `place-content: center;`