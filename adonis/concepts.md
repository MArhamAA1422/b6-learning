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