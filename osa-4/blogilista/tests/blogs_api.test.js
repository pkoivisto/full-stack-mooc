const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./tests_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.remove({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('adding a blog entry leads to the number of entries increasing by one', async () => {
  const postData = {'title' : 'Brand new post!', 'author' : 'Tester', 'url' : 'http://notfou.nd', 'likes' : 1337}
  const response = await api.post('/api/blogs').send(postData)
  expect(response.body).toEqual(expect.objectContaining(postData))

  const blogs = await api.get('/api/blogs')
  expect(blogs.body.length).toBe(helper.initialBlogs.length + 1)
})

afterAll(() => {
  mongoose.connection.close()
})