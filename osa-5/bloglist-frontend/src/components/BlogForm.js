import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({user,notifyCallback }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (e) => {
    e.preventDefault()
    const response = await blogService.createNew({ user, blog: {title, author, url} })
    if (response.error) {
      notifyCallback({type : 'ERROR', message : response.error})
    } else {
      notifyCallback({type : 'SUCCESS', message : `Added new blog "${title}" by ${author}`})
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

export default BlogForm