import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
   vine.object({
      fullName: vine.string().maxLength(100),
      email: vine.string().email().normalizeEmail(),
      password: vine.string().minLength(4),
   })
)
