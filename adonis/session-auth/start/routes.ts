/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RegisterController = () => import('#controllers/auth/register_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const LoginController = () => import('#controllers/auth/login_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async (ctx) => {
   const res = await ctx.auth.check()

   return {
      response: res,
   }
})

router
   .group(() => {
      router.get('/register', [RegisterController, 'show']).as('register.show')
      router.post('/register', [RegisterController, 'store']).as('register.store')

      router.post('/logout', [LogoutController, 'handle']).as('logout')

      router.get('/login', [LoginController, 'show']).as('login.show')
      router.post('/login', [LoginController, 'store']).as('login.store')
   })
   .as('auth')
