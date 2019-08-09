import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { newNotification } from '../reducers/notificationReducer'
import { createNew } from '../reducers/blogsReducer'

const BlogForm = ({ user, newNotification, createNew }) => {

  // eslint-disable-next-line no-unused-vars
  const { reset: resetT, ...title } = useField('text')
  // eslint-disable-next-line no-unused-vars
  const { reset: resetA, ...author } = useField('text')
  // eslint-disable-next-line no-unused-vars
  const { reset: resetU, ...url } = useField('text')

  const createBlog = async (e) => {
    e.preventDefault()
    const response = await blogService.createNew({ user, blog: { title: title.value, author: author.value, url: url.value } })
    if (response.error) {
      newNotification({ success : false, content : response.error })
    } else {
      newNotification({ success : true, content : `Added new blog "${title.value}" by ${author.value}` })
      createNew(response.data)
    }
  }

  return (
    <form onSubmit={createBlog}>
      <h2>Add a new blog entry</h2>
      <table>
        <tbody>
          <tr>
            <td>title</td>
            <td><input {...title} /></td>
          </tr>
          <tr>
            <td>author</td>
            <td><input {...author} /></td>
          </tr>
          <tr>
            <td>url</td>
            <td><input {...url} /></td>
          </tr>
        </tbody>
      </table>
      <input type="submit" />
    </form>)
}

BlogForm.propTypes = {
  user: PropTypes.object.isRequired,
  newNotification: PropTypes.func.isRequired
}

const mapDispatchToProps = { newNotification, createNew }
const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)

export default ConnectedBlogForm