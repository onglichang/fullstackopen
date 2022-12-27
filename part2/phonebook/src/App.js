import { useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const personsToShow = filter.length > 0
    ? persons.filter(person => {
      const lowerCaseName = person.name.toLowerCase()
      return lowerCaseName.includes(filter.toLowerCase())
    })
    : persons

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) ) {
      alert(`${newName} is already added to phonebook`)

    } else {
      const personObject = { name: newName, number: newNumber}
      
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
