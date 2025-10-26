## TanStack Query
- React Query (officially @tanstack/react-query) is a **data-fetching and caching library** for React applications.
- Primarily known as react query. Manages fetching, validation, caching.
- Powerful asynchronous state management, server-state utilities and data fetching.

```js
const {
   status,
   error,
   data: posts,
} = useQuery({
   queryKey: ["posts"],
   queryFn: getPosts,
})
```

## Features
- Fetching data
- **Caching responses**
- Background updates
- Refetching on window focus
- Pagination, infinite scroll
- **Mutation** (POST/PUT/DELETE)
- Offline support

## Two Key Concepts
- Query → for fetching and caching data (useQuery)
- Mutation → for sending data to the server (useMutation)