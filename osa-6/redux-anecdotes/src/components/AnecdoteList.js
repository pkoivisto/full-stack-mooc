import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = ({ anecdotes, filter, vote, addNotification, removeNotification }) => {
  const displayedAnecdotes = anecdotes.filter(({ content }) => content.includes(filter)).sort((a,b) => a.votes > b.votes ? -1 : 1)

  const voteAnecdote = ({ id }) =>  {
    vote(id)
    const dispatchedNotification = addNotification({ contents: `You voted '${anecdotes.find(val => val.id === id).content}'` })
    setTimeout(() => removeNotification({ id : dispatchedNotification.id }), 5000)
  }

  return (
    <div>
      {displayedAnecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  return { anecdotes : state.anecdotes, filter : state.filter }
}
const mapDispatchToPros = { vote, addNotification, removeNotification }
const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToPros)(AnecdoteList)

export default ConnectedAnecdoteList