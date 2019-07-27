import React, {useState, useEffect} from 'react';
import blogService from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import localStorage from './services/localStorage'

const App = () => {
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
        setBlogs(blogs)
      }
    }
    fetchBlogs()
  }, [user])

  const handleLogin = (user) => {
    localStorage.setStoredUser(user)
    setUser(user)
  }

  if (!user) {
    return (
      <LoginForm setUser={handleLogin}/>
    );
  } else {
    return (
      <div>
      <h2>Blogs</h2>
      <p>
        {user.name} is logged in <button onClick={() => { localStorage.removeStoredUser(); setUser(null) }}>log out</button>
      </p>
      { blogs.map(blog => <Blog key={blog.id} blog={blog}/>) }
      </div>
    )
  }
}

export default App;
