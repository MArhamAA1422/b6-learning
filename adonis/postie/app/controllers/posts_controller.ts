import Post from '#models/post'
import { PostValidator } from '#validators/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
   async store({request, auth, session, response}: HttpContext) {
      const { content } = await request.validateUsing(PostValidator)

      await auth.user?.related('posts').create({content})

      session.flash({
         notification: {
            type: 'success',
            message: 'post created',
         },
      })

      return response.redirect().back()
   }

   async edit({params, view}: HttpContext) {
      const post = await Post.findOrFail(params.id)

      return view.render('pages/posts/edit', {post})
   }

   async update({params, request, session, response}: HttpContext) {
      const post = await Post.findOrFail(params.id)
      const {content} = await request.validateUsing(PostValidator)

      await post.merge({content}).save()

      session.flash({
         notification: {
            type: 'success',
            message: 'post updated',
         }
      })

      return response.redirect('/')
   }

   async destroy({params, session, response}: HttpContext) {
      const post = await Post.findOrFail(params.id)
      await post.delete()

      session.flash({
         notification: {
            type: 'success',
            message: 'post deleted',
         }
      })

      return response.redirect().back()
   }
}