require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
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

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})

app.get('/info', (req, res) => {
    Person.count({}).then(count => {
        res.send(`<div><p>Phonebook has info for ${count} people.</p><p>${new Date()}</p></div>`)
    })
})

app.get('/api/persons/:id', (req, res) => 
    {
        const id = req.params.id
        console.log(`getting person for id ${id}`)
        Person.findById(id)
            .then(person => {
                if (person) {
                    res.json(person)
                } else {
                    res.status(404).end()
                }
            })
            .catch(err => {
                console.log(err)
                res.status(400).send({error: "malformatted id"})
            })
    })

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id)
        .then(person => {
            if (person) {
                res.status(200).end()
            } else {
                res.status(404).end()
            }
        })
        .catch(err => res.status(400).send({error : "malformatted id"}))
})

app.post('/api/persons/', (req, res) => {
    const { name, number } = req.body
    if ( !name || !number) {
        res.status(400).json({"error" : "name or number undefined"})
    } else {
        Person.findOne({ name }).then(person => {
            if (person) {
                res.status(400).json({"error" : "name must be unique"})
            } else {
                const person = new Person({ name, number })
                person.save().then(savedPerson => res.json(savedPerson.toJSON()))
            }
        }).catch(err => console.log(err))
    }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})