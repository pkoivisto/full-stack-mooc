import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = ({ createAnecdote, addNotification, removeNotification }) => {

  const create = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    createAnecdote(anecdote)
    const { id } = addNotification({ contents : `You added '${anecdote}'` })
    setTimeout(() => removeNotification({ id  }), 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = { createAnecdote, addNotification, removeNotification }
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm