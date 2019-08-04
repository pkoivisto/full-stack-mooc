import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import anecdoteService from './services/anecdotes'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = ({ initAnecdotes }) => {
  useEffect(() => { anecdoteService.getAll().then(data => initAnecdotes(data)) }, [initAnecdotes])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <Filter />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initAnecdotes })(App)