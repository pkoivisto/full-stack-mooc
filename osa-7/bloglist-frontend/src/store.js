import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'

const store = createStore(combineReducers({ notification: notificationReducer }))

export default store