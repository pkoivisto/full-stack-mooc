import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, style, notificationCallback }) => {
  const [fullDetailsVisible, setFullDetailsVisible] = useState(false)
  const toggleFullDetails = () => setFullDetailsVisible(!fullDetailsVisible)
  const showWhenFullDetailsVisible = { display : ( fullDetailsVisible ? '' : 'none' ) }

  const likeBlog = async () => {
    try {
      const updatedContents = { author : blog.author, url : blog.url, user : blog.user.id, likes : blog.likes + 1 }
      const response = await blogService.updateBlog({ id : blog.id, updatedContents })
      if (response.error) {
        notificationCallback({ type : 'ERROR', message : response.error})
      } else {
        notificationCallback({ type : 'SUCCESS', message : `Liked ${blog.title} by ${blog.author}!` })
      }
    } catch (exception) {
      notificationCallback({ type : 'ERROR', message : exception.message })
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const response = await blogService.deleteBlog({id : blog.id})
      if (response.error) {
        notificationCallback({ type : 'ERROR', message : response.error})
      } else {
        notificationCallback({ type : 'SUCCESS', message : `Deleted ${blog.title} by ${blog.author}.`})
      }
    }
  }

  return (
    <div style={style}>
      <div onClick={toggleFullDetails}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenFullDetailsVisible}>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes <button onClick={ likeBlog }>like</button></div>
        <div>added by {blog.user.name}</div>
        <div><button onClick={deleteBlog}>Delete</button></div>
      </div>
    </div>
  )
}

export default Blog