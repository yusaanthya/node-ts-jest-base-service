import express from 'express'
import userRoutes from './routes/user.route'

const app = express()
const port = 3000

app.use(express.json())

// routes
app.use('/api/users', userRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
