const express = require('express')
const app = express()

let persons = [
    {
        name : "Arto Hellas",
        number : "040-123456",
        id : 1
    },
    {
        name : "Essi Esimerkki",
        number : "040-1231234",
        id : 2
    }
]

app.get('/api/persons', (req, res) => {res.json(persons)})

app.get('/info', (req, res) => {res.send(`<div><p>Phonebook has info for ${persons.length} people.</p><p>${new Date()}</p></div>`)})

const PORT=3001
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})