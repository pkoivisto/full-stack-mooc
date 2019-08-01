import React from 'react'
import { filterBy } from '../reducers/filterReducer'

const Filter = ({ store }) => {
  const handleChange = (event) => store.dispatch(filterBy(event.target.value))
  const style = {
    marginTop: 20,
    marginBottom: 20
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter