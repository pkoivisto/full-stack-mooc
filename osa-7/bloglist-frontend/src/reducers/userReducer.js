const userReducer = (state = { users : [], currentUser : null }, action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return { users : action.users, currentUser : state.currentUser }
  case 'LOGIN_USER':
    return { users : state.users, currentUser : action.user }
  default:
    return state
  }
}

export const initUsers = (users) => {
  return { type : 'INIT_USERS', users }
}

export const loginUser = (user) => {
  return { type : 'LOGIN_USER', user }
}

export default userReducer