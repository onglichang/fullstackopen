import { useState } from 'react'

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

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    console.log(personsToShow)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={filter} onChange={handleFilterChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        {/* <div>debug: {newName}</div> */}
        <div>
          name: <input value={newName} onChange={event => setNewName(event.target.value)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )
}

export default App
