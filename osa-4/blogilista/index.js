const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const { MONGODB_URI, PORT } = require('./utils/config')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
