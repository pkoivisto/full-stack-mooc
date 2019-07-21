const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', { author : 1, title : 1, url : 1})
    response.json(users)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const { password, username, name } = request.body

  if (!password || password.length < 3) {
    response.status(400).json({error : 'Password missing or too short'})
  }

  try {
    const bcryptRounds = 10
    const passwordHash = await bcrypt.hash(password, bcryptRounds)

    const user = new User({ username, name, passwordHash})

    const savedUser = await user.save()
    response.json(savedUser)
  } catch (exception) {
    if (exception.name === 'ValidationError') {
      response.status(400).json({error : exception.message})
    }
    next(exception)
  }
})

module.exports = usersRouter