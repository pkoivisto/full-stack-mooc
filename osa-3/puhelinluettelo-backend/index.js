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

const personForRequest = req => {
    const id = Number(req.params.id);
    return persons.find(elem => elem.id === id);
} 

app.get('/api/persons/:id', (req, res) => 
    {
        const person = personForRequest(req);
        if (person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    })

app.delete('/api/persons/:id', (req, res) => {
    const idx = persons.findIndex(elem => elem.id === Number(req.params.id))
    if (idx === -1) {
        res.status(404).end();
    } else {
        persons.splice(idx, 1);
        res.status(200).end();
    }
})

const PORT=3001
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})