import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = ({ anecdotes, vote, setNotification }) => {

  const voteAnecdote = ({ id, content, votes }) =>  {
    vote({ id, content, votes })
    setNotification(`You voted '${content}'`, 5)
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

const anecdotesToDisplay = (anecdotes, filterBy, sortBy) => anecdotes.filter(filterBy).sort(sortBy)

const mapStateToProps = (state) => {
  return { anecdotes : anecdotesToDisplay(state.anecdotes, ({ content }) => content.includes(state.filter), (a,b) => a.votes > b.votes ? -1 : 1) }
}

const mapDispatchToProps = { vote, setNotification }
const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList