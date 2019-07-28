import React from 'react'
const Blog = ({ blog, style }) => (
  <div style={style}>
    {blog.title} {blog.author}
  </div>
)

export default Blog