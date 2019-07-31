import React from 'react'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().sort((a,b) => a.votes > b.votes ? -1 : 1)

  const voteAnecdote = ({ id }) => store.dispatch(vote(id))

  return (
    <div>
      <h2>Anecdotes</h2>
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