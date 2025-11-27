## Command
- `npm init adonisjs@latest project_name`
- `node ace server --hmr`
- `node ace migration:run`
- `node ace make:controller register -s`
- `node ace make:validator register`

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

Validator package in adonisJS.