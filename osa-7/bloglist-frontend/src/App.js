import React, { useEffect } from 'react'
import blogService from './services/blogs'
import userService from './services/users'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import localStorage from './services/localStorage'
import { connect } from 'react-redux'
import { initUsers, loginUser } from './reducers/userReducer'
import { initBlogs } from './reducers/blogsReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const App = ({ userData, notification, initUsers, loginUser, blogs, initBlogs }) => {
  const user = userData.currentUser
  useEffect(() => {
    const initializeUsers = async () => {
      const response = await userService.getAll()
      initUsers(response)
    }
    initializeUsers()
  }, [initUsers])

  useEffect(() => {
    const storedUser = localStorage.getStoredUser()
    if (storedUser) {
      loginUser(storedUser)
    }
  }, [loginUser])

  useEffect(() => {
    async function fetchBlogs() {
      if (user) {
        const blogs = await blogService.getAll()
        initBlogs(blogs)
      }
    }
    fetchBlogs()
  }, [user, initBlogs])

  const sortedBlogs = blogs.sort((a,b) => a.likes > b.likes ? -1 : 1)
  const evenRowStyle = { 'backgroundColor' : '#ffffff' }
  const oddRowStyle = { 'backgroundColor' : '#f0f0f0' }

  const padding = { padding : '5px' }
  const outline = { border : '2px dashed grey', padding : '3px' }
  if (!user) {
    return (
      <div>
        <Notification {...notification}/>
        <LoginForm />
      </div>
    )
  } else {
    return (
      <Router>
        <div>
          <div style={outline}>
            <Link style={padding} to="/users">Users</Link>
            <Link style={padding} to="/blogs">Blogs</Link>
            {user.name} is logged in <button onClick={() => { localStorage.removeStoredUser(); loginUser(null) }}>log out</button>
          </div>
          <h2>Blog app</h2>
          <Notification {...notification} />
          <p/>
          <Route exact path="/users" render={() => <Users />}/>
          <Route path="/users/:id" render={({ match }) => <User id={match.params.id} />}/>
          <Route exact path="/blogs" render={() => (
            <div>
              <Togglable label="New blog entry">
                <BlogForm user={user}/>
              </Togglable>
              <h3>Blogs</h3>
              { sortedBlogs.map((blog, idx) => <Blog key={blog.id} blog={blog} style={idx % 2 === 0 ? evenRowStyle : oddRowStyle} loggedInUser={user.username}/>) }
            </div>)
          }/>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = ({ notification, users, blogs }) => {
  return { notification, userData : users, blogs }
}

const mapDispatchToProps = { initUsers, loginUser, initBlogs }
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
