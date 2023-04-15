import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


// a function
// taking no arguments 
const App = () => {
  //const [persons, setPersons] = useState([{ name: 'zainab', number: '1234' }])
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setFilterQuery] = useState('')

  const handleChange = setValue => (event) => setValue(event.target.value)

  const handleAddNewPerson = (event) => {
    event.preventDefault()

    // se eif person is already added to phonebook 
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }

    else {
      const newPerson = { name: newName, number: newNumber }
      // concatenate new person to the persons list 
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')

    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        query={filterQuery}
        handleChange={handleChange(setFilterQuery)} />
      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        handleNameChange={handleChange(setNewName)}
        handleNumberChange={handleChange(setNewNumber)}
        handleAddPerson={handleAddNewPerson}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        query={filterQuery} />
    </div>
  )
}

export default App