import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const filter = store.getState().filter
  const anecdotes = store.getState().anecdotes.filter(({ content }) => content.includes(filter)).sort((a,b) => a.votes > b.votes ? -1 : 1)

  const voteAnecdote = ({ id }) =>  {
    store.dispatch(vote(id))
    const addNotificationAction = addNotification({ contents: `You voted '${anecdotes.find(val => val.id === id).content}'` })
    store.dispatch(addNotificationAction)
    setTimeout(() => store.dispatch(removeNotification({ id : addNotificationAction.id })), 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
    )}</div>
  )
}

export default AnecdoteList