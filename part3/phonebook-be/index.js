/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

morgan.token('data', function getData (req) {
  return JSON.stringify(req.body)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(morgan('tiny', {
  skip: function(req, res) {return req.method === 'POST'}
}))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data', {
  skip: function (req, res) { return req.method !== 'POST' }
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
  const person = Person.find(person => person.id === id)

  if (person) {
    response.json(person)
  }
  response.status(404).end()
})

app.delete('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // persons = persons.filter(note => note.id !== id)

  // response.status(204).end()
  // Person.findById(request.params.id).then(person => {
  //     response.json(person)
  // })

  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
  const maxId = Person.length > 0
    ? Math.max(...Person.map(n => n.id))
    : 0
  return maxId + 1
}

const getRandomInt = (max) => {
  const newId = Math.floor(Math.random() * max)
  if (!Person.find(person => person.id === newId)) {
    return newId
  }
  return getRandomInt(max)
}

app.post('/api/persons', (request, response, next) => {
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
    'name': body.name,
    'number': body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))

})

app.get('/info', (request, response) => {
  const noOfPersons = Person.length
  const time = new Date()
  const personInfo = `Phonebook has info for ${noOfPersons} people \n${time}`

  response.end(personInfo)
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

