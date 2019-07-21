const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const blog = await new Blog(request.body).save()
  return response.status(201).json(blog)
})

module.exports = blogsRouter