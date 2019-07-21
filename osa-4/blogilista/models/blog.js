const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const blogSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: String,
  url: {type: String, required: true},
  likes: {type: Number, default: 0}
})
  
module.exports = mongoose.model('Blog', blogSchema)
  