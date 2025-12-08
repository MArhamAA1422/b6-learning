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

## DB Directory

- migrations dir
- seeders dir

