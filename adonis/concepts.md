## Query Builder

A query builder is a programmatic way to build SQL queries. This does NOT run SQL yet.

```js
// LUCID
User.query().where('id', 1)
```

- `.where()` → adds condition to query state
- `.preload()` → registers relations to load
- `.first()` → executes everything

## DB Hit
DB hit happens only at a terminal method. For example: `.first(), .update(), .delete(), .fetch(), .exec()`

## Lazy Loading

Relations loaded later, separate query. Can cause N+1 problem.

## Eager Loading

Relations loaded in advance. `const user = await User.query().preload('posts').where('id', 1).first()`

## JOIN vs Preload

#### One-line mental model

- JOIN → “Bring everything into one big table”
- PRELOAD → “Load parents first, then attach children”

### Key points

- Query Count
   - JOIN → usually 1 SQL query
   - PRELOAD → multiple SQL queries (1 per relation)

- Data Shape
   - JOIN: Produces flattened rows, Same parent row repeated for each related row
   - PRELOAD: Produces nested objects, One parent → array/object of relations

- Row Explosion Risk
   - JOIN: High risk, (notes × tags × comments)
   - PRELOAD: No row explosion

- Performance Tradeoff
   - JOIN: Faster for small, shallow relations, Slower when relations multiply
   - PRELOAD: Slightly more queries, More stable and predictable performance

- Pagination Safety
   - JOIN: Can break pagination
(duplicate parent rows)
   - PRELOAD: Pagination-safe

- ORM Behavior
   - JOIN: You must manually control, ORM maps flat rows → objects
   - PRELOAD: ORM handles batching + mapping, Avoids N+1 automatically

- Filtering Capability
   - JOIN: Can filter across tables easily
   - PRELOAD: Cannot affect parent rows directly (except via whereHas)

### Use JOIN when

- You need **filtering/sorting** across relations
- Relations are small (1–1, 1–few)
- You care about single-query speed

### Use PRELOAD when

- You need nested data in **API response**
- Relations can grow large
- You want **safe pagination**
- You want predictable queries