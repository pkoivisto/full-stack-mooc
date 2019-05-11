import React from 'react'

const PersonsList = (props) => <div>{props.list.map(person => <p key={person.name}>{person.name} {person.number}</p>)}</div>

export default PersonsList