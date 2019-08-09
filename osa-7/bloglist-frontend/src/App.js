import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import Notification from './components/Notification'
import localStorage from './services/localStorage'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const App = ({ notification }) => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const storedUser = localStorage.getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  useEffect(() => {
    async function fetchBlogs() {
      if (user) {
        const blogs = await blogService.getAll()
        setBlogs(blogs.sort((a,b) => a.likes > b.likes ? -1 : 1))
      }
    }
    fetchBlogs()
  }, [user])

  const handleLogin = (user) => {
    localStorage.setStoredUser(user)
    setUser(user)
  }

  const evenRowStyle = { 'backgroundColor' : '#ffffff' }
  const oddRowStyle = { 'backgroundColor' : '#f0f0f0' }

  if (!user) {
    return (
      <div>
        <Notification {...notification}/>
        <LoginForm setUser={handleLogin} />
      </div>
    )
  } else {
    return (
      <Router>
        <div>
          <div>
            <Link to="/users">Users</Link>
          </div>
          <h2>Blogs</h2>
          <Notification {...notification} />
          <div>
            {user.name} is logged in <button onClick={() => { localStorage.removeStoredUser(); setUser(null) }}>log out</button>
          </div>
          <p/>
          <Route path="/users" render={() => <Users />}/>
          <Route exact path="/" render={() => (
            <div><Togglable label="New blog entry">
              <BlogForm user={user}/>
            </Togglable>
            { blogs.map((blog, idx) => <Blog key={blog.id} blog={blog} style={idx % 2 === 0 ? evenRowStyle : oddRowStyle} loggedInUser={user.username}/>) }
            </div>)
          }/>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = ({ notification }) => {
  return { notification }
}

const ConnectedApp = connect(mapStateToProps)(App)

export default ConnectedApp
