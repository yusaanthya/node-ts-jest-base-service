import express from 'express'
import userRoutes from './routes/user.route'
import {config} from './config/config'

const app = express()

app.use(express.json())

// routes
app.use('/api/users', userRoutes)

// export app for testin
export default app

if (require.main === module) {

  app.listen(config.port, () => {
    console.log(`Server running at http://${config.host}:${config.port}`)
  })
  
}


