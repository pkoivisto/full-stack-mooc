import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({store}) => {

  const create = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    store.dispatch(createAnecdote(anecdote))
    const addNotificationAction = addNotification({ contents : anecdote })
    store.dispatch(addNotificationAction)
    setTimeout(() => store.dispatch(removeNotification({ id : addNotificationAction.id })), 5000)
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

export default AnecdoteForm