import React from 'react'

const Filter = ({filter, setFilter}) => <div>Rajaa näytettäviä: <input value={filter} onChange={(event) => setFilter(event.target.value)}/></div>

export default Filter