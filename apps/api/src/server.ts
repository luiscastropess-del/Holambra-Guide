import Fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const app = Fastify()
const prisma = new PrismaClient()

app.register(cors, { origin: true })
app.register(multipart)

const JWT = process.env.JWT_SECRET || "secret"

app.get('/', async () => {
  return { status: 'ok' }
})

app.post('/register', async (req: any) => {
  const { email, password } = req.body
  const hash = await bcrypt.hash(password, 10)

  return prisma.user.create({
    data: { email, password: hash }
  })
})

app.post('/login', async (req: any) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) throw new Error('User not found')

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error('Invalid password')

  const token = jwt.sign({ id: user.id }, JWT)
  return { token }
})

app.get('/places', async () => {
  return prisma.place.findMany()
})

app.post('/places', async (req: any) => {
  return prisma.place.create({
    data: req.body
  })
})

app.listen({
  port: Number(process.env.PORT) || 3001,
  host: '0.0.0.0'
})
