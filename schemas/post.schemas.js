const z = require('zod')

const postSchema = z.object({
  title: z.string().min(1).max(80).refine(value => typeof value === 'string', {
    message: 'El título debe ser una cadena de texto',
  }),
  content: z.string().min(1).max(500).refine(value => typeof value === 'string', {
    message: 'El contenido debe ser una cadena de texto',
  }),
  published: z.boolean().refine(value => typeof value === 'boolean', {
    message: 'El campo publicado debe ser un booleano',
  }),
  price: z.number().positive().refine(value => value > 0, {
    message: 'El precio debe ser un número entero positivo',
  }),
  onSale: z.boolean().refine(value => typeof value === 'boolean', {
    message: 'El campo en venta debe ser un booleano',
  }),
  ubication: z.string().min(1).max(80).refine(value => typeof value === 'string', {
    message: 'La ubicación debe ser una cadena de texto',
  }),
  city: z.string().min(1).max(60).refine(value => typeof value === 'string', {
    message: 'La ciudad debe ser una cadena de texto',
  }),
  neighborhood: z.string().min(1).max(60).refine(value => typeof value === 'string', {
    message: 'El barrio debe ser una cadena de texto',
  }),
  type: z.enum(['Departamento', 'Casa']).refine(value => ['Departamento', 'Casa'].includes(value), {
    message: 'El tipo debe ser "Departamento" o "Casa"',
  }),
  rooms: z.number().int().positive().refine(value => value > 0, {
    message: 'La cantidad de habitaciones debe ser un número entero positivo',
  }),
  bathrooms: z.number().int().positive().refine(value => value > 0, {
    message: 'La cantidad de baños debe ser un número entero positivo',
  }),
  garage: z.number().int().positive().refine(value => value > 0, {
    message: 'La cantidad de cocheras debe ser un número entero positivo',
  }),
  area: z.number().positive().refine(value => value > 0, {
    message: 'La superficie debe ser un número positivo',
  }),
  pool: z.boolean().refine(value => typeof value === 'boolean', {
    message: 'El campo piscina debe ser un booleano',
  }),
  pets: z.boolean().refine(value => typeof value === 'boolean', {
    message: 'El campo mascotas debe ser un booleano',
  }),
  sellerId: z.number().int().positive().refine(value => value > 0, {
    message: 'El id del vendedor debe ser un número entero positivo',
  }),
  datetime: z.string().refine(value => typeof value === 'string', {
    message: 'La fecha y hora deben ser una cadena de texto',
  }),
})

function validatePost(input) {
  return postSchema.safeParse(input)
}
function validatePartialPost(input) {
  return postSchema.partial().safeParse(input)
}

module.exports = { validatePost, validatePartialPost }