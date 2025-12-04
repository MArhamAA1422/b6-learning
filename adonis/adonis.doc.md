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

