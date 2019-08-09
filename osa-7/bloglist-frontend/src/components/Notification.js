import React from 'react'
import '../notification.css'
import { connect } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = ({ notification, removeNotification }) => {
  const type = notification.success ? 'SUCCESS' : 'ERROR'
  const message = notification.content
  if (type && message) {
    setTimeout(() => removeNotification(), 3000)
    return <div className={type}><h3>{message}</h3></div>
  } else {
    return <div />
  }
}

const mapStateToProps = ({ notification }) => {
  return { notification }
}

const mapDispatchToProps = { removeNotification }
const ConnectedNotification = connect(mapStateToProps, mapDispatchToProps)(Notification)

export default ConnectedNotification