import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getAll = async () => {
      const response = await userService.getAll()
      setUsers(response)
    }
    getAll()
  }, [])

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

export default Users