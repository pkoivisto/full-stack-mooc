import React, { useState } from 'react'
import PersonsList from './components/personsList.js'
import PersonForm from './components/personForm.js'
import Filter from './components/filter.js'

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
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Lisää uusi</h3>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numerot</h2>
      <PersonsList list={filteredList} />
    </div>
  )

}

export default App