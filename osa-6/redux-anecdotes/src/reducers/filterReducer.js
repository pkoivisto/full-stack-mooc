const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FILTER':
      return action.value
    default:
      return state
  }
}

export const filterBy = (filter) => {
  return { type : 'FILTER', value : filter }
}

export default filterReducer