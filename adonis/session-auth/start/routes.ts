/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RegisterController = () => import('#controllers/auth/register_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
   return {
      hello: 'world',
   }
})

router
   .group(() => {
      router.get('/register', [RegisterController, 'show']).as('register.show')
   })
   .as('auth')
