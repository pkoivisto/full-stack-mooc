import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ user, notificationCallback }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (e) => {
    e.preventDefault()
    const response = await blogService.createNew({ user, blog: { title, author, url } })
    if (response.error) {
      notificationCallback({ type : 'ERROR', message : response.error })
    } else {
      notificationCallback({ type : 'SUCCESS', message : `Added new blog "${title}" by ${author}` })
    }
  }

  return (
    <form onSubmit={createBlog}>
      <h2>Add a new blog entry</h2>
      <table>
        <tbody>
          <tr>
            <td>title</td>
            <td><input type="text" value={title} onChange={e => setTitle(e.target.value)}/></td>
          </tr>
          <tr>
            <td>author</td>
            <td><input type="text" value={author} onChange={e => setAuthor(e.target.value)}/></td>
          </tr>
          <tr>
            <td>url</td>
            <td><input type="text" value={url} onChange={e => setUrl(e.target.value)}/></td>
          </tr>
        </tbody>
      </table>
      <input type="submit" />
    </form>)
}

BlogForm.propTypes = {
  user: PropTypes.object.isRequired,
  notificationCallback: PropTypes.func.isRequired
}

export default BlogForm