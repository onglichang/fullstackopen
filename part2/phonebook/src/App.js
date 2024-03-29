import { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import personService from './services/persons'
import Notification from './components/notification'
import ErrorNotification from './components/errorNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [actionMessage, setActionMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const personsToShow = filter.length > 0
    ? persons.filter(person => {
      const lowerCaseName = person.name.toLowerCase()
      return lowerCaseName.includes(filter.toLowerCase())
    })
    : persons

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) ) {
      if (window.confirm(`${newName} is already added to phonebook, 
      replace the old number with a new one?`)) {
        const existingPerson = persons.find(person => person.name === newName)
        const personObject = {...existingPerson, number: newNumber}
        personService
          .update(existingPerson.id, personObject)
          .then(response => {
            setActionMessage(`${newName} number updated`)
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data))
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }

    } else {
      const personObject = { name: newName, number: newNumber}
      personService
        .create(personObject)
        .then(response => {
          setActionMessage(`Added ${newName}`)
          setPersons(persons.concat(personObject))
        })
    }
    setNewName('')
    setNewNumber('')
    setTimeout(() => {
      setActionMessage(null)
    }, 5000)
  }

  const handleDelete = (event) => {
    if (window.confirm(`Delete ${event.target.name}?`)) {
        personService
        .deletePerson(event.target.id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== parseInt(event.target.id)))
        })
    }
  }

  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={actionMessage}/>
      <ErrorNotification message={errorMessage}/> 
      <Filter filter={filter} eventHandler={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
      submit={addPerson} 
      nameValue={newName} 
      nameChange={handleNameChange} 
      numberValue={newNumber} 
      numberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePersonHandler={handleDelete}/>
    </div>
  )
}

export default App
