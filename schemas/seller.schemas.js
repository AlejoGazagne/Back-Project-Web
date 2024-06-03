const z = require('zod')

const sellerSchema = z.object({
  name: z.string().min(1).max(20).refine(value => typeof value === 'string', {
    message: 'El nombre debe ser una cadena de texto',
  }),
  email: z.string().email().refine(value => typeof value === 'string', {
    message: 'El email debe ser una cadena de texto',
  }),
  phoneNumber: z.string().min(1).max(10).refine(value => typeof value === 'string', {
    message: 'El número de teléfono debe ser una cadena de texto',
  }),
  password: z.string().min(6).max(25).refine(value => typeof value === 'string' && /\d/.test(value), {
    message: 'La contraseña debe ser una cadena de texto y contener al menos un carácter numérico',
  }),
})

function validateSeller(input) {
  return sellerSchema.safeParse(input)
}
function validatePartialSeller(input) {
  return sellerSchema.partial().safeParse(input)
}

module.exports = { validateSeller, validatePartialSeller }