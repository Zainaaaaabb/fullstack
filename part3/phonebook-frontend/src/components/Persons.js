const Persons = ({ persons, query, handleRemovePerson }) => {
    return (
        <>
            {persons
                .filter(person => person.name.toLowerCase().includes(query))
                .map((person, id) => (
                    <div key={person.name} >
                        {person.name}
                        {person.number}
                        <button onClick={handleRemovePerson(id, person.name)}>Delete</button>
                    </div>
                ))}
        </>
    )
}

export default Persons