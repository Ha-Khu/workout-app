require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT
const authRouter = require('./routes/auth.js')
const workoutRouter = require('./routes/workout.js')
const exerciseRouter = require('./routes/exercise.js')
const prRouter = require('./routes/personalRecord.js')

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/workout', workoutRouter)
app.use('/api/exercise', exerciseRouter)
app.use('/api/pr', prRouter)


app.listen(port, ()=>{
  console.log(`Example app listening on port ${port}`)
})

