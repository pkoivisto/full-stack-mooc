import React from 'react'
import { filterBy } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = ({ filterBy }) => {
  const handleChange = (event) => filterBy(event.target.value)
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

const mapDispatchToProps = { filterBy }

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter