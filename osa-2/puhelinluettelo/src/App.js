import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '045-123456' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addPerson = (ev) => {
    ev.preventDefault()
    if(persons.map(p => p.name).includes(newName)) {
      alert(`${newName} on jo luettelossa`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
  }

  const byNamefilter = (person) => person.name.toLowerCase().includes(filter.toLowerCase())

  const filteredList = persons.filter(byNamefilter)

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      Rajaa näytettäviä: <input value={filter} onChange={(event) => setFilter(event.target.value)}/>

      <h3>Lisää uusi</h3>
      <form onSubmit={addPerson}>
        <div>nimi: <input value={newName} onChange={(event) => setNewName(event.target.value)}/></div>
        <div>numero: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/></div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <div>{filteredList.map(person => <p key={person.name}>{person.name} {person.number}</p>)}</div>
    </div>
  )

}

export default App