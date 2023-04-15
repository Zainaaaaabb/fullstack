// a function
// taking an object as argument

const PersonForm = ({
    name,
    number,
    handleNameChange,
    handleNumberChange,
    handleAddPerson
}) => {
    // returning a form 
    return (
        <form onSubmit={handleAddPerson}>
            <div>
                name: <input value={name} onChange={handleNameChange} />
            </div>
            <div>
                number: {'   '}
                <input value={number} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
