const Filter = ({ query, handleChange }) => {

    return (

        <p>Filter
            <input value={query} onChange={handleChange} />
        </p>
    )


}

export default Filter 