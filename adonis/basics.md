## Command
- `npm init adonisjs@latest project_name`
- `node ace server --hmr`
- `node ace migration:run`

## EdgeJS
- HTML
- dynamic variable: `{{ title }}`
- Home: `pages\home.edge`, it contains
```html
@layout.app({title: 'title'})  /* views\components\layout\app.edge */
   <h1>Heading</h1>
@end
```