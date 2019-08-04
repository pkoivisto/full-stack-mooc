const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const anecdoteIndex = state.findIndex(val => val.id === action.id)
      const votedAnecdote = {...state[anecdoteIndex], votes: state[anecdoteIndex].votes + 1}
      const newState = state.slice(0,anecdoteIndex).concat(votedAnecdote).concat(state.slice(anecdoteIndex+1, state.length))
      return newState
    case 'CREATE_ANECDOTE':
      return [...state, asObject(action.content)]
    case 'INIT_ANECDOTES':
      const initState = action.contents
      console.log("INIT_ANECDOTES, state will be: ", initState)
      return initState
    default:
      return state
  }
}

export const vote = (id) => {
  return { type: 'VOTE_ANECDOTE', id }
}

export const createAnecdote = (content) => {
  return { type: 'CREATE_ANECDOTE', content }
}

export const initAnecdotes = (contents) => {
  return { type: 'INIT_ANECDOTES', contents }
}

export default anecdoteReducer