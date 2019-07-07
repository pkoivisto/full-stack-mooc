const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')

app.use(bodyParser.json())

morgan.token('post-body', (req, res) => JSON.stringify(req.body))

const morganFormatter = (tokens, req, res) => {
    const tinyConfiguration = [
        tokens.method(req,res),
        tokens.url(req,res),
        tokens.status(req,res),
        tokens.res(req,res,'content-length'),
        tokens['response-time'](req,res),
        'ms'
    ]
    if (req.method == 'POST') {
        tinyConfiguration.push(tokens['post-body'](req,res))
    }
    return tinyConfiguration.join(' ')
}

app.use(morgan(morganFormatter))

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
    const id = Number(req.params.id)
    return persons.find(elem => elem.id === id)
} 

app.get('/api/persons/:id', (req, res) => 
    {
        const person = personForRequest(req)
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })

app.delete('/api/persons/:id', (req, res) => {
    const idx = persons.findIndex(elem => elem.id === Number(req.params.id))
    if (idx === -1) {
        res.status(404).end()
    } else {
        persons.splice(idx, 1)
        res.status(200).end()
    }
})

const MAX_ID = 1000000;
app.post('/api/persons/', (req, res) => {
    const { name, number } = req.body
    if ( !name || !number) {
        res.status(400).json({"error" : "name or number undefined"})
    } else if (persons.find(p => p.name === name) !== undefined) {
        res.status(400).json({"error" : "name must be unique"})
    } else {
        const id = Math.floor(Math.random() * MAX_ID)
        const person = {...req.body, id: id}
        persons.push(person)
        res.status(200).json(person)
    }
})

const PORT=3001
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})