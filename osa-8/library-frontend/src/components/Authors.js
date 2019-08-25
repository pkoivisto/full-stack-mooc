import React, { useState } from 'react'

const Authors = ({ show, authors, loggedIn, updateAuthor }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!show || !authors) {
    return null
  }

  const doUpdateAuthor = async (event) => {
    event.preventDefault()
    await updateAuthor({ variables : { name, born }})
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      { loggedIn && (
        <div>
          <h3>Set birthyear</h3>
          <form onSubmit={doUpdateAuthor}>
            <div>name <input type="text" value={name} onChange={(e) => setName(e.target.value)}/></div>
            <div>born <input type="number" value={born} onChange={(e) => setBorn(parseInt(e.target.value))}/></div>
            <button type="sumit">Update</button>
          </form>
        </div>
      )}


    </div>
  )
}

export default Authors