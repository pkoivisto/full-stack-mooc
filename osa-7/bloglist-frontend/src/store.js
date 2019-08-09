import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const store = createStore(combineReducers({ notification: notificationReducer, users: userReducer }))

export default store