const notificationReducer = (state = {}, action) => {
  switch(action.type) {
  case 'NEW_NOTIFICATION':
    return { success : action.success, content : action.content }
  case 'REMOVE_NOTIFICATION':
    return {}
  default:
    return state
  }
}

export const newNotification = ({ success, content }) => { return { type : 'NEW_NOTIFICATION', success, content } }
export const removeNotification = () => { return { type : 'REMOVE_NOTIFICATION' } }

export default notificationReducer
