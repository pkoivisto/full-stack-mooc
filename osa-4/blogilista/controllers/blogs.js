const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username : 1, name : 1})
  return response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const token = request.token

  try {

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      response.status(401).json({error : 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    const blog = await new Blog({...request.body, user }).save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    return response.status(201).json(blog)
  } catch (exception) {
    if (exception.name === 'ValidationError') {
      return response.status(400).json({'error' : 'Failed validation'})
    }
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
    response.json(updated)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter