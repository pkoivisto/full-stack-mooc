import React from 'react'

const PersonsList = ({list, deletePerson}) => <div>{list.map(person => <p key={person.name}>{person.name} {person.number} <button type="button" onClick={() => deletePerson({...person})}>poista</button></p>)}</div>

export default PersonsList