## Intro
- Tailwind is a utility-first CSS framework.

- Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.

- It's fast, flexible, and reliable — with zero-runtime.

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
@theme {
  --color-clifford: #da373d;
}
```

```html
<div class="bg-[--color-clifford] text-white p-4 rounded-lg">
  Test Clifford
</div>
```