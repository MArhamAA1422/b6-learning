## Commands

- `npm init adonisjs@latest project_name`
- `node ace server --hmr`
- `node ace migration:run`
- `node ace make:controller controller_name -s` // s for singular form in file name not plural
- `node ace make:service service_name`
- `node ace make:validator validator_name`
- `node ace make:model model_name -m` // -m for migration file creation
- `node ace configure @adonisjs/redis`

## EdgeJS

- HTML
- dynamic variable: `{{ title }}`
- Home: `pages\home.edge`, it contains

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
- CSRF = Cross-Site Request Forgery
- Providing dynamic stuffs from backend
```js
ctx.view.share({ something: 'something' })
```
- in html head section
```
@vite(['resources/js/app.js', 'resources/css/app.css'])
```

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

##### Cherry-picking

Importing only the necessary stuffs.

```js
import { useQuery } from "@tanstack/react-query";
```

## Services

Contain re-usable code or logic. 

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
```
// -- for one level down, -K for slim starter kit
npm init adonisjs@latest -- -K="github:githubUsername/project_name"
```