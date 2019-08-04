const initialState = []

const notificationReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return state.concat({ contents : action.contents, id : action.id })
    case 'REMOVE_NOTIFICATION':
      const indexToRemove = state.findIndex(val => val.id === action.id)
      if (indexToRemove === state.length - 1) {
        return state.slice(0, indexToRemove)
      }
      return state.slice(0,indexToRemove).concat(state.slice(indexToRemove + 1))
    default:
      return state
    }
}

const getId = () => (100000 * Math.random()).toFixed(0)

export const setNotification = (notification, timeoutInSeconds) => {
  return async (dispatch) => {
    const id = getId()
    dispatch({ type : 'ADD_NOTIFICATION', contents: notification, id })
    setTimeout(() => dispatch({ type : 'REMOVE_NOTIFICATION', id}), timeoutInSeconds * 1000)
  }
}

export const addNotification = ({ contents }) => {
  return { type: 'ADD_NOTIFICATION', contents, id : getId()}
}

export const removeNotification = ({ id }) => {
  return { type: 'REMOVE_NOTIFICATION', id }
}

export default notificationReducer