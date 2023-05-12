import { useState, useEffect } from 'react'
//import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'
import Notification from './components/Notification'


// a function
// taking no arguments 
const App = () => {
  //const [persons, setPersons] = useState([{ name: 'zainab', number: '1234' }])
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setFilterQuery] = useState('')
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleChange = setValue => (event) => setValue(event.target.value)

  const handleAddNewPerson = (event) => {
    event.preventDefault()

    const newPerson = { name: newName, number: newNumber }
    // se eif person is already added to phonebook 
    const foundPerson = persons.find(person => person.name === newName)
    if (foundPerson) {
      // alert(`${newName} is already added to phonebook`)
      if (window.confirm(`${newName} is already added to phonebook, replace?`)) {
        personService.update(foundPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedPerson))
          }).catch(error => {
            setStatus('error')
            setMessage(
              `Info of ${foundPerson.name} has already been removed`
            )
            setTimeout(() => {
              setStatus(null)
              setMessage(null)
            }, 5000)

            setPersons(persons.filter(person => person.id !== foundPerson.id))
          })
      }
    }

    else {
      personService
        .create(newPerson)
        .then(addedPerson => {
          // concatenate new person to the persons list 
          setPersons(persons.concat(addedPerson))
          setStatus('success')
          setMessage(
            `Added ${addedPerson.name}`
          )
          setTimeout(() => {
            setStatus(null)
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')

        })
        .catch(error => {
          // this is the way to access the error message
          console.log(error.response.data.error)
        })
    }
  }


  const handleRemovePerson = (id, name) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.name !== name))
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} status={status} />
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
        query={filterQuery}
        handleRemovePerson={handleRemovePerson}
      />
    </div>
  )
}

export default App