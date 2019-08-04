import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = ({ anecdotes, vote, addNotification, removeNotification }) => {

  const voteAnecdote = ({ id }) =>  {
    vote(id)
    const dispatchedNotification = addNotification({ contents: `You voted '${anecdotes.find(val => val.id === id).content}'` })
    setTimeout(() => removeNotification({ id : dispatchedNotification.id }), 5000)
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

const mapDispatchToPros = { vote, addNotification, removeNotification }
const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToPros)(AnecdoteList)

export default ConnectedAnecdoteList