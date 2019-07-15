const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const dbUrl = `mongodb+srv://fullstack:${password}@testiklusteri-a8szo.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(dbUrl, {useNewUrlParser: true})
const personSchema = new mongoose.Schema({name: String, number: String, id: Number})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(persons => {
    persons.forEach(p => console.log(p.name, p.number))
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('confused, exiting..')
  process.exit(1)
}