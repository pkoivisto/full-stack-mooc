import React from 'react'
import loginService from '../services/login'
import { useField } from '../hooks'

const LoginForm = ({ setUser, onError }) => {
  const username = useField('text')
  const password = useField('text')

  const doLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username : username.value, password : password.value })
      setUser(user)
    } catch (exception) {
      onError('Wrong username or password!')
    }
  }

  return <form onSubmit={doLogin}>
    <h2>Login to application</h2>
    <div>
        Username
      <input {...username} />
    </div>
    <div>
        Password
      <input {...password} />
    </div>
    <button type="submit">Login</button>
  </form>
}

export default LoginForm