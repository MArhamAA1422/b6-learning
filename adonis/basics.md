## Commands
- `npm init adonisjs@latest project_name`
- `node ace server --hmr`
- `node ace migration:run`
- `node ace make:controller controller_name -s`  // s for singular form in file name not plural
- `node ace make:validator validator_name`
- `node ace make:model model_name -m`  // -m for migration file creation

## EdgeJS
- HTML
- dynamic variable: `{{ title }}`
- Home: `pages\home.edge`, it contains
```html
@layout.app({title: 'title'})  /* views\components\layout\app.edge */
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

## VineJS

Validation package in adonisJS.

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
