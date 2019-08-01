import React from 'react'

const Notification = ({store}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notifications = store.getState().notifications

  if (notifications.length === 0) {
    return <div />
  }
  return (
    <div style={style}>
      {notifications.map((notification) => <div key={notification.id}>{notification.contents}</div>)}
    </div>
  )
}

export default Notification