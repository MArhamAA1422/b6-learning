## TanStack Query
- React Query (officially @tanstack/react-query) is a **data-fetching and caching library** for React applications.
- Primarily known as react query. Manages fetching, validation, caching.
- Powerful asynchronous state management, server-state utilities and data fetching.

### React Query = best for REST/any API + cache handling.

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

## QueryClient

This sets up a global cache layer for all API data.

```js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'

const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
```

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

- queryKey: unique key for caching (['users'])
- queryFn: async function that returns data

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
      queryClient.invalidateQueries(['users']); // Refetch user list
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
Use it when:
- You frequently fetch data from a server.
- You want caching, pagination, or background updates.
- You want to avoid Redux boilerplate for server state.
- You build apps that need reactive UI + async data.

Avoid it when: All your data is local-only (e.g., small to-do list without server).