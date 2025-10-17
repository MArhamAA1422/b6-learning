## Notes
- use custom hooks, use components for separate all things, use inline func for basic things
- single responsibility principle, component should be as small as possible
- writing reusable and modular code

## Common Design Patterns

#### Presentational (dumb)/ Container (smart)
Small components that only render UI and receive props (presentational). Larger components handle data fetching, state, and pass props down (container).

#### Compound Components
Instead of just having a bunch of separate components, you can **group them together in a parent component** to make things way more intuitive and user-friendly. Stuff like Accordions, Tabs, and Dropdowns can get pretty complicated in a web app.

#### Context/Provider Pattern
Used to avoid prop drilling.

#### Custom Hooks
Encapsulate stateful logic used by multiple components.

#### HOC
Functions that take a component and return a new component.

#### Render Props
A component takes a **function as a child or prop** and calls it with some data. `<Data>{data => <UI data={data} />}</Data>`

#### Controlled vs Uncontrolled Components
Inputs whose value is driven by state are controlled `value={state} + onChange`. If **refs** are used to read values on submit, they're uncontrolled.

#### Facade / Adapter-like wrappers around UI libraries
Small wrapper components that adapt an external library component to your app’s props or styling system (common in shadCN or AntD wrappers).

## shadCN ui/select
This file defines a custom, styled Select component system — built on top of **Radix UI** (a low-level, accessible headless component library).

Radix UI gives unstyled building blocks: `SelectPrimitive.Root`, shadCN adds other stuffs (such as styling).

This file uses a **Compound Component Pattern** combined with a **Wrapper** (Adapter / Facade) Pattern.

## Why DP in React
Some common challenges that a React developer faces are:
- Creating reusable components
- Uncontrolled and controlled components in form handling
- Reusing complex logic between multiple components

## 7 Best React Design Patterns That Every Developer Should Know (GFG)
### Layout Components Pattern
Layout components are those components that are responsible for arranging other components on a page. In this pattern, we split the layout and the child component, so that making changes in the layout component won’t affect the child.

### Conditional Rendering Pattern
Display different components based on different conditions.

### Higher Order Components (HOCs) Pattern
They help us reuse complex code logic across our application. We don’t need to create two separate components containing similar logic. For Example: `React.memo` (it only re-renders if the **props it receives** have changed)

### Provider Pattern
The provider pattern shares data globally across the application between various components. Context API

### Presentational and Container Components Pattern
Separate the application layer from the view layer.

### Render Props Pattern
A render prop is basically a **prop on a component whose value is a function that returns JSX**. Here, the component calls the render prop instead of rendering anything. Therefore, there’s no rendering logic being implemented.

```jsx
const Username = (renderProp) => renderProp.render();

function App() {
   return (
      <div>
         <Username render={() => <h1>Name</h1>} />
      </div>
   )
}
```

```jsx
/* fetch data (products) then show it */
<ProductFetcher render={(products) => <ProductGrid products={products} />} />
```

### Compound Pattern
A compound pattern can be referred to as **multiple components** that are combined together to serve a **common function**. Use wisely, not in all place.
```jsx
/* PostCard */
function PostCard({ children, post}: PostCardProps) {
   return (
      <PostCardContext.Provider value={{post}}>
         {children}
      </PostCardContext.Provider>
   );
}

PostCard.Title = function PostCardTitle() {
   const { post } = usePostCartContext();
   return <h1>{ post.title }</h1>
}
```

```jsx
/* App */
function App() {
   return (
      <PostCard>
         <PostCard.Title />
         <PostCard.Content />
      </PostCard>
   );
}
```

## Others
- Use `enabled` boolean in props, to check if some code need to run, otherwise return in first place
- For asynchronous code we can wrap the component with `Suspense`
- Make custom types using TS
- `const ProductDetails = React.lazy(() => import('./ProductDetails'))`, you can lazily load components when you need them, making your app faster and more efficient.
- Naming Conventions
   - For components, use **PascalCase** (like UserProfile.js)
   - For variables and functions, use **camelCase** (like getUserData())
   - And for constants, use **UPPERCASE_SNAKE_CASE** (like API_URL)
