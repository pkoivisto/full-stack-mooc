import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser, onError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const doLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
    } catch (exception) {
      onError('Wrong username or password!')
    }
  }

  return <form onSubmit={doLogin}>
    <h2>Login to application</h2>
    <div>
        Username
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
    </div>
    <div>
        Password
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <button type="submit">Login</button>
  </form>
}

export default LoginForm