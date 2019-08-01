import React from 'react';
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = ({store}) => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification store={ store } />
      <AnecdoteList store={ store } />
      <Filter store={ store } />
      <AnecdoteForm store={ store } />
    </div>
  )
}

export default App