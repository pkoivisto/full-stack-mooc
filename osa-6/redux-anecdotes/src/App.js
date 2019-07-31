import React from 'react';

const App = (props) => {
  const anecdotes = props.store.getState().sort((a,b) => a.votes > b.votes ? -1 : 1)

  const vote = (id) => {
    props.store.dispatch({type: 'VOTE', id})
  }

  const createAnecdote = (event) => {
    event.preventDefault()
    props.store.dispatch({type: 'CREATE', content: event.target.anecdote.value})
  }

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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App