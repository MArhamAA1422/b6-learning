## Notes
- use custom hooks, use components for separate all things, use inline func for basic things
- single responsibility principle, component should be as small as possible

## Common Design Pattern

#### Presentational (dumb)/ Container (smart)
Small components that only render UI and receive props (presentational). Larger components handle data fetching, state, and pass props down (container).

#### Compound Components

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