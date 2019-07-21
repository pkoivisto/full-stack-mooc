const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  passwordHash: {type: String, required: true}
})

userSchema.plugin(uniqueValidator, {message : 'value for field must be unique'})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
