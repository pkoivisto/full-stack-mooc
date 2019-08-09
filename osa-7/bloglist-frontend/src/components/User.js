import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { newNotification } from '../reducers/notificationReducer'

const User = ({ id, userData, newNotification }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const users = userData.users
    if (users && users.length > 0) {
      const match = users.find(val => val.id === id)
      if (match) {
        setUser(match)
      } else {
        newNotification({ success : false, content : `Could not find user for id ${id}` })
      }
    }
  }, [userData, id, newNotification])

  if (!user) {
    return <div />
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Blogs added</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>)
}

const mapStateToProps = ({ users }) => {
  return { userData : users }
}
const mapDispatchToProps = { newNotification }
export default connect(mapStateToProps, mapDispatchToProps)(User)