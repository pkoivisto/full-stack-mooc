import React from 'react'
import blogService from '../services/blogs'
import { connect } from 'react-redux'
import { newNotification } from '../reducers/notificationReducer'
import { updateExisting, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ id, deleteOne, currentUser, blogs }) => {
  const blog = blogs.find(val => val.id === id)
  if (!blog) {
    return <div />
  }
  const likeBlog = async () => {
    try {
      const updatedContents = { author : blog.author, url : blog.url, user : blog.user.id, likes : blog.likes + 1 }
      const response = await blogService.updateBlog({ id : blog.id, updatedContents })
      if (response.error) {
        newNotification({ success : false, content : response.error })
      } else {
        newNotification({ success : true, content : `Liked ${blog.title} by ${blog.author}!` })
        updateExisting(response.data)
      }
    } catch (exception) {
      newNotification({ success : false, content : exception.message })
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const response = await blogService.deleteBlog({ id : blog.id })
      if (response.error) {
        newNotification({ success : false, content : response.error })
      } else {
        newNotification({ success : true, content : `Deleted ${blog.title} by ${blog.author}.` })
        deleteOne(blog)
      }
    }
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes <button onClick={ likeBlog }>like</button></div>
        <div>added by {blog.user.name}</div>
        { blog.user.username === currentUser.username ? <div><button onClick={ deleteBlog }>Delete</button></div> : null }
      </div>
    </div>
  )
}

const mapStateToProps = ({ blogs, users }) => {
  return {
    blogs,
    currentUser : users.currentUser
  }
}
const mapDispatchToProps = { newNotification, deleteOne : deleteBlog, updateExisting }

export default connect(mapStateToProps, mapDispatchToProps)(Blog)