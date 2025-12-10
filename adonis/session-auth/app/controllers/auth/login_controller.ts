import User from '#models/user'
import { loginValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
   async show({}: HttpContext) {
      return {
         message: 'welcome onboard',
      }
   }

   async store({ request, auth }: HttpContext) {
      const { email, password } = await request.validateUsing(loginValidator)
      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)

      return {
         message: `welcome ${email}`,
      }
   }
}
