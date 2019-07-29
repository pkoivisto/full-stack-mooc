import React from 'react'
import '../notification.css'

const Notification = ({ type, message }) => {
  if (type && message) {
    return <div className={type}><h3>{message}</h3></div>
  } else {
    return <div />
  }
}

export default Notification