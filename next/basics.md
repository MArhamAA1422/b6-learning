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
- server first framework unlike TANSTACK START (which is client first)
- utilizes RSC

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

## Next.js has two different routers

- App Router: The newer router that supports new React features like Server Components.
- Pages Router: The original router, still supported and being improved.

## Project Structure

- Add page to expose a route, layout for shared UI such as header, nav, or footer. loading for skeletons, error for error boundaries, and route for APIs

#### Interesting routing stuffs

- [ ]
- ( )
- _
- Colocation (page.js)

> LWS

## CSR

For client request server responses with html, css, js. html+css => blank page, waiting for js load. Like Movie download. Full load then can be watched. It increases **TTI** (time to interactive).

## SSR

Server simulates a browser inside and sends ready html, css. Good for SEO. It's a trick. Only the first page. As SPA (single page application), from 2nd page in browser again CSR. Like streaming.