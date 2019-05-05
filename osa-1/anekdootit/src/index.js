import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(() => 0))
  const randomAnecdoteIndex = () => Math.floor(Math.random() * anecdotes.length)

  const voteForCurrentAnecdote = () => {
      const votesCopy = [...votes]
      votesCopy[selected] += 1
      setVotes(votesCopy)
  }

  const argMax = (arr) => arr.findIndex((val) => val === Math.max(...arr))
  const mostVotesIdx = argMax(votes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <p/>
      <button onClick={voteForCurrentAnecdote}>Vote</button> 
      <button onClick={() => setSelected(randomAnecdoteIndex())}>Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotesIdx]}</p>
      <p>has {votes[mostVotesIdx]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)