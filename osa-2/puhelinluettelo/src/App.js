import React, { useState, useEffect } from 'react'
import PersonsList from './components/personsList.js'
import PersonForm from './components/personForm.js'
import Filter from './components/filter.js'

import { getAllPersons, addPerson, deletePerson, updatePerson } from './personService.js'

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
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const existing = persons.find(p => p.name.includes(newName))
        updatePerson({...existing, number: newNumber}).then(data => setPersons(persons.filter(p => p.id !== data.id).concat(data)))
      }
    } else {
      const newPerson = {name: newName, number: newNumber}
      addPerson(newPerson).then(data => setPersons(persons.concat(data)))
    }
  }

  const byNamefilter = (person) => person.name.toLowerCase().includes(filter.toLowerCase())

  const filteredList = persons.filter(byNamefilter)

  const deleteWithConfirm = ({id, name}) => { 
    if (window.confirm(`Haluatko todella poistaa henkilön ${name}?`)) { 
        deletePerson(id).then(success => setPersons(persons.filter(p => p.id !== id)))
      }
    }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Lisää uusi</h3>
      <PersonForm addPerson={doAddPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numerot</h2>
      <PersonsList list={filteredList} deletePerson={deleteWithConfirm}/>
    </div>
  )

}

export default App