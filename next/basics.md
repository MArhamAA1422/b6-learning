## Shorthand

- SSR: server side rendering
- SSG: static site generation
- PPR: partial pre rendering

## Key Points

- **serverless architecture**
- `layout.tsx` is the entry point. Code in it will be applied to all other files.
- `“use client”` for client (browser) side interactivity
- export default Comp for React Component identity
- `error.ts` should have “use client”
- `loader.ts` 
- useEffect in “use client”
- “use cache”
- Build Adapters API  // next 16+ feature
- metadata  // SEO

### Server type codes (routes, middlewares, listening, API creating)

- `app/api/route.ts`, any name is also allowed instead of “api”
- only requires `route.ts` 

## Caching

#### Browser Cache
saves static files locally
#### Server Cache
stores pre-rendered pages and API responses
#### Data Cache
Remembers fetched data to avoid repeat requests

`cacheLife` => when to clear
`cacheTag` => what to clear