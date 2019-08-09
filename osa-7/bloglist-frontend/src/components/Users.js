import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Users = ({ userData }) => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    setUsers(userData.users)
  }, [userData])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <tr key={user.id}><td><Link to={'/users/' + user.id}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = ({ users }) => {
  return {
    userData : users
  }
}

export default connect(mapStateToProps)(Users)