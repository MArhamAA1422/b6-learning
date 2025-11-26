## Backend info

- Two Major Components of backend: **A Programming Language, A Database**
- Server is just a software
- API is kinda like a return value
- Possible server input or situations to handle: **`data, file, third party API`**
- js runtime: node / deno / bun
- two major things in js backend: express, mongoose (IF mongodb)
- connect frontend and backend: proxy, CORS
   - npm build (vite) => dist folder, put `dist` folder to backend folder
   - middleware: `app.use(express.static('dist'))`

## Folder Structure

- src: package.json, .env, readme, git, lint, prettier etc
   - index file
   - APP (config, cookie, urlencode)
   - constants (enums, db-name)
- DB
- Models (db schema)
- Controllers (functionalities)
- Routes
- Middlewares
- Utils
- More (depends)