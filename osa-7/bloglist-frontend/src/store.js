import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogsReducer from './reducers/blogsReducer'

const store = createStore(combineReducers({
  notification: notificationReducer,
  users: userReducer,
  blogs: blogsReducer
}))

export default store