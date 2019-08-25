import React, { useState } from 'react'

const LoginForm = ({ show, login, setToken, onSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  if (!show) {
    return null
  }

  const doLogin = async (event) => {
    event.preventDefault()
    try {
      const result = await login({variables : { username, password }})
      if (result) {
        const token = result.data.login.value
        setToken(token)
        localStorage.setItem('library-user-token', token)

        setUsername('')
        setPassword('')
        onSuccess()
      }
    } catch (exception) {
      console.log(exception)
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div>
      <form onSubmit={doLogin}>
        <div>username <input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} /></div>
        <div>password <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }}/></div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm