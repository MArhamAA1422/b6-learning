## Intro

AdonisJS is a TypeScript-first web framework for Node.js. You can use it to create a full-stack web application or a JSON API server.

AdonisJS is an independent project created by Harminder Virk in 2015. The framework is actively maintained by the core team and community contributors.

### Modern and Type-safe

AdonisJS is built on top of modern JavaScript primitives. We use **ES modules**, **Node.js** sub-path import aliases, **SWC** for executing TypeScript source, and **Vite** for **assets bundling**.

Also, TypeScript plays a considerable role when designing the framework's APIs. For example, AdonisJS has:
- Type-safe event emitter
- Type-safe environment variables
- Type-safe validation library

## Embracing MVC

AdonisJS embraces the classic MVC design pattern. You start by defining the routes using the functional JavaScript API, bind controllers to them and write logic to handle the HTTP requests within the controllers. Controllers can use models to fetch data from the database and render a view (aka template) as a response.

## Config service vs directly importing config files

Using the config service over directly importing the config files has no direct benefits. However, the config service is the **only choice to read the configuration in external packages and edge templates**.

## Config files limitations

The config files stored within the config directory **are imported during the boot phase** of the application. As a result, the config files cannot rely on the application code.

For example, if you try to import and use the router service inside the `config/app.ts` file, the application will fail to start. **This is because the router service is not configured until the app is in a booted state.**

Fundamentally, this limitation positively impacts your codebase because the application code should rely on the config, not vice versa.

## Environment variables (.env)

Node.js natively exposes all the environment variables as an object through the `process.env`

### Using the AdonisJS env module

The env module is instantiated inside the `start/env.ts` file, and you may access it elsewhere inside your application as follows.

- Ability to store and parse environment variables from multiple .env files.
- Validate environment variables as soon as the application starts.
- Have static-type safety for validated environment variables.

### Validating environment variables

The validation rules for environment variables are defined inside the `start/env.ts` file using the `Env.create` method. The validation is performed automatically when you first import this file. Typically, the `start/env.ts` file is imported by one of the config files in your project. If not, then AdonisJS will import this file implicitly before booting the application.

### Using variables inside the dot-env files

```js
URL=$HOST:$PORT
REDIS-URL=localhost@${REDIS-USER}  //  You must wrap the variable name inside curly braces {} if the name has special characters other than an underscore.
```

## Folder Structure

### Start Directory

The start directory contains the files you want to import during the boot lifecycle of the application. For example, the files to register **routes** and define **event listeners** should live within the start directory.

### Public Directory

Do not confuse the `public` directory with the `resources` directory. The resources directory contains the source code of your frontend application, and the public directory has the compiled output. The public directory hosts static assets.

### DB Directory

- migrations dir
- seeders dir

## Concepts

### AdonisRC file

The `adonisrc.ts` file is used to configure the workspace settings of your application.

#### preloads

An array of files to import at the time of booting the application.

You can define the environment in which to import the file. The valid options are:

- `web` environment refers to the process started for the HTTP server.
- `console` environment refers to the Ace commands except for the repl command.
- `repl` environment refers to the process started using the node ace repl command.
- Finally, the `test` environment refers to the process started for running the tests.

### Async Local Storage (ALS)

AsyncLocalStorage is used to create asynchronous state within callbacks and promise chains. It allows storing data throughout the lifetime of a web request or any other asynchronous duration. It is similar to thread-local storage in other languages.

Correct Usage
- Do not access the ALS at the top level of any module because modules in Node.js are cached.
- **Static properties** (not methods) of any class are evaluated as soon as the module is imported; hence, you should not access the HTTP context within static properties.
- **Event handlers** are executed after the HTTP request finishes. Therefore you should refrain from attempting to access the HTTP context inside them.

### Application

The **Application class** does all the heavy lifting of wiring together an AdonisJS application. You can use this class to know about the environment in which your app is running, get the current state of the application, or make paths to specific directories.

### Scaffolding and codemods

Scaffolding refers to the process of generating source files from static templates (aka stubs), and codemods refer to updating the TypeScript source code by parsing the AST.

### HTTP Context

A new instance of HTTP Context class is generated **for every HTTP request** and passed along to the **route handler, middleware, and exception handler**.

HTTP Context holds all the information you may need related to an HTTP request. For example:

- You can access the request body, headers, and query params using the `ctx.request` property.
- You can respond to the HTTP request using the `ctx.response` property.
- Access the logged-in user using the `ctx.auth` property.
- Authorize user actions using the `ctx.bouncer` property.
- And so on.

In a nutshell, the context is a request-specific store holding all the information for the ongoing request.

## Basics

### Routing

In AdonisJS, routes are defined inside the `start/routes.ts` file. A route is a combination of a **URI pattern and a handler** to handle requests for that specific route. For example:

```js
router.get('/home/:id', ({ params }) => {
   return `hello ${params.id} from home page`
})
```

#### Params Matchers

```js
router
  .get('/posts/:id', ({ params }) => {})
  .where('id', {
    match: /^[0-9]+$/,
  })
```

You can use the `router.any()` method to create a route that responds to all standard HTTP methods. Finally, you can create a route for custom HTTP methods using the `router.route()` method.

#### Router handler

The route handler handles the request by returning a **response** or raising an **exception** to abort the request. A handler can be an inline callback or a reference to a controller method.

During an HTTP request, AdonisJS will **create an instance of the controller class using the IoC container** and execute the store method.

```js
const UsersController = () => import('#controllers/users_controller')
router.post('users', [UsersController, 'store'])
```

You can define a middleware on a route by chaining the `use()` method.

#### Route identifier

Every route has a unique identifier you can use to reference the route elsewhere in your application. For example, you can generate a URL to a route using the URL builder or redirect to a route using the `response.redirect()` method.

By default, the route pattern is the route identifier. However, you can assign a unique, memorable name to the route using the `route.as` method.
```js
router.get('users', () => {}).as('users.index')
```

#### Grouping Routes

```js
router.group(() => {
  router.get('posts', () => {})
  router.group(() => {
    router.get('users', () => {})
  })
})
```

#### Prefixing Routes

```js
router
  .group(() => {
    router
      .group(() => {
        router.get('users', () => {})  // api/v1/users
      })
      .prefix('v1')
  })
  .prefix('api')
```

#### Routes for specific domain

`.domain()`

##### Dynamic subdomain

In the following example, the tenant segment accepts any subdomain, and you can access its value using the `HttpContext.subdomains` object.

```js
.domain(':tenant.adonisjs.com')
```

#### Forwarding params

```js
router.on('/a/:id').redirect('b/:id')
```

#### Explicitly specifying params

```js
// Always redirect to /articles/1
router.on('/posts/:id').redirect('/articles/:id', {
  id: 1
})
```

#### With query string

```js
router.on('/posts').redirect('/articles', {
  qs: {
    limit: 20,
    page: 1,
  }  
})
```

#### Match multiple routes

```js
if (request.matchesRoute(['/posts/:id', '/posts/:id/comments'])) {
  // do something
}
```

#### URL builder

The `router.builder` method creates an instance of the URL builder class, and you can use the builder's fluent API to look up a route and create a URL for it.

#### Signed URL

For example: unsubscribe a user

#### Extending router

You can add custom properties to different router classes using macros and getters. Following is the list of classes you can extend.

- Router, Route, RouteGroup
- RouteResource
- BriskRoute

##### BriskRoute

The BriskRoute class represents a route without an explicit handler. An instance of BriskRoute class is created once you call the `router.on` method.

#### route.on

`router.on()` (or `Route.on()` in AdonisJS) is a special routing method that maps a URL path directly to a view/template, without a controller, without logic, and without parameters. It is used for simple/static pages. Route.on() is a shortcut for simple GET routes that only need to render a view, with no logic.

#### Route vs Router

Route	= Public API for defining routes, for Application developer (you)

router = Internal router engine, for Framework & advanced users

### Controllers

HTTP controllers offer an abstraction layer to **organize the route handlers** inside dedicated files. Instead of expressing all the request handling logic within the routes file, you move it to controller classes.

Lazy-loading controllers are needed when you are using HMR.

#### Using magic strings

Another way of lazy loading the controllers is to reference the controller and its method as a string. We call it a magic string because the string itself has no meaning, and it's just the router uses it to look up the controller and imports it behind the scenes.

```js
router.get('users', '#controllers/users_controller.index')
```

#### HTTP context

The **controller methods receive an instance** of the HttpContext class as the first argument.

#### Resource-driven controllers

For conventional RESTful applications, a controller should only be designed to manage a single resource. A resource is usually an entity in your application like a User resource or a Post resource.

#### router.resource

Creates all the necessary routes for controller class methods.