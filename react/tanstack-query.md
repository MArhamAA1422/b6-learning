## TanStack Query
- React Query (officially @tanstack/react-query) is a **data-fetching and caching library** for React applications.
- Primarily known as react query. Manages fetching, validation, caching.
- Powerful asynchronous state management, server-state utilities and data fetching.
- Managing server side state

### React Query Advantages

- best for REST/any API + cache handling.
- data fetching made easy
- built-in loading, error states
- Pagination, infinite scroll

## Features

- Fetching data
- Caching responses
- Background refetching/updates
- Refetching on window focus
- **Mutation** (POST/PUT/DELETE)
- Offline support
- Calls the API always (by default), but shows cached (default 5 min `gcTime`) stuffs + any updates
- With the help of `staleTime` we can stop calling API frequently
- Pooling technique (fetch data every x time)

#### gcTime

Stays in cache before garbage collected. Default = 5min

#### staleTime

A configuration option that determines how long fetched data is **considered fresh** before it needs to be refetched. No API call in the mean time. Default = 0 (immediate stale)

## Two Key Concepts

- **Query** → for fetching and caching data (`useQuery`)
- **Mutation** → for sending data to the server (`useMutation`)

## QueryClient

This sets up a global cache layer for all API data.

## Fetching data

```js
import { useQuery } from '@tanstack/react-query'

function Users() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json())
  });

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <ul>
      {data.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}
```

- queryKey: unique key for caching (`['users']`), like `useState`
- queryFn: async function that returns data, like `useEffect`

#### React Query will

- Cache this data
- Refetch automatically when needed
- Keep UI in sync with server

## Sending data

```js
import { useMutation, useQueryClient } from '@tanstack/react-query'

function AddUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) => fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);  // Refetch user list
      queryClient.setQueryData(['users'], (currElem) => {  // setting/updating local query data
         return currElem.filter(() => {})
      });
    }
  });

  return (
    <button onClick={() => mutation.mutate({ name: 'ezyapp' })}>
      Add User
    </button>
  )
}
```

## Advanced Features

- Dependent Queries: Fetch data only after another query succeeds.
- Prefetching: Preload data before navigation.
- Infinite Queries: Handle infinite scroll or pagination easily.
- Query Invalidation: Manually refetch specific data.

## When to Use React Query

- You frequently fetch data from a server.
- You want caching, pagination, or background updates.
- You want to avoid Redux boilerplate for server state.
- You build apps that need reactive UI + async data.

#### Avoid it when

All your data is local-only (e.g., small to-do list without server).