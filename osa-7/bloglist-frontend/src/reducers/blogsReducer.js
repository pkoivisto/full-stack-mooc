/* eslint-disable no-case-declarations */
const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.blogs
  case 'CREATE_NEW':
    return [...state, action.blog]
  case 'UPDATE_EXISTING':
    const idxToUpdate = state.findIndex(blog => blog.id === action.blog.id)
    if (idxToUpdate === -1) {
      return state
    } else {
      return state.slice(0,idxToUpdate).concat([ action.blog ]).concat(state.slice(idxToUpdate + 1, state.length))
    }
  case 'DELETE_BLOG':
    const idxToDelete = state.findIndex(blog => blog.id === action.id)
    if (idxToDelete === -1) {
      return state
    } else {
      return state.slice(0,idxToDelete).concat(state.slice(idxToDelete + 1, state.length))
    }
  default:
    return state
  }
}

export const initBlogs = (blogs) => {
  return { type : 'INIT_BLOGS', blogs }
}

export const createNew = (blog) => {
  return { type : 'CREATE_NEW', blog }
}

export const updateExisting = (blog) => {
  return { type : 'UPDATE_EXISTING', blog }
}

export const deleteBlog = ({ id }) => {
  return { type : 'DELETE_BLOG', id }
}

export default blogsReducer