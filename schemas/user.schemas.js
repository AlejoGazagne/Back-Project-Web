const z = require('zod')

const userSchema = z.object({
  name: z.string().min(1).max(30).refine(value => typeof value === 'string', {
    message: 'El nombre debe ser una cadena de texto',
  }),
  email: z.string().email().refine(value => typeof value === 'string', {
    message: 'El email debe ser una cadena de texto',
  }),
  phoneNumber: z.string().min(1).max(16).refine(value => typeof value === 'string', {
    message: 'El número de teléfono debe ser una cadena de texto',
  }),
  password: z.string().min(6).max(20).refine(value => typeof value === 'string' && /\d/.test(value), {
    message: 'La contraseña debe ser una cadena de texto y contener al menos un carácter numérico',
  }),
})

function validateUser(input) {
  return userSchema.safeParse(input)
}
function validatePartialUser(input) {
  return userSchema.partial().safeParse(input)
}

module.exports = { validateUser, validatePartialUser }