import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const app = Fastify()

await app.register(cors, { origin: '*' })

let users:any[] = []
let places:any[] = []

app.post('/register', async (req:any) => {
  const { email, password } = req.body
  const hash = await bcrypt.hash(password, 10)
  const user = { id: Date.now().toString(), email, password: hash }
  users.push(user)
  return user
})

app.post('/login', async (req:any) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (!user) throw new Error('User not found')

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error('Invalid')

  const token = jwt.sign({ id: user.id }, 'secret')
  return { token }
})

app.get('/places', async () => places)

app.post('/places', async (req:any) => {
  const place = { id: Date.now().toString(), ...req.body }
  places.push(place)
  return place
})

app.listen({ port: Number(process.env.PORT) || 3001, host: '0.0.0.0' })
