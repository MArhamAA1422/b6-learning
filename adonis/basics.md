## Commands

- `npm init adonisjs@latest project_name`
- `node ace server --hmr`
- `node ace migration:run`
- `node ace make:controller controller_name -s` // s for singular form in file name not plural
- `node ace make:service service_name`
- `node ace make:validator validator_name`
- `node ace make:model model_name -m` // -m for migration file creation
- `node ace configure @adonisjs/redis`
- `node ace configure @adonisjs/lucid`
- `node ace repl`
- `node ace make:seeder start`  // database/seeders/start_seeder.ts
- `node ace db:seed`
- `node ace make:factory fname`

## EdgeJS

- HTML
- dynamic variable: `{{ title }}`
- has components/props
- Home: `pages\home.edge`, it can contain:

```html
@layout.app({title: 'title'}) /* views\components\layout\app.edge */
<h1>Heading</h1>
@end
```

- {{ }} = escaped output
  - It prints data safely
  - It escapes HTML to prevent XSS
- {{{ }}} = unescaped output
  - It does NOT escape HTML
  - It inserts the raw HTML into the page
  - Used when you trust the content
  - render actual HTML
- Providing dynamic stuffs from backend
```js
ctx.view.share({ something: 'something' })
```
- in html head section
```
@vite(['resources/js/app.js', 'resources/css/app.css'])
```

#### CSRF (Cross-Site Request Forgery)

Prevents unauthorized form submission.

#### Method Spoofing

By default `<form>` only works with POST method. By setting `allowMethodSpoofing` in `config/app.ts` we can work with other HTTP methods.

## VineJS

VineJS is a form data validation library for Node.js. You may use it to validate the HTTP request body in your backend applications. VineJS is not a generic validation library; therefore, you cannot use it to validate JavaScript data types like Functions, Maps, or Sets. The performance is 5x-10x better than Zod.

## Folder Stuffs

Controller → Service → Model → DB

| Layer      | Responsibility                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------- |
| Controller | Receiving request, sending response                                                               |
| Service    | Business logic (most of your logic lives here), NOT routing, NOT database schema, NOT HTTP logic. |
| Model      | Database access                                                                                   |
| Middleware | Filters requests (auth, rate limit)                                                               |

### Folder Structure

- bin: for build process, first folder to be hit
- start: for registering routes, middlewares (`kernel.ts`)
- `kernel.ts` registers all (global) middlewares serially

### NodeJS subpath imports

We need to fix the path in `tsconfig.json` and `package.json`

```js
// package.json
"imports": {
    "#controllers/*": "./app/controllers/*.js",
    "#models/*": "./app/models/*.js",
    "#mails/*": "./app/mails/*.js",
    "#services/*": "./app/services/*.js",
  }
```

### Enums

Example file (in root directory): `./enums/roles.ts`

```js
enum Role {
  USER = 1,
  ADMIN = 2
}
export default Role
```

##### Cherry-picking

Importing only the necessary stuffs.

```js
import { useQuery } from "@tanstack/react-query";
```

## Services

Contain re-usable code or logic. Services are particularly useful for code that involves complex business logic, reusable helper functions, or interactions with external APIs.

## Controllers

Cleaning up Routes.

## Models

Data Structuring.

```js
class Test() {
  declare id: number
  declare content: string
}
```

## Middlewares

#### Global Middleware

Global middleware is applied to all HTTP requests in your application. These middleware are registered globally and are typically used for tasks that every request should pass through, such as:
- Logging
- Handling CORS
- Parsing request bodies
- Validating sessions or JWT tokens (if applied universally)

```js
// kernel.ts
Server.middleware.register()
```
#### Named Middleware

Named middleware is applied selectively to specific routes or route groups. It is ideal for middleware that is only relevant to certain parts of your application, such as:

- Role-based access control
- Specific validation for certain APIs
- Rate limiting for certain endpoints

Explicitly applied via `.middleware()`

```js
// kernel.ts
Server.middleware.registerNamed()
```

## Routes

#### Context (ctx)

AdonisJS provides a ctx (HTTP Context) object to the handler function. This ctx includes useful properties like:

- auth: Authentication information for the request.
- logger: For logging within the route handler.
- params: URL parameters, useful for dynamic routes.
- request: Information about the incoming request (headers, cookies, etc.).
- response: Methods to control the outgoing response, like sending JSON or setting HTTP status codes.
- session: Session data specific to the user.
- view: Access to Edge templating system for rendering views

## Redis

Redis sets values as String in database.

```js
// has
redis.exists(keys)  // keys = []

// get
const value = await redis.get(key)
return value && JSON.parse(value)

// set
redis.set(key, JSON.stringify(value))

// delete
redis.del(keys)  // keys = []

// flush
redis.flushdb()
```

```js
// example deletion from redis cache, slug (movie context) is kinda id
router.delete('/redis/:slug', [RedisController, 'destroy']).as('redis.destroy')
```

## Lucid ORM

Lucid ORM expects a single primary key named id by default. Composite primary keys are supported at DB level, but not fully supported by Lucid ORM.

So if you use composite keys:
- Prefer using pivot tables
- Or define a single primary key (id) + unique constraint on multiple columns

```js
table.increments('id')
table.unique(['user_id', 'role_id'])
```

## SQL Parameters and Injection Protection

```js
(await db.rawQuery('select * from table where :column: = :value', { column: 'id', value: 3 })).rows
```

## Reusable Query Statements with `Model Query Scopes`

```js
static released = scope((query) => {
  query.where(group => {
    group
      .where('statusId', 1)
      .whereNotNull('releasedId')
  })
})
```

```js
// in terminal
await models.movie.query().withScopes(scope => scope.released())
```

## Pivot Table

A pivot table is a special table used to represent a **many-to-many relationship** between two other tables.

- It connects two models without storing extra data (usually).
- Almost every backend framework uses pivot tables (AdonisJS, Laravel, Django, Rails, Prisma).

#### Why

Example: A user can have many roles, A role can belong to many users

There is no direct way to store this in one table without duplication and mess.

So we create a link table (pivot table): `users <---- user_roles ----> roles`

**The pivot table holds pairs of foreign keys, linking the two main tables.**

## REPL session

Read Evaluate Print Loop, we can interact with server, create database in terminal.

Some play commands:

- `await loadDb()`
- `await loadModels()`
- `await models.table_name.all()`
- `await models.table_name.create({ name: 'app' })`

## Seeders

REPL is not scalable in a team. It's fine for single person. In a team same db instance, info should be shared. Now, seeders come into play. Seeders allow you to you define the information, **run the seeder to create the info automatically**, you don't have to have somebody jump into REPL to create info.

## Factories

We can create fake database.

## Relations in database

```js
// one to one relation
@belongsTo()
@hasOne()
```

## Others

- adonis migration filename starts with creation_timestamp
  - ordering, uniqueness (avoids filename conflicts)
  - tracking, rollback
- adonis uses classes everywhere
  - dependency injection becomes easier with classes
    - adonis uses IoC container (inversion of control)
  - clear MVC, goes well with TS
  - models in adonis are stateful (represent a row in db)
  - consistency with lucid (adonis ORM)
- we can render markdown as well with proper tools
- init existing project (say, from github) with Adonis Slim Starter Kit

```js
// -- for one level down, -K for slim starter kit
npm init adonisjs@latest -- -K="github:githubUsername/project_name"
```