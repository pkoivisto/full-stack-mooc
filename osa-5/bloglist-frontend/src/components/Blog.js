import React, { useState } from 'react'
const Blog = ({ blog, style}) => {
  const [fullDetailsVisible, setFullDetailsVisible] = useState(false)
  const toggleFullDetails = () => setFullDetailsVisible(!fullDetailsVisible)
  const showWhenFullDetailsVisible = { display : ( fullDetailsVisible ? '' : 'none' ) }

  return (
    <div style={style}>
      <div onClick={toggleFullDetails}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenFullDetailsVisible}>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes <button onClick={() => console.log('clicked!')}>like</button></div>
        <div>added by {blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog