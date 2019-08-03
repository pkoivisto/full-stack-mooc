import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notifications }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notifications.length === 0) {
    return <div />
  }
  return (
    <div style={style}>
      {notifications.map((notification) => <div key={notification.id}>{notification.contents}</div>)}
    </div>
  )
}

const mapStoreToState = (state) => {
  return { notifications : state.notifications }
}

const ConnectedNotification = connect(mapStoreToState)(Notification)

export default ConnectedNotification