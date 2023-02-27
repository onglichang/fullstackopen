require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

morgan.token('data', function getData (req) {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan('tiny', {
    skip: function(req, res) {return req.method === "POST"}
}))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data', {
    skip: function (req, res) { return req.method != "POST" }
}))

app.use(express.static('build'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
}) 

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    }
    response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    // const id = Number(request.params.id)
    // persons = persons.filter(note => note.id !== id)
  
    // response.status(204).end()
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
}

const getRandomInt = (max) => {
    const newId = Math.floor(Math.random() * max)
    if (!persons.find(person => person.id === newId)) {
        return newId
    } 
    return getRandomInt(max)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'field missing' 
        })
    } 
    // else if (persons.find(person => person.name === body.name)) {
    //     return response.status(400).json({ 
    //         error: 'name must be unique' 
    //     })
    // }

    const person = new Person({
        "name": body.name, 
        "number": body.number
    })
    
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.get('/info', (request, response) => {
    const noOfPersons = persons.length
    const time = new Date()
    const personInfo = `Phonebook has info for ${noOfPersons} people \n${time}` 
    
    response.end(personInfo)
})

const PORT = process.env.port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})