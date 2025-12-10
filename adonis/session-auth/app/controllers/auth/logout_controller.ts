import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
   async handle({ auth }: HttpContext) {
      await auth.use('web').logout()

      return {
         message: 'logout successfully',
      }
   }
}
