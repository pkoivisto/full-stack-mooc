import React from 'react'

const PersonForm = ({addPerson, newName, setNewName, newNumber, setNewNumber}) =>
  <form onSubmit={addPerson}>
    <div>nimi: <input value={newName} onChange={(event) => setNewName(event.target.value)}/></div>
    <div>numero: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/></div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>

export default PersonForm