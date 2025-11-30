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