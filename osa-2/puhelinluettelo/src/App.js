import React, { useState, useEffect } from 'react'
import PersonsList from './components/personsList.js'
import PersonForm from './components/personForm.js'
import Filter from './components/filter.js'

import { getAllPersons, addPerson } from './personService.js'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    getAllPersons().then(persons => setPersons(persons))
  }, [])

  const doAddPerson = (ev) => {
    ev.preventDefault()
    if(persons.map(p => p.name).includes(newName)) {
      alert(`${newName} on jo luettelossa`)
    } else {
      const newPerson = {name: newName, number: newNumber}
      addPerson(newPerson).then(success => setPersons(persons.concat(newPerson)))
    }
  }

  const byNamefilter = (person) => person.name.toLowerCase().includes(filter.toLowerCase())

  const filteredList = persons.filter(byNamefilter)

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Lisää uusi</h3>
      <PersonForm addPerson={doAddPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numerot</h2>
      <PersonsList list={filteredList} />
    </div>
  )

}

export default App